/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { WageRecord } from '../../../core/types';
import { 
  Banknote, 
  Calendar, 
  Check, 
  FileCheck2, 
  AlertCircle,
  Plus
} from 'lucide-react';

export const WagesPage: React.FC = () => {
  const { workers, wages, recordWages, settings, currentUser } = useApp();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [wageNotes, setWageNotes] = useState('');
  
  const activeWorkers = workers.filter(w => !w.isArchived);
  const [batchDays, setBatchDays] = useState<Record<string, number>>(
    activeWorkers.reduce((acc, w) => ({ ...acc, [w.id]: 1 }), {} as Record<string, number>)
  );
  
  const [batchRates, setBatchRates] = useState<Record<string, number>>(
    activeWorkers.reduce((acc, w) => ({ ...acc, [w.id]: w.dailyWage }), {} as Record<string, number>)
  );

  const [selectedWorkerIds, setSelectedWorkerIds] = useState<Record<string, boolean>>(
    activeWorkers.reduce((acc, w) => ({ ...acc, [w.id]: true }), {} as Record<string, boolean>)
  );

  const [singleWorkerId, setSingleWorkerId] = useState('');
  const [singleDays, setSingleDays] = useState(1);
  const [singleRate, setSingleRate] = useState(100);
  const [singleNotes, setSingleNotes] = useState('');

  const [recordedSuccessfully, setRecordedSuccessfully] = useState(false);

  const handleToggleSelect = (workerId: string) => {
    setSelectedWorkerIds(prev => ({ ...prev, [workerId]: !prev[workerId] }));
  };

  const handleSetDays = (workerId: string, val: number) => {
    setBatchDays(prev => ({ ...prev, [workerId]: val }));
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recordsToSave: Omit<WageRecord, 'id' | 'createdAt'>[] = [];
    
    activeWorkers.forEach(w => {
      if (selectedWorkerIds[w.id]) {
        const days = batchDays[w.id] ?? 1;
        const rate = batchRates[w.id] ?? w.dailyWage;
        const earned = days * rate;
        
        recordsToSave.push({
          workerId: w.id,
          workerName: w.fullName,
          date: selectedDate,
          daysWorked: days,
          rate,
          totalEarned: earned,
          notes: wageNotes || `تسجيل حضور وعمل يومي بمدى {days} يوم`,
          registeredBy: currentUser?.fullName || 'مراقب النظام'
        });
      }
    });

    if (recordsToSave.length === 0) {
      alert('يرجى اختيار اسم كشف عامل واحد على الأقل لتسجيل أجره.');
      return;
    }

    recordWages(recordsToSave);
    setWageNotes('');
    setRecordedSuccessfully(true);
    
    setTimeout(() => {
      setRecordedSuccessfully(false);
    }, 3500);
  };

  const handleSaveSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleWorkerId) return;

    const worker = workers.find(w => w.id === singleWorkerId);
    if (!worker) return;

    const recordsToSave = [{
      workerId: worker.id,
      workerName: worker.fullName,
      date: selectedDate,
      daysWorked: Number(singleDays),
      rate: Number(singleRate),
      totalEarned: Number(singleDays) * Number(singleRate),
      notes: singleNotes || `تسجيل أجرة تسوية فردية`,
      registeredBy: currentUser?.fullName || 'مراقب النظام'
    }];

    recordWages(recordsToSave);
    
    setSingleWorkerId('');
    setSingleDays(1);
    setSingleNotes('');
    setRecordedSuccessfully(true);
    setTimeout(() => setRecordedSuccessfully(false), 3500);
  };

  const handleSingleWorkerChange = (workerId: string) => {
    setSingleWorkerId(workerId);
    const worker = workers.find(w => w.id === workerId);
    if (worker) {
      setSingleRate(worker.dailyWage);
    }
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
          <Banknote className="w-5 h-5 text-emerald-700" />
          <span>سجل احتساب الأجور اليومية لورش العمل</span>
        </h1>
        <p className="text-[10px] text-gray-500 mt-0.5">تسجيل فترات العمل وأيام الدوام، والخصومات، وحساب إجمالي المستحقات بالتوافق مع فئات الرواتب</p>
      </div>

      {recordedSuccessfully && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs p-4 rounded-2xl flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <span className="font-bold">✓ تم ترحيل وحفظ قيود الأجر بنجاح!</span>
            <span className="block text-[10px] text-emerald-700 mt-0.5">تم تحديث كشف العمال المالي وخصم السلف نقدًا، وقيد الصرف التلقائي في الخزينة.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <FileCheck2 className="w-4.5 h-4.5 text-emerald-700" />
                <span>ترحيل جماعي لأجور الأيام</span>
              </h2>
              <p className="text-[10px] text-gray-400 mt-0.5">تسجيل يومية كاملة لعمال الموقع لتاريخ محدد معاً بضغط زر واحدة</p>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent border-none text-xs text-gray-800 font-mono font-bold focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <form onSubmit={handleSaveBatch} className="space-y-4">
            {activeWorkers.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 text-gray-400 text-xs rounded-2xl">
                ⚠️ لا يوجد عمال نشطين مؤهلين في القائمة حالياً. يرجى تنشيط العمال من صفحة شؤون العمال أولاً.
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-150 max-h-76 overflow-y-auto pr-1">
                  {activeWorkers.map((w) => {
                    const days = batchDays[w.id] ?? 1;
                    const rate = batchRates[w.id] ?? w.dailyWage;
                    const total = days * rate;
                    const isChecked = selectedWorkerIds[w.id] ?? false;

                    return (
                      <div key={w.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelect(w.id)}
                            className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-gray-300 ml-1 cursor-pointer"
                          />
                          <div className={isChecked ? 'opacity-100' : 'opacity-45'}>
                            <span className="font-extrabold text-gray-900 block">{w.fullName}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{w.profession} • الراتب الثابت: {w.dailyWage} {settings.currency}</span>
                          </div>
                        </div>

                        {isChecked && (
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
                              <button
                                type="button"
                                onClick={() => handleSetDays(w.id, 1)}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded ${days === 1 ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}
                              >
                                يوم كامل
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSetDays(w.id, 0.5)}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded ${days === 0.5 ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}
                              >
                                نصف يوم
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSetDays(w.id, 1.5)}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded ${days === 1.5 ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}
                              >
                                يوم ونصف
                              </button>
                            </div>

                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-gray-450">أو يدوي:</span>
                              <input
                                type="number"
                                step="0.25"
                                min="0"
                                value={days}
                                onChange={(e) => handleSetDays(w.id, Number(e.target.value))}
                                className="w-12 text-center rounded bg-gray-50 border border-gray-200 py-1 text-[11px] font-mono font-bold focus:outline-none"
                              />
                            </div>

                            <div className="text-left min-w-24">
                              <span className="text-[9px] text-gray-450 block">مستحقات اليوم:</span>
                              <span className="font-mono font-black text-emerald-700 text-xs">
                                {total.toLocaleString()} {settings.currency}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1 pt-3 border-t border-gray-150">
                  <label className="text-xs font-bold text-gray-700 block">بيان أو ملاحظات الكشف الجماعي</label>
                  <input
                    type="text"
                    value={wageNotes}
                    onChange={(e) => setWageNotes(e.target.value)}
                    placeholder="مثال: احتساب فترات التشغيل والعمل للمرحلة الخامسة لعملية الصب الإسمنتي"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md select-none flex items-center justify-center gap-2"
                  >
                    <Check className="w-4.5 h-4.5" />
                    <span>حفظ وترحيل مستحقات الكشف الجماعي المذكور</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 h-fit space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-950 flex items-center gap-1.5">
              <Plus className="w-4.5 h-4.5 text-emerald-700" />
              <span>إدخال قيد أجرة منفرد</span>
            </h2>
            <p className="text-[10px] text-gray-450 mt-0.5">تسجيل أجرة تسوية أو عمل إضافي متبدل لعامل واحد فقط بشكل منفصل</p>
          </div>

          <form onSubmit={handleSaveSingle} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">اختر العامل المستهدف *</label>
              <select
                required
                value={singleWorkerId}
                onChange={(e) => handleSingleWorkerChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs focus:outline-none"
              >
                <option value="">-- اضغط للاختيار --</option>
                {activeWorkers.map(w => (
                  <option key={w.id} value={w.id}>{w.fullName} ({w.profession})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">فترة العمل باليوم *</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  min="0.1"
                  value={singleDays}
                  onChange={(e) => setSingleDays(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">الأجر اليومي المطبق *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={singleRate}
                  onChange={(e) => setSingleRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-150/50 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-bold">الحساب الإجمالي:</span>
              <span className="text-emerald-700 font-mono font-black text-sm">
                {(singleDays * singleRate).toLocaleString()} {settings.currency}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">بيان أو سبب التسوية</label>
              <input
                type="text"
                value={singleNotes}
                onChange={(e) => setSingleNotes(e.target.value)}
                placeholder="مثال: عمل إضافي صب خرساني"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!singleWorkerId}
              className="w-full py-2.5 bg-emerald-900 border border-emerald-800 hover:bg-emerald-850 text-white rounded-xl text-xs font-bold transition disabled:opacity-40"
            >
              ترحيل الأجر الفردي
            </button>
          </form>
        </div>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-3xl flex gap-3 text-xs leading-relaxed text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">ملاحظة تنظيمية حيوية:</span>
          <span className="block text-gray-600 text-[10px] mt-1">
            تسجيل وترحيل قيود الرواتب والأجور اليومية يقوم آلياً بتسجيل قضايا قبض رواتب معلقة ويخصمها من الرصيد الحسابي الداخلي، مما ينتج حركة سداد نقدية فورية لمصاريف الصندوق المركزي لضمان انضباط موازنة العُهد والدورات الاستثمارية للمقاول الرئيسي.
          </span>
        </div>
      </div>
    </div>
  );
};
export default WagesPage;
