/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  uid: string;
  fullName: string;
  email: string;
  role: 'admin' | 'accountant' | 'supervisor' | 'user';
  phone?: string;
  createdAt: string;
}

export interface Worker {
  id: string;
  fullName: string;
  phone: string;
  profession: string;
  dailyWage: number;
  startDate: string;
  isArchived: boolean;
  photoUrl?: string;
  notes?: string;
  currentBalance: number; // calculated as total wages earned minus total advances/withdrawals
  createdAt: string;
}

export interface WageRecord {
  id: string;
  workerId: string;
  workerName: string;
  date: string; // YYYY-MM-DD
  daysWorked: number; // e.g. 1, 0.5, 2
  rate: number;
  totalEarned: number;
  notes?: string;
  registeredBy: string; // manager name/id
  createdAt: string;
}

export interface AdvanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  date: string; // YYYY-MM-DD
  amount: number;
  type: 'advance' | 'withdrawal'; // advance is sflh, withdrawal is s7b
  notes?: string;
  registeredBy: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'delayed' | 'leave'; // حاضِر، غائب، متأخر، إجازة
  delayMinutes?: number;
  overtimeHours?: number;
  notes?: string;
  recordedBy: string;
}

export interface CashTransaction {
  id: string;
  type: 'receipt' | 'payment'; // قبض or صرف
  category: string; // e.g. 'رواتب عمال', 'سلفة عامل', 'رأس مال', 'دفعة عميل', 'مصاريف تشغيلية'
  amount: number;
  title: string;
  date: string; // YYYY-MM-DD
  relatedId?: string; // e.g. workerId or wageId if linked
  notes?: string;
  recordedBy: string;
}

export interface AppSettings {
  language: 'ar';
  isDarkMode: boolean;
  offlineMode: boolean;
  currency: string; // e.g. 'دولار' or 'ريال' or 'جنيه' or 'د.ع'
  allowSupervisorWagesEdit: boolean;
}

export interface CompanySettings {
  companyName: string;
  companyAddress: string;
  phoneNumbers: string;
  servicesOrProducts: string;
  companyLogo: string;
  managerSignature: string;
  companyStamp: string;
}

