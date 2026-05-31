/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Worker, WageRecord, AdvanceRecord, AttendanceRecord, CashTransaction, User, AppSettings, CompanySettings } from '../core/types';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  writeBatch,
  getDoc,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../services/firebase';
import firebaseConfig from '../../firebase-applet-config.json';
import { 
  seedWorkers, 
  seedWages, 
  seedAdvances, 
  seedAttendance, 
  seedTransactions, 
  seedUsers 
} from '../core/seed';

// Detect whether the app is running in standard cloud-connected mode or high-fidelity Local Sandbox fallback mode
const isSimulatorMode = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('Placeholder');

// Helper to interact with LocalStorage
const getSimData = <T,>(key: string, defaultVal: T): T => {
  const data = localStorage.getItem(key);
  if (!data) return defaultVal;
  try {
    return JSON.parse(data) as T;
  } catch {
    return defaultVal;
  }
};

const setSimData = <T,>(key: string, val: T) => {
  localStorage.setItem(key, JSON.stringify(val));
};

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
  wages: WageRecord[];
  setWages: React.Dispatch<React.SetStateAction<WageRecord[]>>;
  advances: AdvanceRecord[];
  setAdvances: React.Dispatch<React.SetStateAction<AdvanceRecord[]>>;
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  transactions: CashTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<CashTransaction[]>>;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  companySettings: CompanySettings;
  updateCompanySettings: (newSettings: CompanySettings) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  selectedWorkerId: string | null;
  setSelectedWorkerId: (id: string | null) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  isSimulatorMode: boolean;
  
  // Database Operations
  addWorker: (worker: Omit<Worker, 'id' | 'createdAt' | 'currentBalance'>) => Promise<void>;
  updateWorker: (id: string, updated: Partial<Worker>) => Promise<void>;
  deleteWorker: (id: string) => Promise<void>;
  archiveWorker: (id: string) => Promise<void>;
  
  recordWages: (records: Omit<WageRecord, 'id' | 'createdAt'>[]) => Promise<void>;
  recordAdvance: (record: Omit<AdvanceRecord, 'id' | 'createdAt'>) => Promise<{ success: boolean; message: string; isWarning: boolean }>;
  
  recordAttendance: (date: string, records: Omit<AttendanceRecord, 'id'>[]) => Promise<void>;
  
  addTransaction: (tx: Omit<CashTransaction, 'id'>) => Promise<void>;
  
  resetDatabase: () => Promise<void>;
  clearDatabase: () => Promise<void>;
  restoreDatabase: (payload: any) => Promise<void>;

  // Authentication operations
  signUp: (email: string, pass: string, fullName: string, phone: string, role: 'admin' | 'accountant' | 'supervisor' | 'user') => Promise<void>;
  logIn: (email: string, pass: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [workersState, setWorkersState] = useState<Worker[]>([]);
  
  // Custom setWorkers wrapper to maintain compatibility with all operations
  const setWorkers = (val: React.SetStateAction<Worker[]>) => {
    setWorkersState(val);
  };

  const [wages, setWages] = useState<WageRecord[]>([]);
  const [advances, setAdvances] = useState<AdvanceRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [transactions, setTransactions] = useState<CashTransaction[]>([]);

  const workers = useMemo(() => {
    return workersState.map(w => {
      const workerWages = wages.filter(wg => wg.workerId === w.id).reduce((sum, item) => sum + item.totalEarned, 0);
      const workerAdvances = advances.filter(adv => adv.workerId === w.id).reduce((sum, item) => sum + item.amount, 0);
      const computedBalance = workerWages - workerAdvances;
      return { ...w, currentBalance: computedBalance };
    });
  }, [workersState, wages, advances]);
  
  const [settings, setSettings] = useState<AppSettings>({
    language: 'ar',
    isDarkMode: false,
    offlineMode: false,
    currency: 'ريال',
    allowSupervisorWagesEdit: true
  });

  const defaultCompanySettings: CompanySettings = {
    companyName: 'وكالة القاضي المحدودة',
    companyAddress: 'اليمن - تعز',
    phoneNumbers: '+967 77xxxxxxx',
    servicesOrProducts: 'توريد عمالة، مقاولات إنشائية، وإدارة أجور ومستحقات وعمال',
    companyLogo: '',
    managerSignature: '',
    companyStamp: ''
  };

  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('alqadhi_company_settings');
    return saved ? JSON.parse(saved) : defaultCompanySettings;
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');

  // ----------------------------------------------------
  // Local high-fidelity Simulator Initializer (Offline Fallback)
  // ----------------------------------------------------
  useEffect(() => {
    if (isSimulatorMode) {
      setIsLoading(true);
      
      // Restore auth
      const simUser = getSimData<User | null>('alqady_sim_current_user', null);
      setCurrentUser(simUser);

      // Restore settings
      const simSettings = getSimData<AppSettings>('alqady_sim_settings', {
        language: 'ar',
        isDarkMode: false,
        offlineMode: true, // Show local/offline mode active
        currency: 'ريال',
        allowSupervisorWagesEdit: true
      });
      setSettings(simSettings);

      // Restore database
      const simWorkers = getSimData<Worker[]>('alqady_sim_workers', seedWorkers);
      const simWages = getSimData<WageRecord[]>('alqady_sim_wages', seedWages);
      const simAdvances = getSimData<AdvanceRecord[]>('alqady_sim_advances', seedAdvances);
      const simAttendance = getSimData<AttendanceRecord[]>('alqady_sim_attendance', seedAttendance);
      const simTransactions = getSimData<CashTransaction[]>('alqady_sim_transactions', seedTransactions);

      // Persist seeds immediately if empty so they look stunning on first load
      if (!localStorage.getItem('alqady_sim_workers')) setSimData('alqady_sim_workers', seedWorkers);
      if (!localStorage.getItem('alqady_sim_wages')) setSimData('alqady_sim_wages', seedWages);
      if (!localStorage.getItem('alqady_sim_advances')) setSimData('alqady_sim_advances', seedAdvances);
      if (!localStorage.getItem('alqady_sim_attendance')) setSimData('alqady_sim_attendance', seedAttendance);
      if (!localStorage.getItem('alqady_sim_transactions')) setSimData('alqady_sim_transactions', seedTransactions);

      setWorkers(simWorkers);
      setWages(simWages);
      setAdvances(simAdvances);
      setAttendance(simAttendance);
      setTransactions(simTransactions);

      setIsLoading(false);
    }
  }, [isSimulatorMode]);

  // ----------------------------------------------------
  // Authentication & Session Listener
  // ----------------------------------------------------
  useEffect(() => {
    if (isSimulatorMode) return;

    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      setIsLoading(true);
      if (authUser) {
        try {
          // Fetch additional profile fields from Firestore 'users' collection
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setCurrentUser(userData);
          } else {
            // Profile document doesn't exist yet, build temporary user profile until written
            const nameFromEmail = authUser.email ? authUser.email.split('@')[0] : 'عضو';
            const tempUser: User = {
              uid: authUser.uid,
              fullName: nameFromEmail,
              email: authUser.email || '',
              role: 'admin',
              createdAt: new Date().toISOString()
            };
            // Create user document in database
            await setDoc(userDocRef, tempUser);
            setCurrentUser(tempUser);
          }
        } catch (error) {
          console.error('Error fetching user profile from Firestore:', error);
          // Standard fallback
          setCurrentUser({
            uid: authUser.uid,
            fullName: authUser.displayName || authUser.email?.split('@')[0] || 'مستخدم المقاولات',
            email: authUser.email || '',
            role: 'admin',
            createdAt: new Date().toISOString()
          });
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // ----------------------------------------------------
  // Real-time Database Sync (onSnapshot Listeners)
  // ----------------------------------------------------
  useEffect(() => {
    if (isSimulatorMode) return;
    if (!currentUser) {
      setWorkers([]);
      setWages([]);
      setAdvances([]);
      setAttendance([]);
      setTransactions([]);
      return;
    }

    // 1. Sync App Settings (doc: settings/general_config)
    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'general_config'), (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data() as AppSettings);
      }
    }, (error) => {
      // Gracefully log on missing permissions / missing config and fall back to default
      console.warn('Settings snapshot error:', error.message);
    });

    // 1b. Sync Company Settings (doc: settings/company_config)
    const unsubscribeCompanySettings = onSnapshot(doc(db, 'settings', 'company_config'), (snapshot) => {
      if (snapshot.exists()) {
        const fetched = snapshot.data() as CompanySettings;
        setCompanySettings(fetched);
        localStorage.setItem('alqadhi_company_settings', JSON.stringify(fetched));
      }
    }, (error) => {
      console.warn('Company settings snapshot error:', error.message);
    });

    // 2. Sync Workers (collection: workers)
    const unsubscribeWorkers = onSnapshot(collection(db, 'workers'), (snapshot) => {
      const loadedWorkers: Worker[] = [];
      snapshot.forEach(docSnap => {
        loadedWorkers.push(docSnap.data() as Worker);
      });
      // Sort: Newest created first
      loadedWorkers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setWorkers(loadedWorkers);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'workers');
    });

    // 3. Sync Wages (collection: wages)
    const unsubscribeWages = onSnapshot(collection(db, 'wages'), (snapshot) => {
      const loadedWages: WageRecord[] = [];
      snapshot.forEach(docSnap => {
        loadedWages.push(docSnap.data() as WageRecord);
      });
      loadedWages.sort((a, b) => b.date.localeCompare(a.date));
      setWages(loadedWages);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'wages');
    });

    // 4. Sync Advances (collection: advances)
    const unsubscribeAdvances = onSnapshot(collection(db, 'advances'), (snapshot) => {
      const loadedAdvances: AdvanceRecord[] = [];
      snapshot.forEach(docSnap => {
        loadedAdvances.push(docSnap.data() as AdvanceRecord);
      });
      loadedAdvances.sort((a, b) => b.date.localeCompare(a.date));
      setAdvances(loadedAdvances);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'advances');
    });

    // 5. Sync Attendance (collection: attendance)
    const unsubscribeAttendance = onSnapshot(collection(db, 'attendance'), (snapshot) => {
      const loadedAttendance: AttendanceRecord[] = [];
      snapshot.forEach(docSnap => {
        loadedAttendance.push(docSnap.data() as AttendanceRecord);
      });
      setAttendance(loadedAttendance);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'attendance');
    });

    // 6. Sync CashBox Transactions (collection: cashbox)
    const unsubscribeTransactions = onSnapshot(collection(db, 'cashbox'), (snapshot) => {
      const loadedTx: CashTransaction[] = [];
      snapshot.forEach(docSnap => {
        loadedTx.push(docSnap.data() as CashTransaction);
      });
      loadedTx.sort((a, b) => b.date.localeCompare(a.date));
      setTransactions(loadedTx);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'cashbox');
    });

    return () => {
      unsubscribeSettings();
      unsubscribeCompanySettings();
      unsubscribeWorkers();
      unsubscribeWages();
      unsubscribeAdvances();
      unsubscribeAttendance();
      unsubscribeTransactions();
    };
  }, [currentUser]);



  // ----------------------------------------------------
  // Authenticated Operations Custom Helpers
  // ----------------------------------------------------
  const signUp = async (
    email: string, 
    pass: string, 
    fullName: string, 
    phone: string, 
    role: 'admin' | 'accountant' | 'supervisor' | 'user'
  ) => {
    if (isSimulatorMode) {
      const simulatedUsers = getSimData<User[]>('alqady_sim_users', seedUsers);
      if (simulatedUsers.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
        throw { code: 'auth/email-already-in-use', message: 'Email already in use' };
      }
      const newUser: User = {
        uid: `user_${Date.now()}`,
        fullName,
        email: email.trim().toLowerCase(),
        role,
        phone,
        createdAt: new Date().toISOString()
      };
      simulatedUsers.push(newUser);
      setSimData('alqady_sim_users', simulatedUsers);
      setCurrentUser(newUser);
      setSimData('alqady_sim_current_user', newUser);
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const newUser: User = {
        uid: cred.user.uid,
        fullName,
        email: email.trim().toLowerCase(),
        role,
        phone,
        createdAt: new Date().toISOString()
      };
      
      // Save profile to the 'users' collection in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), newUser);
      setCurrentUser(newUser);
    } catch (err: any) {
      console.error('Sign up error:', err);
      throw err;
    }
  };

  const logIn = async (email: string, pass: string) => {
    if (isSimulatorMode) {
      const simulatedUsers = getSimData<User[]>('alqady_sim_users', seedUsers);
      const user = simulatedUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) {
        throw { code: 'auth/user-not-found', message: 'User not found' };
      }
      setCurrentUser(user);
      setSimData('alqady_sim_current_user', user);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logOut = async () => {
    if (isSimulatorMode) {
      setCurrentUser(null);
      localStorage.removeItem('alqady_sim_current_user');
      return;
    }

    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      throw err;
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    if (isSimulatorMode) {
      setSettings(updated);
      setSimData('alqady_sim_settings', updated);
      return;
    }

    try {
      await setDoc(doc(db, 'settings', 'general_config'), updated);
      setSettings(updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/general_config');
    }
  };

  const updateCompanySettings = async (newSettings: CompanySettings) => {
    if (isSimulatorMode) {
      setCompanySettings(newSettings);
      localStorage.setItem('alqadhi_company_settings', JSON.stringify(newSettings));
      return;
    }

    try {
      await setDoc(doc(db, 'settings', 'company_config'), newSettings);
      setCompanySettings(newSettings);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/company_config');
      // Fallback
      setCompanySettings(newSettings);
      localStorage.setItem('alqadhi_company_settings', JSON.stringify(newSettings));
    }
  };

  // ----------------------------------------------------
  // Workers Operations
  // ----------------------------------------------------
  const addWorker = async (worker: Omit<Worker, 'id' | 'createdAt' | 'currentBalance'>) => {
    const id = `wrk_${Date.now()}`;
    const newWorker: Worker = {
      ...worker,
      id,
      currentBalance: 0,
      createdAt: new Date().toISOString()
    };

    if (isSimulatorMode) {
      const currentWorkers = [newWorker, ...workers];
      setWorkers(currentWorkers);
      setSimData('alqady_sim_workers', currentWorkers);
      
      const notifId = `notif_${Date.now()}`;
      const notifs = getSimData<any[]>('alqady_sim_notifications', []);
      notifs.push({
        id: notifId,
        title: 'إضافة عامل جديد',
        message: `تم إضافة العامل ${worker.fullName} بنجاح إلى منصة القاضي`,
        timestamp: new Date().toISOString()
      });
      setSimData('alqady_sim_notifications', notifs);
      return;
    }

    try {
      await setDoc(doc(db, 'workers', id), newWorker);
      
      // Save logs/notifications in database to track actions
      const notifId = `notif_${Date.now()}`;
      await setDoc(doc(db, 'notifications', notifId), {
        id: notifId,
        title: 'إضافة عامل جديد',
        message: `تم إضافة العامل ${worker.fullName} بنجاح إلى منصة القاضي`,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `workers/${id}`);
    }
  };

  const updateWorker = async (id: string, updated: Partial<Worker>) => {
    if (isSimulatorMode) {
      const updatedWorkers = workers.map(w => w.id === id ? { ...w, ...updated } : w);
      setWorkers(updatedWorkers);
      setSimData('alqady_sim_workers', updatedWorkers);
      return;
    }

    try {
      await updateDoc(doc(db, 'workers', id), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `workers/${id}`);
    }
  };

  const deleteWorker = async (id: string) => {
    if (isSimulatorMode) {
      const updatedWorkers = workers.filter(w => w.id !== id);
      setWorkers(updatedWorkers);
      setSimData('alqady_sim_workers', updatedWorkers);

      const updatedWages = wages.filter(wg => wg.workerId !== id);
      setWages(updatedWages);
      setSimData('alqady_sim_wages', updatedWages);

      const updatedAdvances = advances.filter(adv => adv.workerId !== id);
      setAdvances(updatedAdvances);
      setSimData('alqady_sim_advances', updatedAdvances);

      const updatedAttendance = attendance.filter(att => att.workerId !== id);
      setAttendance(updatedAttendance);
      setSimData('alqady_sim_attendance', updatedAttendance);
      return;
    }

    try {
      // Complete ledger sanitation: Cascade delete associated documents
      await deleteDoc(doc(db, 'workers', id));
      
      // We can clean relations in batches or let them be computed appropriately
      const wageBatch = wages.filter(wg => wg.workerId === id);
      const advBatch = advances.filter(adv => adv.workerId === id);
      const attBatch = attendance.filter(att => att.workerId === id);
      
      const batch = writeBatch(db);
      wageBatch.forEach(w => batch.delete(doc(db, 'wages', w.id)));
      advBatch.forEach(a => batch.delete(doc(db, 'advances', a.id)));
      attBatch.forEach(at => batch.delete(doc(db, 'attendance', at.id)));
      await batch.commit();
      
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `workers/${id}`);
    }
  };

  const archiveWorker = async (id: string) => {
    const currentStatus = workers.find(w => w.id === id)?.isArchived || false;
    if (isSimulatorMode) {
      const updatedWorkers = workers.map(w => w.id === id ? { ...w, isArchived: !currentStatus } : w);
      setWorkers(updatedWorkers);
      setSimData('alqady_sim_workers', updatedWorkers);
      return;
    }

    try {
      await updateDoc(doc(db, 'workers', id), { isArchived: !currentStatus });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `workers/${id}`);
    }
  };

  // ----------------------------------------------------
  // Wages & Payroll Operations
  // ----------------------------------------------------
  const recordWages = async (newRecords: Omit<WageRecord, 'id' | 'createdAt'>[]) => {
    const prepared: WageRecord[] = newRecords.map(r => ({
      ...r,
      id: `wg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    }));

    if (isSimulatorMode) {
      const updatedWages = [...prepared, ...wages];
      setWages(updatedWages);
      setSimData('alqady_sim_wages', updatedWages);

      const sumTotal = prepared.reduce((sum, r) => sum + r.totalEarned, 0);
      if (sumTotal > 0) {
        await addTransaction({
          type: 'payment',
          category: 'رواتب عمال',
          amount: sumTotal,
          title: `تسجيل أجور يومية لعدد (${prepared.length}) من العمال`,
          date: prepared[0].date,
          recordedBy: currentUser?.fullName || 'النظام'
        });
      }
      return;
    }

    try {
      const batch = writeBatch(db);
      prepared.forEach(record => {
        batch.set(doc(db, 'wages', record.id), record);
      });

      await batch.commit();

      // Automatically log inside cashbox and expenses collection as well
      const sumTotal = prepared.reduce((sum, r) => sum + r.totalEarned, 0);
      if (sumTotal > 0) {
        await addTransaction({
          type: 'payment',
          category: 'رواتب عمال',
          amount: sumTotal,
          title: `تسجيل أجور يومية لعدد (${prepared.length}) من العمال`,
          date: prepared[0].date,
          recordedBy: currentUser?.fullName || 'النظام'
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'wages/batch');
    }
  };

  // ----------------------------------------------------
  // Advances & Withdrawals Operations
  // ----------------------------------------------------
  const recordAdvance = async (record: Omit<AdvanceRecord, 'id' | 'createdAt'>) => {
    const worker = workers.find(w => w.id === record.workerId);
    if (!worker) {
      return { success: false, message: 'العامل غير موجود.', isWarning: false };
    }

    const workerWages = wages.filter(wg => wg.workerId === worker.id).reduce((sum, item) => sum + item.totalEarned, 0);
    const workerAdvances = advances.filter(adv => adv.workerId === worker.id).reduce((sum, item) => sum + item.amount, 0);
    const balanceBefore = workerWages - workerAdvances;
    
    // Warning trigger
    const isWarning = record.amount > balanceBefore;
    const id = `adv_${Date.now()}`;
    const newRecord: AdvanceRecord = {
      ...record,
      id,
      createdAt: new Date().toISOString()
    };

    if (isSimulatorMode) {
      const updatedAdvances = [newRecord, ...advances];
      setAdvances(updatedAdvances);
      setSimData('alqady_sim_advances', updatedAdvances);

      if (isWarning) {
        const notifId = `notif_${Date.now()}`;
        const notifs = getSimData<any[]>('alqady_sim_notifications', []);
        notifs.push({
          id: notifId,
          title: 'تنبيه تجاوز رصيد',
          message: `سحب العامل ${worker.fullName} مبلغ ${record.amount} وهو يتجاوز رصيده المتوفر (${balanceBefore})`,
          timestamp: new Date().toISOString()
        });
        setSimData('alqady_sim_notifications', notifs);
      }

      await addTransaction({
        type: 'payment',
        category: 'سلفة عامل',
        amount: record.amount,
        title: `${record.type === 'advance' ? 'سلفة مالية' : 'سحب نقدي من الرصيد'} - العامل: ${worker.fullName}`,
        date: record.date,
        relatedId: worker.id,
        notes: record.notes,
        recordedBy: currentUser?.fullName || 'النظام'
      });

      return { 
        success: true, 
        message: isWarning 
          ? `تم تسجيل السلفة بنجاح (نمط الحفظ المحلي الذكي). تنبيه: قيمة السحوبات (${record.amount}) تجاوزت الرصيد الحالي المتوفر للعامل (${balanceBefore} ${settings.currency}).`
          : 'تم تسجيل السند والخصم من المستحقات بنجاح.',
        isWarning
      };
    }

    try {
      // Save advance document
      await setDoc(doc(db, 'advances', id), newRecord);

      // Save notification warning if overdraft occurs
      if (isWarning) {
        const notifId = `notif_${Date.now()}`;
        await setDoc(doc(db, 'notifications', notifId), {
          id: notifId,
          title: 'تنبيه تجاوز رصيد',
          message: `سحب العامل ${worker.fullName} مبلغ ${record.amount} وهو يتجاوز رصيده المتوفر (${balanceBefore})`,
          timestamp: new Date().toISOString()
        });
      }

      // Automatically post transaction in cash box
      await addTransaction({
        type: 'payment',
        category: 'سلفة عامل',
        amount: record.amount,
        title: `${record.type === 'advance' ? 'سلفة مالية' : 'سحب نقدي من الرصيد'} - العامل: ${worker.fullName}`,
        date: record.date,
        relatedId: worker.id,
        notes: record.notes,
        recordedBy: currentUser?.fullName || 'النظام'
      });

      return { 
        success: true, 
        message: isWarning 
          ? `تم تسجيل السلفة بنجاح. تنبيه: قيمة السحوبات (${record.amount}) تجاوزت الرصيد الحالي المتوفر للعامل (${balanceBefore} ${settings.currency}).`
          : 'تم تسجيل السند والخصم من المستحقات بنجاح.',
        isWarning
      };
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `advances/${id}`);
    }
  };

  // ----------------------------------------------------
  // Attendance & Clocking Operations
  // ----------------------------------------------------
  const recordAttendance = async (date: string, records: Omit<AttendanceRecord, 'id'>[]) => {
    if (isSimulatorMode) {
      const existingForDay = attendance.filter(att => att.date !== date);
      const freshEntries = records.map((r, i) => ({
        ...r,
        id: `att_${Date.now()}_${i}`
      }));
      const updatedAttendance = [...existingForDay, ...freshEntries];
      setAttendance(updatedAttendance);
      setSimData('alqady_sim_attendance', updatedAttendance);
      return;
    }

    try {
      const batch = writeBatch(db);
      
      // Clean previous records for this date to support updates and prevent repeats
      const existingForDay = attendance.filter(att => att.date === date);
      existingForDay.forEach(record => {
        batch.delete(doc(db, 'attendance', record.id));
      });

      // Prepare fresh entries
      records.forEach((r, i) => {
        const id = `att_${Date.now()}_${i}`;
        const newRecord: AttendanceRecord = {
          ...r,
          id
        };
        batch.set(doc(db, 'attendance', id), newRecord);
      });

      await batch.commit();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'attendance/batch');
    }
  };

  // ----------------------------------------------------
  // Cash Transactions & Revenue/Expenses Branching
  // ----------------------------------------------------
  const addTransaction = async (tx: Omit<CashTransaction, 'id'>) => {
    const id = `tx_${Date.now()}`;
    const newTx: CashTransaction = {
      ...tx,
      id
    };

    if (isSimulatorMode) {
      const updatedTransactions = [newTx, ...transactions];
      setTransactions(updatedTransactions);
      setSimData('alqady_sim_transactions', updatedTransactions);

      if (tx.type === 'receipt') {
        const revs = getSimData<any[]>('alqady_sim_revenues', []);
        revs.push({
          id,
          title: tx.title,
          amount: tx.amount,
          date: tx.date,
          category: tx.category,
          recordedBy: tx.recordedBy,
          createdAt: new Date().toISOString()
        });
        setSimData('alqady_sim_revenues', revs);
      } else {
        const exps = getSimData<any[]>('alqady_sim_expenses', []);
        exps.push({
          id,
          title: tx.title,
          amount: tx.amount,
          date: tx.date,
          category: tx.category,
          recordedBy: tx.recordedBy,
          createdAt: new Date().toISOString()
        });
        setSimData('alqady_sim_expenses', exps);
      }
      return;
    }

    try {
      // 1. Save in transactions/cashbox collection
      await setDoc(doc(db, 'cashbox', id), newTx);

      // 2. Branching to revenues/expenses specific collections for advanced analytics
      if (tx.type === 'receipt') {
        await setDoc(doc(db, 'revenues', id), {
          id,
          title: tx.title,
          amount: tx.amount,
          date: tx.date,
          category: tx.category,
          recordedBy: tx.recordedBy,
          createdAt: new Date().toISOString()
        });
      } else {
        await setDoc(doc(db, 'expenses', id), {
          id,
          title: tx.title,
          amount: tx.amount,
          date: tx.date,
          category: tx.category,
          recordedBy: tx.recordedBy,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cashbox/${id}`);
    }
  };

  // ----------------------------------------------------
  // Reset and Seed operations (Backup & Restore Admin features)
  // ----------------------------------------------------
  const clearDatabase = async () => {
    if (isSimulatorMode) {
      setWorkers([]);
      setWages([]);
      setAdvances([]);
      setAttendance([]);
      setTransactions([]);
      setSettings({
        language: 'ar',
        isDarkMode: false,
        offlineMode: true,
        currency: 'ريال',
        allowSupervisorWagesEdit: true
      });
      localStorage.removeItem('alqady_sim_workers');
      localStorage.removeItem('alqady_sim_wages');
      localStorage.removeItem('alqady_sim_advances');
      localStorage.removeItem('alqady_sim_attendance');
      localStorage.removeItem('alqady_sim_transactions');
      localStorage.removeItem('alqady_sim_settings');
      localStorage.removeItem('alqady_sim_revenues');
      localStorage.removeItem('alqady_sim_expenses');
      localStorage.removeItem('alqady_sim_notifications');
      return;
    }

    try {
      const batch = writeBatch(db);
      
      // Clear workers, wages, advances, attendance, cashbox, revenues, expenses, settings, notifications
      workers.forEach(w => batch.delete(doc(db, 'workers', w.id)));
      wages.forEach(wg => batch.delete(doc(db, 'wages', wg.id)));
      advances.forEach(adv => batch.delete(doc(db, 'advances', adv.id)));
      attendance.forEach(att => batch.delete(doc(db, 'attendance', att.id)));
      transactions.forEach(tx => batch.delete(doc(db, 'cashbox', tx.id)));
      
      // Wipe specific revenues, expenses copies if loaded
      const revenuesSnap = await getDocs(collection(db, 'revenues'));
      revenuesSnap.forEach(snap => batch.delete(doc(db, 'revenues', snap.id)));

      const expensesSnap = await getDocs(collection(db, 'expenses'));
      expensesSnap.forEach(snap => batch.delete(doc(db, 'expenses', snap.id)));

      const notifsSnap = await getDocs(collection(db, 'notifications'));
      notifsSnap.forEach(snap => batch.delete(doc(db, 'notifications', snap.id)));

      batch.delete(doc(db, 'settings', 'general_config'));

      await batch.commit();

      // Reset state immediately
      setWorkers([]);
      setWages([]);
      setAdvances([]);
      setAttendance([]);
      setTransactions([]);
      setSettings({
        language: 'ar',
        isDarkMode: false,
        offlineMode: false,
        currency: 'ريال',
        allowSupervisorWagesEdit: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'all_collections');
    }
  };

  const restoreDatabase = async (payload: any) => {
    if (isSimulatorMode) {
      await clearDatabase();
      
      if (payload.settings) {
        setSettings(payload.settings);
        setSimData('alqady_sim_settings', payload.settings);
      }
      if (Array.isArray(payload.workers)) {
        setWorkers(payload.workers);
        setSimData('alqady_sim_workers', payload.workers);
      }
      if (Array.isArray(payload.wages)) {
        setWages(payload.wages);
        setSimData('alqady_sim_wages', payload.wages);
      }
      if (Array.isArray(payload.advances)) {
        setAdvances(payload.advances);
        setSimData('alqady_sim_advances', payload.advances);
      }
      if (Array.isArray(payload.attendance)) {
        setAttendance(payload.attendance);
        setSimData('alqady_sim_attendance', payload.attendance);
      }
      const txs = payload.transactions || payload.cashbox || [];
      if (Array.isArray(txs)) {
        setTransactions(txs);
        setSimData('alqady_sim_transactions', txs);
      }
      return;
    }

    try {
      const batch = writeBatch(db);

      // Clean first
      await clearDatabase();

      const newBatch = writeBatch(db);

      // Insert fresh batch entries
      if (payload.settings) {
        newBatch.set(doc(db, 'settings', 'general_config'), payload.settings);
      }
      
      if (Array.isArray(payload.workers)) {
        payload.workers.forEach((item: Worker) => {
          newBatch.set(doc(db, 'workers', item.id), item);
        });
      }

      if (Array.isArray(payload.wages)) {
        payload.wages.forEach((item: WageRecord) => {
          newBatch.set(doc(db, 'wages', item.id), item);
        });
      }

      if (Array.isArray(payload.advances)) {
        payload.advances.forEach((item: AdvanceRecord) => {
          newBatch.set(doc(db, 'advances', item.id), item);
        });
      }

      if (Array.isArray(payload.attendance)) {
        payload.attendance.forEach((item: AttendanceRecord) => {
          newBatch.set(doc(db, 'attendance', item.id), item);
        });
      }

      // Restore transactions representing the cashbox
      const txs = payload.transactions || payload.cashbox || [];
      if (Array.isArray(txs)) {
        txs.forEach((item: CashTransaction) => {
          newBatch.set(doc(db, 'cashbox', item.id), item);

          if (item.type === 'receipt') {
            newBatch.set(doc(db, 'revenues', item.id), {
              id: item.id,
              title: item.title,
              amount: item.amount,
              date: item.date,
              category: item.category,
              recordedBy: item.recordedBy,
              createdAt: new Date().toISOString()
            });
          } else {
            newBatch.set(doc(db, 'expenses', item.id), {
              id: item.id,
              title: item.title,
              amount: item.amount,
              date: item.date,
              category: item.category,
              recordedBy: item.recordedBy,
              createdAt: new Date().toISOString()
            });
          }
        });
      }

      await newBatch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'restore_database');
    }
  };

  const resetDatabase = async () => {
    // Pure reset to default live empty layout
    await clearDatabase();
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      workers,
      setWorkers,
      wages,
      setWages,
      advances,
      setAdvances,
      attendance,
      setAttendance,
      transactions,
      setTransactions,
      settings,
      updateSettings,
      companySettings,
      updateCompanySettings,
      isLoading,
      setIsLoading,
      selectedWorkerId,
      setSelectedWorkerId,
      activeScreen,
      setActiveScreen,
      isSimulatorMode,
      addWorker,
      updateWorker,
      deleteWorker,
      archiveWorker,
      recordWages,
      recordAdvance,
      recordAttendance,
      addTransaction,
      resetDatabase,
      clearDatabase,
      restoreDatabase,
      signUp,
      logIn,
      logOut
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
