import { getLocalDateString } from '../../../core/utils';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { CashTransaction } from '../../../core/types';
import { 
  Calculator, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Trash2, 
  TrendingUp, 
  X
} from 'lucide-react';

export const CashBoxPage: React.FC = () => {
  const { transactions, addTransaction, setTransactions, settings, currentUser } = useApp();

  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [txType, setTxType] = useState<'receipt' | 'payment'>('receipt');
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(500);
  const [category, setCategory] = useState('دفعة عميل');
  const [date, setDate] = useState(getLocalDateString());
  const [notes, setNotes] = useState('');

  const [typeFilter, setTypeFilter] = useState<'all' | 'receipt' | 'payment'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const totalInflows = transactions
    .filter(t => t.type === 'receipt')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalOutflows = transactions
    .filter(t => t.type === 'payment')
    .reduce((sum, item) => sum + item.amount, 0);

  const currentLiquidBalance = totalInflows - totalOutflows;

  const totalRevenues = transactions
    .filter(t => t.type === 'receipt' && t.category === 'دفعة عميل')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'payment' && t.category !== 'سلفة عامل')
    .reduce((sum, item) => sum + item.amount, 0);

  const netOperativeProfits = totalRevenues - totalExpenses;

  const categoriesList = ['All', ...Array.from(new Set(transactions.map(t => t.category)))];

  const filteredLedger = transactions.filter(t => {
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesType && matchesCategory;
  });

  const handleOpenVoucher = (type: 'receipt' | 'payment') => {
    setTxType(type);
    setTitle('');
    setAmount(200);
    setCategory(type === 'receipt' ? 'دفعة عميل' : 'مصاريف تشغيلية');
    setDate(getLocalDateString());
    setNotes('');
    setShowVoucherModal(true);
  };

  const handleSaveTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || amount <= 0) return;

    addTransaction({
      type: txType,
      category,
      amount: Number(amount),
      title,
      date,
      notes: notes || undefined,
      recordedBy: currentUser?.fullName || 'محاسب الخزينة'
    });

    setShowVoucherModal(false);
  };

  const handleDeleteTx = (id: string, label: string) => {
    if (window.confirm(`هل تريد حقاً مسح وحذف هذا القيد المالي من الدفتر (${label})؟ سيؤثر هذا مباشرة على حساب الخزينة.`)) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'رأس مال': return 'رأس مال تشغيلي';
      case 'دفعة عميل': return 'إيراد دفعة عميل';
      case 'رواتب عمال': return 'سداد أجور عمال';
      case 'سلفة عامل': return 'صرف سلفة مستقطعة';
      case 'مصاريف تشغيلية': return 'مصاريف عامة وتشغيل';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <span>حركة الصندوق والحسابات الختامية</span>
          </h1>
          <p className="text-[10px] text-gray-500 mt-0.5">ضبط الخزينة النقدية، ترحيل سندات القبض والدفع، مراجعة الأرباح والخسائر للموقع</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleOpenVoucher('receipt')}
            className="px-4 py-2.5 bg-emerald-700 text-white hover:bg-emerald-600 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>سند قبض (+ إيراد)</span>
          </button>
          <button
            onClick={() => handleOpenVoucher('payment')}
            className="px-4 py-2.5 bg-red-600 text-white hover:bg-red-500 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>سند صرف (- مصروف)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900 text-white p-4 rounded-3xl shadow-md border border-stone-800 space-y-1">
          <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider block">رصيد خزينة الصندوق الفعلي</span>
          <span className="text-2xl font-black font-mono block">
            {currentLiquidBalance.toLocaleString()} <span className="text-xs text-amber-400 font-sans">{settings.currency}</span>
          </span>
          <span className="text-[9px] text-stone-400 block pb-1 border-t border-stone-800/80 pt-1">السيولة النقدية بموقع الورشة</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-1">
          <span className="text-gray-400 text-[9px] font-bold block">إجمالي سندات القبض المحصلة</span>
          <span className="text-2xl font-black text-gray-900 font-mono block text-emerald-700">
            {totalInflows.toLocaleString()} <span className="text-xs text-gray-500 font-sans">{settings.currency}</span>
          </span>
          <span className="text-[9px] text-emerald-600 block pb-1 border-t border-gray-100 pt-1">تغذيات + ايرادات ودفعات ملاّك</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-1">
          <span className="text-gray-400 text-[9px] font-bold block">إجمالي سندات الصرف المنصرفة</span>
          <span className="text-2xl font-black text-gray-900 font-mono block text-red-700">
            {totalOutflows.toLocaleString()} <span className="text-xs text-gray-500 font-sans">{settings.currency}</span>
          </span>
          <span className="text-[9px] text-red-500 block pb-1 border-t border-gray-100 pt-1">أجور عمال + سلف + موازنة تشغيل</span>
        </div>

        <div className="bg-gradient-to-tr from-emerald-800 to-emerald-950 text-white p-4 rounded-3xl shadow space-y-1 animate-none">
          <span className="text-amber-300 text-[9px] font-bold block">صافي أرباح المشروع التقديرية</span>
          <span className={`text-2xl font-black font-mono block ${netOperativeProfits >= 0 ? 'text-white' : 'text-red-300'}`}>
            {netOperativeProfits.toLocaleString()} <span className="text-xs text-amber-400 font-sans">{settings.currency}</span>
          </span>
          <span className="text-[9px] text-emerald-300 block pb-1 border-t border-emerald-800/80 pt-1">المبيعات الإجمالية ناقص المصاريف الكلية</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 border-b pb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <TrendingUp className="w-4.5 h-4.5 text-emerald-700" />
              <span>دفتر حسابات القيود المالية اليومي</span>
            </h2>
            <p className="text-[10px] text-gray-450 mt-0.5">جدول يوضح جميع حركات الإدخال والصرف، الدفعات، ورواتب اليد العاملة</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-gray-50 px-2 py-1 rounded-xl border border-gray-150 text-xs">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 font-bold rounded-lg transition ${
                  typeFilter === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
                }`}
              >
                جميع القيود
              </button>
              <button
                onClick={() => setTypeFilter('receipt')}
                className={`px-3 py-1 font-bold rounded-lg transition ${
                  typeFilter === 'receipt' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
                }`}
              >
                مقبوضات
              </button>
              <button
                onClick={() => setTypeFilter('payment')}
                className={`px-3 py-1 font-bold rounded-lg transition ${
                  typeFilter === 'payment' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
                }`}
              >
                مدفوعات
              </button>
            </div>

            <div className="text-xs flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-xl border border-gray-150">
              <span className="text-gray-400">التصنيف المحاسبي:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent border-none font-bold text-emerald-850 focus:outline-none"
              >
                {categoriesList.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat === 'All' ? 'جميع الحسابات' : cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredLedger.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs">
            🚫 لا توجد قيود مسجلة تطابق التصفية المحددة.
          </div>
        ) : (
          <div className="overflow-x-auto scroller-minimal">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-150">
                  <th className="p-2.5 font-bold">تاريخ القيد</th>
                  <th className="p-2.5 font-bold">اسم المعاملة المالية</th>
                  <th className="p-2.5 font-bold">نوع الحركة</th>
                  <th className="p-2.5 font-bold">حساب التصنيف</th>
                  <th className="p-2.5 font-bold">المبلغ المالي</th>
                  <th className="p-2.5 font-bold">المنظّم</th>
                  <th className="p-2.5 font-bold text-left">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLedger.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-all text-xs">
                    <td className="p-2.5 font-mono text-gray-550 whitespace-nowrap">{tx.date}</td>
                    <td className="p-2.5 font-extrabold text-gray-900">{tx.title}</td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        tx.type === 'receipt' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {tx.type === 'receipt' ? '+' : '-'}{tx.type === 'receipt' ? 'قبض نقدي' : 'صرف نقدي'}
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-600 whitespace-nowrap font-medium">
                      {getCategoryLabel(tx.category)}
                    </td>
                    <td className={`p-2.5 font-mono font-black ${
                      tx.type === 'receipt' ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {tx.type === 'receipt' ? '+' : '-'}{tx.amount.toLocaleString()} {settings.currency}
                    </td>
                    <td className="p-2.5 text-gray-550 whitespace-nowrap">{tx.recordedBy}</td>
                    <td className="p-2.5 text-left whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteTx(tx.id, tx.title)}
                        className="p-1.5 border border-gray-150 bg-white hover:bg-red-50 hover:border-red-300 text-gray-400 hover:text-red-600 rounded-lg cursor-pointer transition-all"
                        title="إبطال ومسح هذا القيد"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showVoucherModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative text-right" dir="rtl">
            <div className={`p-4 text-white flex justify-between items-center ${
              txType === 'receipt' ? 'bg-emerald-950' : 'bg-red-950'
            }`}>
              <h2 className="text-sm font-bold text-amber-100 flex items-center gap-2">
                {txType === 'receipt' ? <ArrowDownLeft className="w-4 h-4 text-emerald-400" /> : <ArrowUpRight className="w-4 h-4 text-red-400" />}
                <span>{txType === 'receipt' ? 'إنشاء سند قبض مالي جديد' : 'إنشاء سند صرف مالي جديد'}</span>
              </h2>
              <button 
                onClick={() => setShowVoucherModal(false)}
                className="p-1 rounded-full bg-black/10 hover:bg-black/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTx} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">عنوان أو غرض المعاملة المالية *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: دفعة تشغيلية من المالك الرئيسي"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">المبلغ ({settings.currency}) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 font-mono font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">تصنيف الحساب المحاسبي *</label>
                  {txType === 'receipt' ? (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 text-xs px-3 py-2.5 focus:outline-none"
                    >
                      <option value="دفعة عميل">إيراد عميل مباشر</option>
                      <option value="رأس مال">رأس مال تشغيل</option>
                      <option value="إيداع آخر">إمداد وتمويل خارجي</option>
                    </select>
                  ) : (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 text-xs px-3 py-2.5 focus:outline-none"
                    >
                      <option value="مصاريف تشغيلية">مصاريف عامة وتشغيلية</option>
                      <option value="رواتب عمال">سداد رواتب وأجور</option>
                      <option value="شراء مواد ومعدات">فاتورة أخشاب ومواد ومعدات</option>
                      <option value="مأكولات ومبيت">بدلات معيشة وانتقال عمال</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">تاريخ إثبات الحركة المالية *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">ملحوظة أو بيان إضافي</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="سجل أي تلميحات تهم المراجع المحاسبي"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowVoucherModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs font-bold cursor-pointer font-sans"
                >
                  إلغاء السند
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-xl text-xs font-bold cursor-pointer font-sans ${
                    txType === 'receipt' ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  حفظ وتثبيت السند بالصندوق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CashBoxPage;
