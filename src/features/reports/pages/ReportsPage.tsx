/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../../store/AppContext';
import { printDocument, downloadCSV, getQRCodeUrl, printMonthlyReport, printStructuredWorkerReport } from '../../../services/pdfService';
import { 
  TrendingUp, 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  Filter
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { workers, wages, advances, settings, selectedWorkerId, setSelectedWorkerId } = useApp();

  const [activeTab, setActiveTab] = useState<'worker' | 'general'>('worker');
  const [targetWorkerId, setTargetWorkerId] = useState<string>('');
  const [periodFilter, setPeriodFilter] = useState<'day' | 'week' | 'month'>('month');

  useEffect(() => {
    if (selectedWorkerId) {
      setTargetWorkerId(selectedWorkerId);
      setActiveTab('worker');
    }
  }, [selectedWorkerId]);

  const currentWorker = workers.find(w => w.id === targetWorkerId);

  const workerWages = wages.filter(wg => wg.workerId === targetWorkerId);
  const workerAdvances = advances.filter(adv => adv.workerId === targetWorkerId);

  interface CombinedLedgerItem {
    id: string;
    date: string;
    description: string;
    type: 'credit' | 'debit';
    amount: number;
    recordedBy: string;
  }

  const combinedLedger: CombinedLedgerItem[] = [
    ...workerWages.map(wg => ({
      id: wg.id,
      date: wg.date,
      description: wg.notes || `أجرة دوام (${wg.daysWorked}) يوم بسعر ${wg.rate}`,
      type: 'credit' as const,
      amount: wg.totalEarned,
      recordedBy: wg.registeredBy
    })),
    ...workerAdvances.map(adv => ({
      id: adv.id,
      date: adv.date,
      description: adv.notes || (adv.type === 'advance' ? 'سلفة نقدية' : 'سحب نقدي'),
      type: 'debit' as const,
      amount: adv.amount,
      recordedBy: adv.registeredBy
    }))
  ].sort((a, b) => b.date.localeCompare(a.date));

  const totalEarned = workerWages.reduce((sum, item) => sum + item.totalEarned, 0);
  const totalAdvances = workerAdvances.reduce((sum, item) => sum + item.amount, 0);
  const netDueBalance = totalEarned - totalAdvances;

  const handleExportCSV = () => {
    if (!currentWorker) return;
    
    const headers = ['التاريخ', 'تفاصيل الحركة', 'النوع', 'المبلغ بالعملة', 'سجلت بواسطة'];
    const filename = `كشف_حساب_${currentWorker.fullName.replace(/\s+/g, '_')}`;

    downloadCSV(
      combinedLedger,
      headers,
      (item) => [
        item.date,
        item.description,
        item.type === 'credit' ? 'أجور وحوافز (دائن)' : 'سلف ومسحوبات (مدين)',
        item.amount,
        item.recordedBy
      ],
      filename
    );
  };

  const handlePrint = () => {
    if (!currentWorker) return;
    printDocument('audit_statement_print_box', `كشف_حساب_${currentWorker.fullName}`);
  };

  const handlePrintStructuredWorkerReport = () => {
    if (!currentWorker) return;
    printStructuredWorkerReport({
      workerName: currentWorker.fullName,
      workerProfession: currentWorker.profession,
      dailyWage: currentWorker.dailyWage,
      startDate: currentWorker.startDate,
      totalWages: totalEarned,
      totalAdvances: totalAdvances,
      currency: settings.currency,
      wages: workerWages,
      advances: workerAdvances
    });
  };

  const handlePrintMonthlyReport = () => {
    const periodLabel = periodFilter === 'day' 
      ? 'آخر 24 ساعة' 
      : periodFilter === 'week' 
        ? 'آخر 7 أيام' 
        : 'آخر 30 يوم (تقرير شهري)';

    printMonthlyReport({
      periodLabel,
      totalWages: totalPeriodWagesSpend,
      totalAdvances: totalPeriodAdvancesSpend,
      currency: settings.currency,
      activeWorkersCount: workers.filter(w => !w.isArchived).length,
      wages: periodWages,
      advances: periodAdvances
    });
  };

  const filterDateLimit = () => {
    const limit = new Date();
    if (periodFilter === 'day') limit.setDate(limit.getDate() - 1);
    if (periodFilter === 'week') limit.setDate(limit.getDate() - 7);
    if (periodFilter === 'month') limit.setDate(limit.getDate() - 30);
    return limit;
  };

  const isWithinPeriod = (dateStr: string) => {
    const limit = filterDateLimit();
    const d = new Date(dateStr);
    return d >= limit;
  };

  const periodWages = wages.filter(w => isWithinPeriod(w.date));
  const periodAdvances = advances.filter(a => isWithinPeriod(a.date));

  const totalPeriodWagesSpend = periodWages.reduce((sum, item) => sum + item.totalEarned, 0);
  const totalPeriodAdvancesSpend = periodAdvances.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <span>كشوفات الحسابات والحلول الإحصائية</span>
          </h1>
          <p className="text-[10px] text-gray-550 mt-0.5">توليد تقارير مالية تفصيلية للعمال، كشوفات أجور، تدقيق السلف، وتصدير الدفاتر</p>
        </div>

        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-150">
          <button
            onClick={() => {
              setActiveTab('worker');
              setSelectedWorkerId(null);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'worker' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
            }`}
          >
            كشف حساب عامل
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'general' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
            }`}
          >
            التقارير الدورية العامة
          </button>
        </div>
      </div>

      {activeTab === 'worker' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 h-fit space-y-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Filter className="w-4.5 h-4.5 text-emerald-700" />
                <span>فرز كشف العامل المالي</span>
              </h2>
              <p className="text-[10px] text-gray-450 mt-0.5">استدعاء جميع حركات عامل محدد لمراجعته وطباعتها</p>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-xs font-bold text-gray-700 block">حدد العامل المطلوب *</label>
              <select
                value={targetWorkerId}
                onChange={(e) => {
                  setTargetWorkerId(e.target.value);
                  setSelectedWorkerId(null);
                }}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none"
              >
                <option value="">-- اضغط للاختيار --</option>
                {workers.map(w => (
                  <option key={w.id} value={w.id}>{w.fullName} (الحرفة: {w.profession})</option>
                ))}
              </select>
            </div>

            {currentWorker && (
              <div className="space-y-3.5 border-t border-gray-150 pt-4 text-xs font-medium text-gray-600">
                <div className="flex justify-between">
                  <span>مهنة العامل الكلية:</span>
                  <span className="font-bold text-gray-900">{currentWorker.profession}</span>
                </div>
                <div className="flex justify-between">
                  <span>معدل الأجرة اليومية:</span>
                  <span className="font-bold text-gray-900 font-mono">{currentWorker.dailyWage} {settings.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>تاريخ الالتحاق بالمشروع:</span>
                  <span className="font-bold text-gray-900 font-mono">{currentWorker.startDate}</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-gray-100">
            {!currentWorker ? (
              <div className="p-16 text-center text-gray-400 text-xs font-medium space-y-2">
                <FileText className="w-12 h-12 mx-auto text-gray-300" />
                <p>يرجى اختيار اسم العامل من اللائحة الجانبية لتوليد كشف حسابه المحاسبي المفصل.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-550/5 p-4 rounded-2xl border border-gray-100/50">
                  <div>
                    <h2 className="text-sm font-bold text-emerald-950">كشف حساب العامل: {currentWorker.fullName}</h2>
                    <span className="text-[10px] text-gray-400 font-mono">الكود المحاسبي: {currentWorker.id}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-1.5 bg-white border border-gray-200 hover:border-emerald-600 text-gray-600 hover:text-emerald-800 rounded-xl text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Excel / CSV</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 rounded-xl text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>سند إقرار مبسط</span>
                    </button>
                    <button
                      onClick={handlePrintStructuredWorkerReport}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>كشف منظم (PDF)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 border rounded-2xl text-center space-y-1">
                    <span className="text-gray-400 text-[9px] font-bold block">إجمالي أجور مستحقة</span>
                    <span className="text-sm font-mono font-black text-gray-900 block">
                      {totalEarned.toLocaleString()} <span className="text-[10px] text-gray-500 font-sans">{settings.currency}</span>
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 border rounded-2xl text-center space-y-1">
                    <span className="text-gray-400 text-[9px] font-bold block">إجمالي سلفيات مقتطعة</span>
                    <span className="text-sm font-mono font-black text-red-650 block">
                      {totalAdvances.toLocaleString()} <span className="text-[10px] text-gray-500 font-sans">{settings.currency}</span>
                    </span>
                  </div>
                  <div className={`p-3 border rounded-2xl text-center space-y-1 ${
                    netDueBalance >= 0 ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-red-50 text-red-900 border-red-100'
                  }`}>
                    <span className="text-[9px] font-bold block text-gray-550">الرصيد المتبقي المستحق</span>
                    <span className="text-sm font-mono font-black block">
                      {netDueBalance.toLocaleString()} <span className="text-[10px] font-sans">{settings.currency}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-900">سجل المعاملات والرواتب المفصلة للعامل</h3>
                  
                  {combinedLedger.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-xs bg-gray-50 rounded-2xl">
                      ⚠️ لا يوجد أي قيود أجر أو سلف مسجلة حالياً لهذا العامل.
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-gray-100 rounded-2xl scroller-minimal">
                      <table className="w-full text-xs text-right border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-150">
                            <th className="p-2.5 font-bold">تاريخ الحركة</th>
                            <th className="p-2.5 font-bold">البيان والتفاصيل</th>
                            <th className="p-2.5 font-bold">الحركة المالية</th>
                            <th className="p-2.5 font-bold">المبلغ</th>
                            <th className="p-2.5 font-bold">المنظّم المالي</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {combinedLedger.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-all text-xs">
                              <td className="p-2.5 font-mono text-gray-500 whitespace-nowrap">{item.date}</td>
                              <td className="p-2.5 text-gray-900 font-semibold">{item.description}</td>
                              <td className="p-2.5 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  item.type === 'credit' 
                                    ? 'bg-emerald-100/50 text-emerald-800' 
                                    : 'bg-red-100/50 text-red-800'
                                }`}>
                                  {item.type === 'credit' ? 'أجر مستحق (+)' : 'سحب / سلفة (-)'}
                                </span>
                              </td>
                              <td className={`p-2.5 font-mono font-black ${
                                item.type === 'credit' ? 'text-emerald-700' : 'text-red-700'
                              }`}>
                                {item.type === 'credit' ? '+' : '-'}{item.amount.toLocaleString()} {settings.currency}
                              </td>
                              <td className="p-2.5 text-gray-400 whitespace-nowrap">{item.recordedBy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="hidden">
                  <div id="audit_statement_print_box" dir="rtl" className="text-right p-6 text-gray-900 bg-white">
                    <div className="my-4 p-4 rounded-xl border-dashed border-2 bg-gray-50 border-gray-200">
                      <h2 className="text-lg font-bold text-center mb-4">كشف كفاءة مالية معتمد وإقرار أجور</h2>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p><strong>اسم العامل:</strong> {currentWorker.fullName}</p>
                          <p><strong>رقم العامل التعريفي:</strong> {currentWorker.id}</p>
                          <p><strong>المهنة/الصفة:</strong> {currentWorker.profession}</p>
                        </div>
                        <div className="text-left">
                          <p><strong>معدل الأجر اليومي:</strong> {currentWorker.dailyWage} {settings.currency}</p>
                          <p><strong>مجموع الدفعات المسلمة:</strong> {totalAdvances} {settings.currency}</p>
                          <p><strong>الرصيد النهائي:</strong> {netDueBalance} {settings.currency} ({netDueBalance >= 0 ? 'مستحق له الوفاء' : 'مطالب بإرجاعه'})</p>
                        </div>
                      </div>
                    </div>

                    <div className="my-6">
                      <h3 className="font-bold border-b pb-2 mb-3">حسابات القيود والسندات</h3>
                      <table className="w-full text-xs text-right border-collapse">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-2">التاريخ</th>
                            <th className="p-2">تفاصيل وقيمة السند</th>
                            <th className="p-2">النوع</th>
                            <th className="p-2">المبلغ المالي المذكور</th>
                          </tr>
                        </thead>
                        <tbody>
                          {combinedLedger.map(item => (
                            <tr key={item.id} className="border-b">
                              <td className="p-2 font-mono text-gray-500">{item.date}</td>
                              <td className="p-2">{item.description}</td>
                              <td className="p-2">{item.type === 'credit' ? 'أجور وحوافز دائن' : 'سحوبات وسلف مدين'}</td>
                              <td className="p-2 font-mono font-bold">{item.amount} {settings.currency}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 flex justify-between items-end">
                      <div className="text-xs text-gray-400">
                        <p>توقيع المستلم (العامل المقر به): ............................................</p>
                        <p className="mt-2 text-[10px] italic">أقر أنا المقر أدناه بصحة القيود المدرجة ورصيدي دفترياً واستلام المبالغ نقداً.</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img 
                          src={getQRCodeUrl(`AL-QADY-STATEMENT-${currentWorker.id}-NET:${netDueBalance}`)} 
                          alt="Security Statement QR Code" 
                          className="w-24 h-24 border p-1 rounded bg-white shadow-2xs"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] text-gray-400 block max-w-28 text-center mt-1">التحقق السريع وإبراء الذمة المالية</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Calendar className="w-4.5 h-4.5 text-emerald-700" />
                <span>التقرير الدوري العام لتكاليف اليد العاملة والتشغيل</span>
              </h2>
              <p className="text-[10px] text-gray-450 mt-0.5">مراجعة وتحليل سريع لإجمالي موازنة الموقع ورواتب الأجور المصروفة</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-150">
                <button
                  onClick={() => setPeriodFilter('day')}
                  className={`px-3 py-1 text-xs font-bold rounded ${periodFilter === 'day' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-500 hover:text-emerald-700'}`}
                >
                  آخر 24 ساعة
                </button>
                <button
                  onClick={() => setPeriodFilter('week')}
                  className={`px-3 py-1 text-xs font-bold rounded ${periodFilter === 'week' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-500 hover:text-emerald-700'}`}
                >
                  آخر 7 أيام
                </button>
                <button
                  onClick={() => setPeriodFilter('month')}
                  className={`px-3 py-1 text-xs font-bold rounded ${periodFilter === 'month' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-500 hover:text-emerald-700'}`}
                >
                  آخر 30 يوم (تقرير شهري)
                </button>
              </div>

              <button
                onClick={handlePrintMonthlyReport}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة التقرير الدوري (PDF)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-gray-700">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <span className="font-extrabold text-sm text-gray-900 block border-b pb-1.5 border-gray-200">ملخص الالتزامات والأجور</span>
              
              <div className="flex justify-between items-center text-xs">
                <span>رواتب محتسبة ومستحقة الصرف:</span>
                <span className="font-mono font-bold text-gray-900">{totalPeriodWagesSpend.toLocaleString()} {settings.currency}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span>سلف ونقود مقتطعة للعمال:</span>
                <span className="font-mono font-bold text-red-650">{totalPeriodAdvancesSpend.toLocaleString()} {settings.currency}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <span className="font-extrabold text-sm text-gray-900 block border-b pb-1.5 border-gray-200">السيولة وتوزيع المهام</span>
              
              <div className="flex justify-between items-center text-xs">
                <span>صافي التكلفة التشغيلية للعمال:</span>
                <span className="font-mono font-bold text-emerald-800">
                  {(totalPeriodWagesSpend - totalPeriodAdvancesSpend).toLocaleString()} {settings.currency}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span>تعداد العمال المشاركين برصد الساعات:</span>
                <span className="font-mono font-bold text-gray-900">
                  {workers.filter(w=>!w.isArchived).length} عمال نشطين
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Wages Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-900 border-[#0A2617]/10 border-b pb-2 flex items-center justify-between">
                <span>رواتب الأجور المسجلة خلال الفترة ({periodWages.length})</span>
                <span className="text-[10px] text-gray-500 font-normal">تصفية زمنية تلقائية</span>
              </h3>
              {periodWages.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-xs bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  لا توجد سجلات أجور مسجلة لهذه الفترة المحددة.
                </div>
              ) : (
                <div className="space-y-3 max-h-[350px] overflow-y-auto scroller-minimal pr-1">
                  {periodWages.map((w) => (
                    <div key={w.id} className="p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50/50 transition-all shadow-xs flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <div className="font-extrabold text-gray-950">{w.workerName}</div>
                        <div className="text-[10px] text-gray-500">
                          بمعدل {w.rate} {settings.currency} • دوام {w.daysWorked} يوم
                        </div>
                        {w.notes && (
                          <div className="text-[10px] text-gray-400 italic">
                            💬 {w.notes}
                          </div>
                        )}
                        <div className="text-[9px] text-[#0A2617] font-semibold bg-[#ECC45C]/15 px-2.5 py-0.5 rounded-full inline-block mt-1">
                          المنظم المالي: {w.registeredBy}
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <div className="font-black text-emerald-700 text-xs font-mono">
                          +{w.totalEarned.toLocaleString()} {settings.currency}
                        </div>
                        <div className="text-[9px] text-gray-400 font-mono">
                          {w.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advances Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-900 border-[#0A2617]/10 border-b pb-2 flex items-center justify-between">
                <span>السلف والسحوبات المستقطعة خلال الفترة ({periodAdvances.length})</span>
                <span className="text-[10px] text-gray-500 font-normal">خصم فوري من الرصيد</span>
              </h3>
              {periodAdvances.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-xs bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  لا توجد طلبات سحب أو سلف لهذه الفترة المحددة.
                </div>
              ) : (
                <div className="space-y-3 max-h-[350px] overflow-y-auto scroller-minimal pr-1">
                  {periodAdvances.map((adv) => (
                    <div key={adv.id} className="p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50/50 transition-all shadow-xs flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <div className="font-extrabold text-gray-950">{adv.workerName}</div>
                        <div className="flex gap-1.5 items-center">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            adv.type === 'advance' 
                              ? 'bg-amber-50 text-amber-800 border border-amber-200/50' 
                              : 'bg-red-50 text-red-850 border border-red-200'
                          }`}>
                            {adv.type === 'advance' ? 'سلفة مالية مؤقتة' : 'سحب نقدي مباشر'}
                          </span>
                        </div>
                        {adv.notes && (
                          <div className="text-[10px] text-gray-400 italic">
                            💬 {adv.notes}
                          </div>
                        )}
                        <div className="text-[9px] text-[#0A2617] font-semibold bg-[#ECC45C]/15 px-2.5 py-0.5 rounded-full inline-block mt-1">
                          المنظم المالي: {adv.registeredBy}
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <div className="font-black text-red-600 text-xs font-mono">
                          -{adv.amount.toLocaleString()} {settings.currency}
                        </div>
                        <div className="text-[9px] text-gray-400 font-mono">
                          {adv.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-xs text-amber-900 leading-normal">
            ⚙️ كشف الأرباح والخسائر الشامل وجميع القوائم الختامية تتوفر أيضاً في صفحة <b>حركة الصندوق</b> لرصد العهد المالي المركزي وسندات صرف الكاش وسندات القبض.
          </div>
        </div>
      )}
    </div>
  );
};
export default ReportsPage;
