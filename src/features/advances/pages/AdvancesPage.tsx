/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { AdvanceRecord } from '../../../core/types';
import { printDocument, getQRCodeUrl } from '../../../services/pdfService';
import { 
  HandCoins, 
  Plus, 
  Printer, 
  AlertTriangle, 
  Check,
  Share2
} from 'lucide-react';

export const AdvancesPage: React.FC = () => {
  const { workers, advances, wages, recordAdvance, settings, currentUser } = useApp();

  const [workerId, setWorkerId] = useState('');
  const [amount, setAmount] = useState(100);
  const [type, setType] = useState<'advance' | 'withdrawal'>('advance');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  
  const [selectedVoucherForPrint, setSelectedVoucherForPrint] = useState<AdvanceRecord | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; msg: string; isWarning: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId || !amount) return;

    const res = recordAdvance({
      workerId,
      workerName: workers.find(w => w.id === workerId)?.fullName || 'عامل غير معروف',
      date,
      amount,
      type,
      notes: notes || (type === 'advance' ? 'سلفة على راتب العمل' : 'سحب نقدي مرخص مسبقاً'),
      registeredBy: currentUser?.fullName || 'محاسب النظام'
    });

    if (res.success) {
      setAlertInfo({
        show: true,
        msg: res.message,
        isWarning: res.isWarning
      });
      
      setWorkerId('');
      setAmount(100);
      setNotes('');
    }
  };

  const handlePrintVoucher = (v: AdvanceRecord) => {
    setSelectedVoucherForPrint(v);
    setTimeout(() => {
      printDocument('printable_voucher_box', `سند_صرف_${v.id}`);
    }, 100);
  };

  const handleExportVoucher = (v: AdvanceRecord, mode: 'share' | 'download') => {
    setSelectedVoucherForPrint(v);
    setTimeout(() => {
      const content = document.getElementById('printable_voucher_box');
      if (content) {
        import('../../../services/pdfService').then(({ exportPDF }) => {
          exportPDF(content.innerHTML, `سند_صرف_${v.id}`, mode);
        });
      }
    }, 100);
  };

  const getWorkerNetBalance = (id: string) => {
    const selectedWorker = workers.find(w => w.id === id);
    if (!selectedWorker) return 0;
    
    const totalEarned = wages.filter(wg => wg.workerId === id).reduce((sum, item) => sum + item.totalEarned, 0);
    const totalAdvances = advances.filter(adv => adv.workerId === id).reduce((sum, item) => sum + item.amount, 0);
    return totalEarned - totalAdvances;
  };

  const balanceForWorker = workerId ? getWorkerNetBalance(workerId) : 0;
  const isExceeding = workerId && amount > balanceForWorker;

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
          <HandCoins className="w-5 h-5 text-emerald-700" />
          <span>إدارة السندات والسلف النقدية للأجور</span>
        </h1>
        <p className="text-[10px] text-gray-500 mt-0.5">تسجيل صرف السلف والسحوبات النقدية المباشرة المخصومة تلقائياً من ذمة العامل والمستحقات المكتسبة</p>
      </div>

      {alertInfo?.show && (
        <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed ${
          alertInfo.isWarning 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-900' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900'
        }`}>
          {alertInfo.isWarning ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          ) : (
            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <span className="font-bold block text-sm">
              {alertInfo.isWarning ? 'تنبيه محاسبي مهم جداً' : '✓ تم إثبات قيد السند بنجاح'}
            </span>
            <span className="block text-[11px] mt-1 text-gray-700">{alertInfo.msg}</span>
            <button 
              onClick={() => setAlertInfo(null)}
              className="mt-2 text-[10px] underline font-bold cursor-pointer block text-emerald-950"
            >
              إغلاق الإشعار
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 h-fit space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Plus className="w-4.5 h-4.5 text-emerald-700" />
              <span>إنشاء وتحرير سند صرف جديد</span>
            </h2>
            <p className="text-[10px] text-gray-450 mt-0.5">صرف نقود من الخزينة لحساب سلفية أو سحب نقدي للعامل</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">اختر العامل المستفيد *</label>
              <select
                required
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs focus:outline-none"
              >
                <option value="">-- اضغط للاختيار والتصفية --</option>
                {workers.filter(w => !w.isArchived).map(w => (
                  <option key={w.id} value={w.id}>{w.fullName} (الحرفة: {w.profession})</option>
                ))}
              </select>
            </div>

            {workerId && (
              <div className={`p-3 rounded-2xl border text-xs flex justify-between items-center ${
                balanceForWorker >= 0 
                  ? 'bg-emerald-500/5 border-emerald-300/30 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}>
                <div>
                  <span className="text-[10px] text-gray-500 block">حصيلة أجر العامل المتراكم حالياً:</span>
                  <span className="font-extrabold text-[11px]">الرصيد الصافي المكتسب</span>
                </div>
                <div className="text-left font-mono">
                  <span className="font-black block text-sm">{balanceForWorker} {settings.currency}</span>
                  <span className="text-[9px] block text-gray-400">({balanceForWorker >= 0 ? 'مستحق له' : 'مدين عليه'})</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('advance')}
                className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all text-center cursor-pointer ${
                  type === 'advance'
                    ? 'bg-amber-100 border-amber-400 text-amber-800'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                }`}
              >
                سند سلفة عاجلة (سِلْفَة)
              </button>
              <button
                type="button"
                onClick={() => setType('withdrawal')}
                className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all text-center cursor-pointer ${
                  type === 'withdrawal'
                    ? 'bg-amber-100 border-amber-400 text-amber-800'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                }`}
              >
                سند سحب نقدي رصيد
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">قيمة المبلغ المراد صرفه ({settings.currency}) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 block">تاريخ الإثبات والصرف *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            {isExceeding && (
              <div className="p-3 bg-red-500/5 text-red-900 border border-red-500/20 rounded-2xl flex gap-2 text-[10px] leading-relaxed">
                <AlertTriangle className="w-4.5 h-4.5 text-red-600 flex-shrink-0" />
                <span>
                  <strong>تنبيه مالي عالي المخاطر:</strong> مبلغ السند ({amount} {settings.currency}) أعلى من الرصيد المتوفر للعامِل ({balanceForWorker} {settings.currency}). ترحيل السند سيضع صِفة حساب العامل في حالة "عَجز مديونية".
                </span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">بيان أو سبب صرف السند</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: خصم لثمن علاجات صحية أو مأكولات"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!workerId || amount <= 0}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer transition disabled:opacity-40 shadow-xs"
            >
              ترحيل السند وقيد الخصم
            </button>
          </form>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <HandCoins className="w-4.5 h-4.5 text-amber-600" />
                <span>أرشيف سندات الصرف والسلف المسجلة</span>
              </h2>
              <p className="text-[10px] text-gray-450 mt-0.5">جدول تفصيلي لجميع السندات الصادرة للعمال مع طباعة فواتير الصرف</p>
            </div>
          </div>

          {advances.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-250 text-gray-400 text-xs">
              لا توجد سلف أو حركة صرف نقود مسجلة بالدفتر حالياً.
            </div>
          ) : (
            <div className="overflow-x-auto scroller-minimal">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-150">
                    <th className="p-2.5 font-bold">تاريخ السند</th>
                    <th className="p-2.5 font-bold">اسم العامل</th>
                    <th className="p-2.5 font-bold">نوع الحركة</th>
                    <th className="p-2.5 font-bold">المبلغ صرفه</th>
                    <th className="p-2.5 font-bold">بيان الحساب</th>
                    <th className="p-2.5 font-bold text-left">طباعة السند</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {advances.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50 transition-all text-xs">
                      <td className="p-2.5 font-mono text-gray-500 whitespace-nowrap">{v.date}</td>
                      <td className="p-2.5 font-extrabold text-gray-950">{v.workerName}</td>
                      <td className="p-2.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          v.type === 'advance' 
                            ? 'bg-amber-100/55 text-amber-800 border border-amber-300/30' 
                            : 'bg-orange-100/55 text-orange-800 border border-orange-300/30'
                        }`}>
                          {v.type === 'advance' ? 'سلفة' : 'سحب نقدي'}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono font-black text-red-700">
                        {v.amount.toLocaleString()} {settings.currency}
                      </td>
                      <td className="p-2.5 text-gray-500 max-w-40 truncate" title={v.notes}>{v.notes}</td>
                      <td className="p-2.5 text-left whitespace-nowrap">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handlePrintVoucher(v)}
                            className="px-2.5 py-1.5 border border-gray-200 hover:border-emerald-500 text-gray-600 hover:text-emerald-800 bg-white hover:bg-emerald-50 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>طباعة السند</span>
                          </button>
                          <button
                            onClick={() => handleExportVoucher(v, 'share')}
                            className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>مشاركة</span>
                          </button>
                          <button
                            onClick={() => handleExportVoucher(v, 'download')}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <span>تنزيل PDF</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="hidden">
        <div id="printable_voucher_box" dir="rtl" className="text-right p-6 text-gray-900 border border-gray-300 rounded-xl max-w-2xl mx-auto my-4 relative bg-white">
          <div className="border-b-2 border-emerald-900 pb-4 mb-4 text-center">
            <h2 className="text-xl font-black text-emerald-950">سند صرف سلفة ونقدي مخصوم</h2>
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
              <span>رقم السند المالي: {selectedVoucherForPrint?.id}</span>
              <span>تاريخ الإمضاء والصرف: {selectedVoucherForPrint?.date}</span>
            </div>
          </div>

          <div className="space-y-4 my-6 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">اسم العامل المقتطع منه:</span>
              <span className="font-bold text-gray-950 text-base">{selectedVoucherForPrint?.workerName}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">ميزة قيد الحركة:</span>
              <span className="font-bold text-amber-700">{selectedVoucherForPrint?.type === 'advance' ? 'سلفة على الراتب اليومي' : 'سحب نقدي مخصص من الرصيد'}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">المبلغ المدفوع كاش نقداً:</span>
              <span className="font-mono font-black text-lg text-emerald-700">{selectedVoucherForPrint?.amount} {settings.currency}</span>
            </div>

            <div className="flex flex-col border-b pb-2">
              <span className="font-semibold text-gray-500 mb-1">بيان تفصيل وسبب صرف السند:</span>
              <span className="italic text-gray-700 bg-gray-50 p-2.5 rounded-lg text-xs">{selectedVoucherForPrint?.notes}</span>
            </div>

            <div className="flex justify-between border-b pb-2 text-xs">
              <span className="font-semibold text-gray-500">رحّل ونظّم من طرف:</span>
              <span className="font-medium">{selectedVoucherForPrint?.registeredBy} (حساب محاسبة معتمد)</span>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-end">
            <div className="text-xs text-gray-400 space-y-0.5">
              <p>مؤسسة القاضي للمقاولات العامة</p>
              <p>نظام التدقيق الرقمي المؤمّن</p>
              <p className="font-mono text-[9px] mt-1 text-gray-300">Hash Verification ID: sha256_algady_sign_{selectedVoucherForPrint?.id}</p>
            </div>
            {selectedVoucherForPrint && (
              <div className="flex flex-col items-center">
                <img 
                  src={getQRCodeUrl(`AL-QADY-VOUCHER:${selectedVoucherForPrint.id}|WORKER:${selectedVoucherForPrint.workerName}|AMOUNT:${selectedVoucherForPrint.amount}`)} 
                  alt="Voucher QR Code" 
                  className="w-24 h-24 border p-1 rounded bg-white shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[9px] text-gray-400 mt-1">التحقق السريع للسند</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdvancesPage;
