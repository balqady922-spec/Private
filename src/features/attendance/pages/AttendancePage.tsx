/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../../store/AppContext';
import { AttendanceRecord } from '../../../core/types';
import { 
  Clock, 
  Calendar, 
  UserCheck, 
  UserMinus, 
  Timer, 
  Info, 
  CheckCircle2, 
  BarChart,
  UserX
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { workers, attendance, recordAttendance, currentUser } = useApp();

  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const activeWorkers = workers.filter(w => !w.isArchived);

  const [statusMap, setStatusMap] = useState<Record<string, 'present' | 'absent' | 'delayed' | 'leave'>>({});
  const [delayMap, setDelayMap] = useState<Record<string, number>>({});
  const [overtimeMap, setOvertimeMap] = useState<Record<string, number>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const existingRecords = attendance.filter(r => r.date === targetDate);
    
    const newStatus: Record<string, 'present' | 'absent' | 'delayed' | 'leave'> = {};
    const newDelay: Record<string, number> = {};
    const newOvertime: Record<string, number> = {};
    const newNotes: Record<string, string> = {};

    activeWorkers.forEach(w => {
      const found = existingRecords.find(r => r.workerId === w.id);
      if (found) {
        newStatus[w.id] = found.status;
        newDelay[w.id] = found.delayMinutes || 0;
        newOvertime[w.id] = found.overtimeHours || 0;
        newNotes[w.id] = found.notes || '';
      } else {
        newStatus[w.id] = 'present';
        newDelay[w.id] = 0;
        newOvertime[w.id] = 0;
        newNotes[w.id] = '';
      }
    });

    setStatusMap(newStatus);
    setDelayMap(newDelay);
    setOvertimeMap(newOvertime);
    setNotesMap(newNotes);
  }, [targetDate, attendance, workers]);

  const handleSetStatus = (workerId: string, status: 'present' | 'absent' | 'delayed' | 'leave') => {
    setStatusMap(prev => ({ ...prev, [workerId]: status }));
  };

  const handleSetDelay = (workerId: string, min: string) => {
    setDelayMap(prev => ({ ...prev, [workerId]: Number(min) || 0 }));
  };

  const handleSetOvertime = (workerId: string, hrs: string) => {
    setOvertimeMap(prev => ({ ...prev, [workerId]: Number(hrs) || 0 }));
  };

  const handleSetNotes = (workerId: string, text: string) => {
    setNotesMap(prev => ({ ...prev, [workerId]: text }));
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recordsToSave: Omit<AttendanceRecord, 'id'>[] = activeWorkers.map(w => ({
      workerId: w.id,
      workerName: w.fullName,
      date: targetDate,
      status: statusMap[w.id] || 'present',
      delayMinutes: statusMap[w.id] === 'delayed' ? (delayMap[w.id] || 0) : undefined,
      overtimeHours: overtimeMap[w.id] || undefined,
      notes: notesMap[w.id] || undefined,
      recordedBy: currentUser?.fullName || 'مراقب عام'
    }));

    recordAttendance(targetDate, recordsToSave);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const totalChecked = activeWorkers.length;
  const countPresent = Object.values(statusMap).filter(s => s === 'present').length;
  const countAbsent = Object.values(statusMap).filter(s => s === 'absent').length;
  const countDelayed = Object.values(statusMap).filter(s => s === 'delayed').length;
  const countLeave = Object.values(statusMap).filter(s => s === 'leave').length;

  const totalOvertimeHoursWeek = attendance
    .filter(r => {
      const d = new Date(r.date);
      const diffTime = Math.abs(new Date().getTime() - d.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    })
    .reduce((sum, item) => sum + (item.overtimeHours || 0), 0);

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span>جدول الحضور والانصراف والدوام</span>
        </h1>
        <p className="text-[10px] text-gray-500 mt-0.5">ضبط الحضور اليومي، تأجيل المواعيد، رصد الساعات الإضافية لتفعيل الحوافز والمكافآت لكل عامل</p>
      </div>

      {showNotification && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs p-4 rounded-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <span className="font-bold">✓ تم حفظ ورصد كشف الحضور والدوام بنجاح!</span>
            <span className="block text-[10px] text-emerald-700 mt-0.5">تم تسجيل الدفاتر ومزامنتها بنجاح لتاريخ ({targetDate}).</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-3 rounded-2xl border border-gray-100/60 text-center">
          <span className="text-gray-400 text-[9px] font-bold block">إجمالي العمال</span>
          <span className="text-lg font-black font-mono text-gray-900 block mt-0.5">{totalChecked}</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-100/50 p-3 rounded-2xl text-center">
          <span className="text-emerald-800 text-[9px] font-bold block">حاضرين المسواة</span>
          <span className="text-lg font-black font-mono text-emerald-700 block mt-0.5">{countPresent}</span>
        </div>
        <div className="bg-amber-50 border border-amber-100/50 p-3 rounded-2xl text-center">
          <span className="text-amber-800 text-[9px] font-bold block">متأخرين بالدقائق</span>
          <span className="text-lg font-black font-mono text-amber-700 block mt-0.5">{countDelayed}</span>
        </div>
        <div className="bg-red-50 border border-red-100/50 p-3 rounded-2xl text-center">
          <span className="text-red-800 text-[9px] font-bold block">متغيبين عن الورشة</span>
          <span className="text-lg font-black font-mono text-red-700 block mt-0.5">{countAbsent}</span>
        </div>
        <div className="bg-blue-50 border border-blue-100/50 p-3 rounded-2xl text-center col-span-2 md:col-span-1">
          <span className="text-blue-800 text-[9px] font-bold block">إجازة مرخصة</span>
          <span className="text-lg font-black font-mono text-blue-700 block mt-0.5">{countLeave}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 lg:col-span-2">
          <form onSubmit={handleSaveAttendance} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <UserCheck className="w-4.5 h-4.5 text-emerald-700" />
                  <span>تأكيد دفتر دوام العمال اليومي</span>
                </h2>
                <p className="text-[10px] text-gray-400 mt-0.5">قم بتعيين حالة وحضور كل من العمال المدرجين باللائحة</p>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="bg-transparent border-none text-xs text-gray-800 font-mono font-bold focus:outline-none"
                />
              </div>
            </div>

            {activeWorkers.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                ⚠️ لا يوجد عمال حالياً لرصد حضورهم. يرجى إضافة عمال.
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto pr-1">
                {activeWorkers.map((w) => {
                  const status = statusMap[w.id] || 'present';
                  const delay = delayMap[w.id] || 0;
                  const overtime = overtimeMap[w.id] || 0;
                  const notes = notesMap[w.id] || '';

                  return (
                    <div key={w.id} className="py-4 space-y-2 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <span className="font-extrabold text-gray-900 block">{w.fullName}</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{w.profession}</span>
                        </div>

                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-150/80 w-fit">
                          <button
                            type="button"
                            onClick={() => handleSetStatus(w.id, 'present')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              status === 'present' 
                                ? 'bg-emerald-600 text-white shadow-xs' 
                                : 'text-gray-500 hover:text-emerald-700'
                            }`}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>حاضر</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSetStatus(w.id, 'delayed')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              status === 'delayed' 
                                ? 'bg-amber-500 text-emerald-950 shadow-xs' 
                                : 'text-gray-500 hover:text-amber-700'
                            }`}
                          >
                            <Timer className="w-3.5 h-3.5" />
                            <span>متأخر</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSetStatus(w.id, 'absent')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              status === 'absent' 
                                ? 'bg-red-600 text-white shadow-xs' 
                                : 'text-gray-500 hover:text-red-700'
                            }`}
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>غائب</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSetStatus(w.id, 'leave')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              status === 'leave' 
                                ? 'bg-blue-600 text-white shadow-xs' 
                                : 'text-gray-500 hover:text-blue-700'
                            }`}
                          >
                            <UserMinus className="w-3.5 h-3.5" />
                            <span>إجازة</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50/50 p-2.5 rounded-xl border border-gray-150/50">
                        {status === 'delayed' && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 whitespace-nowrap">مدة التأخير:</span>
                            <input
                              type="number"
                              min={1}
                              value={delay}
                              onChange={(e) => handleSetDelay(w.id, e.target.value)}
                              placeholder="دقائق"
                              className="w-full rounded bg-white border border-gray-200 py-1 px-2 font-mono font-bold focus:outline-none"
                            />
                            <span className="text-[10px] text-gray-400">دقائق</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 whitespace-nowrap">ساعات إضافية:</span>
                          <input
                            type="number"
                            min={0}
                            step="0.5"
                            value={overtime}
                            onChange={(e) => handleSetOvertime(w.id, e.target.value)}
                            placeholder="ساعات"
                            className="w-full rounded bg-white border border-gray-200 py-1 px-2 font-mono font-bold focus:outline-none"
                          />
                          <span className="text-[10px] text-gray-400">ساعة</span>
                        </div>

                        <div className="flex items-center gap-2 sm:col-span-2">
                          <span className="text-[10px] text-gray-500 whitespace-nowrap">بيان الفضل والسبب:</span>
                          <input
                            type="text"
                            value={notes}
                            onChange={(e) => handleSetNotes(w.id, e.target.value)}
                            placeholder="سبب العمل المستمر أو مكافأة إضافية مبررة"
                            className="w-full rounded bg-white border border-gray-200 py-1 px-2 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md select-none"
            >
              حفظ وتثبيت سجل الدوام والعمل الإضافي
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold text-gray-950 flex items-center gap-1.5">
              <BarChart className="w-4.5 h-4.5 text-emerald-700" />
              <span>أداء العمل والساعات الإضافية</span>
            </h2>
            <p className="text-[10px] text-gray-450 leading-relaxed">أثر الدوام الإيجابي لآخر 7 أيام كعمل إضافي معتمد لتغذية حسابات المكافآت.</p>

            <div className="p-4 bg-emerald-900 rounded-2xl text-white text-center text-xs space-y-1 relative overflow-hidden shadow">
              <div className="absolute inset-0 bg-linear-to-tr from-emerald-800 to-transparent opacity-80"></div>
              <div className="relative z-10">
                <span className="text-[9px] text-emerald-300 block">إجمالي الساعات الإضافية المعتمدة (الـ 7 أيام الأخيرة)</span>
                <span className="text-3xl font-mono font-black text-amber-300 block">{totalOvertimeHoursWeek}</span>
                <span className="text-[9px] text-emerald-200 block">ساعة عمل تعويضية متراكمة</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border flex gap-2 text-[10px] text-gray-500">
              <Info className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
              <span>معدل الحضور والانضباط مفيد جداً في احتساب العلاوات عند إغلاق التقرير الشهري.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttendancePage;
