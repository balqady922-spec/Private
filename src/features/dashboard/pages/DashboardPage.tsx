/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../../store/AppContext';
import { 
  Users, 
  Wallet, 
  HandCoins, 
  Activity, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertTriangle, 
  Briefcase,
  Coins
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { workers, wages, advances, transactions, settings, setActiveScreen, setSelectedWorkerId } = useApp();

  const activeWorkersCount = workers.filter(w => !w.isArchived).length;
  const totalWagesEarned = wages.reduce((sum, item) => sum + item.totalEarned, 0);
  const totalAdvancesIssued = advances.reduce((sum, item) => sum + item.amount, 0);
  const netPendingPay = totalWagesEarned - totalAdvancesIssued;

  const totalInflows = transactions
    .filter(t => t.type === 'receipt')
    .reduce((sum, item) => sum + item.amount, 0);
  const totalOutflows = transactions
    .filter(t => t.type === 'payment')
    .reduce((sum, item) => sum + item.amount, 0);
  const currentCashBoxBalance = totalInflows - totalOutflows;

  const wageTotals: Record<string, number> = {};
  for (const wg of wages) {
    wageTotals[wg.workerId] = (wageTotals[wg.workerId] || 0) + wg.totalEarned;
  }
  const advanceTotals: Record<string, number> = {};
  for (const adv of advances) {
    advanceTotals[adv.workerId] = (advanceTotals[adv.workerId] || 0) + adv.amount;
  }

  const deficitWorkers = workers
    .map(w => {
      const workerWages = wageTotals[w.id] || 0;
      const workerAdvances = advanceTotals[w.id] || 0;
      const balance = workerWages - workerAdvances;
      return { id: w.id, fullName: w.fullName, balance, workerWages, workerAdvances };
    })
    .filter(item => item.balance < 0);

  const recentTransactions = [...transactions].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);

  const last5Days = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    // adjust for local timezone correctly
    const dateStr = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0')
    ].join('-');
    const dayWages = wages.filter(w => w.date === dateStr).reduce((sum, item) => sum + item.totalEarned, 0);
    const dayAdvances = advances.filter(a => a.date === dateStr).reduce((sum, item) => sum + item.amount, 0);
    return { date: dateStr, wages: dayWages, advances: dayAdvances };
  }).reverse();

  const maxChartValue = Math.max(...last5Days.map(item => Math.max(item.wages, item.advances, 100)));

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="bg-gradient-to-l from-primary to-[#061510] p-6 rounded-2xl text-white shadow-md border-r-4 border-accent relative overflow-hidden">
        <div className="absolute pointer-events-none w-64 h-64 rounded-full bg-accent/10 blur-3xl -top-20 -left-20"></div>
        <div className="relative z-10 md:flex md:justify-between md:items-center">
          <div>
            <span className="bg-accent/20 text-accent text-[11px] font-bold px-3 py-1 rounded-full border border-accent/20">منظومة القاضي المحاسبية</span>
            <h1 className="text-2xl font-extrabold mt-3 text-white">مرحباً بك في لوحة الإدارة الذكية</h1>
            <p className="text-xs text-gray-300 mt-1.5 max-w-lg leading-relaxed">
              تنظيم شامل لأجور عمال الورش والمقاولات، كشوفات حسابية فورية، حركة الصندوق المركزي، ومزامنة البيانات لتسريع العمليات اليومية وسداد المستحقات بانتظام.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button
              onClick={() => setActiveScreen('workers')}
              className="px-4 py-2 bg-accent text-primary hover:bg-accent/90 text-xs font-bold rounded-lg transition-all shadow cursor-pointer"
            >
              تسجيل عامل جديد
            </button>
            <button
              onClick={() => setActiveScreen('wages')}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-xs font-semibold rounded-lg text-white border border-white/10 transition cursor-pointer"
            >
              تسجيل أجور يومية
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border-t-3 border-transparent hover:border-accent hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-500 text-[12px] font-medium block">إجمالي العمال</span>
            <span className="text-2xl font-extrabold text-primary font-mono block">{activeWorkersCount}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block">↑ عمال نشطين مسجلين</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border-t-3 border-transparent hover:border-accent hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-500 text-[12px] font-medium block">إجمالي أجور العمال</span>
            <span className="text-2xl font-extrabold text-primary font-mono block">
              {totalWagesEarned.toLocaleString()} <span className="text-xs text-gray-400 font-sans">{settings.currency}</span>
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block">ساعات وأيام العمل</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-amber-700 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border-t-3 border-transparent hover:border-accent hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-500 text-[12px] font-medium block">إجمالي السلف والسحوبات</span>
            <span className="text-2xl font-extrabold text-amber-600 font-mono block">
              {totalAdvancesIssued.toLocaleString()} <span className="text-xs text-gray-400 font-sans">{settings.currency}</span>
            </span>
            <span className="text-[11px] text-amber-600 font-semibold block">سلفيات نقدية معلقة</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <HandCoins className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border-t-3 border-transparent hover:border-accent hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-500 text-[12px] font-medium block">صافي الرواتب المتبقية</span>
            <span className={`text-2xl font-extrabold font-mono block ${netPendingPay >= 0 ? 'text-primary' : 'text-red-700'}`}>
              {netPendingPay.toLocaleString()} <span className="text-xs text-gray-400 font-sans">{settings.currency}</span>
            </span>
            <span className="text-[11px] text-accent font-semibold block">ذمم مستحقة للدفع</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">مؤشرات المصروفات والأجور اليومية</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">مقارنة أجور العمل المحتسبة مع السلفيات المنصرفة لآخر 5 أيام</p>
            </div>
            <div className="flex gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary inline-block"></span>أجور محتسبة</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-accent inline-block"></span>سلف منصرفة</span>
            </div>
          </div>

          <div className="relative h-48 w-full mt-4 flex items-end justify-between px-2 font-mono border-b border-gray-100 pb-1">
            {last5Days.map((item, idx) => {
              const wagePercent = item.wages > 0 ? (item.wages / maxChartValue) * 100 : 0;
              const advPercent = item.advances > 0 ? (item.advances / maxChartValue) * 100 : 0;
              const dayName = new Date(item.date).toLocaleDateString('ar-EG', { weekday: 'short' });
              
              return (
                <div key={idx} className="flex flex-col items-center flex-1 group">
                  <div className="h-32 w-full flex items-end justify-center gap-1.5 relative mb-2 pt-6">
                    <div 
                      className="w-4 bg-primary rounded-t hover:opacity-90 transition-all relative"
                      style={{ height: `${Math.max(wagePercent, 5)}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-30">
                        {item.wages} {settings.currency}
                      </div>
                    </div>
                    <div 
                      className="w-4 bg-accent rounded-t hover:opacity-90 transition-all relative"
                      style={{ height: `${Math.max(advPercent, 5)}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-30">
                        {item.advances} {settings.currency}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-gray-700 font-sans mt-1">{dayName}</span>
                  <span className="text-[9px] text-gray-400 mt-0.5">{item.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-tr from-primary to-[#061510] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-accent/20">
          <div className="absolute pointer-events-none w-32 h-32 rounded-full bg-accent/5 blur-2xl -bottom-10 -left-10"></div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-accent text-[11px] font-bold tracking-wider block">رصيد الصندوق المركزي</span>
                <span className="text-3xl font-black font-mono tracking-tight text-white block">
                  {currentCashBoxBalance.toLocaleString()} <span className="text-sm font-semibold text-accent">{settings.currency}</span>
                </span>
                <span className="text-[10px] text-gray-300 block">النقدية السائلة المتوفرة لتسوية الحسابات</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs">
              <div className="p-2 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-[10px] text-gray-400 block">إجمالي المقبوضات</span>
                <span className="font-bold text-emerald-400 block mt-0.5">{totalInflows.toLocaleString()} {settings.currency}</span>
              </div>
              <div className="p-2 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-[10px] text-gray-400 block">إجمالي المدفوعات</span>
                <span className="font-bold text-red-400 block mt-0.5">{totalOutflows.toLocaleString()} {settings.currency}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setActiveScreen('cashbox')}
              className="w-full py-2.5 bg-accent text-primary hover:bg-accent/90 text-xs font-bold rounded-lg transition-all shadow-inner cursor-pointer"
            >
              إرسال وصرف حركة الصندوق
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-gray-900">عمال تجاوزت سلفياتهم المستحق الفعلي</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-4 leading-normal">
            تنبيه حرج للعمال الذين تخطت سحوباتهم وسلفهم إجمالي أجور عملهم المستحقة لضمان توازن الصندوق.
          </p>

          {deficitWorkers.length === 0 ? (
            <div className="p-6 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 border border-emerald-100 font-medium">
              ✓ كافة حسابات سلف العمال للمشاريع ضمن المعايير الآمنة ولا يوجد تجاوز مالي!
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto scroller-minimal">
              {deficitWorkers.map((w, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">{w.fullName}</span>
                    <span className="text-[10px] text-gray-500">
                      مستحقات العمل: {w.workerWages} {settings.currency} • السلف المسحوبة: {w.workerAdvances} {settings.currency}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-black text-red-600 block dir-ltr">
                      {w.balance} {settings.currency}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedWorkerId(w.id);
                        setActiveScreen('reports');
                      }}
                      className="text-[10px] text-amber-700 font-bold underline cursor-pointer mt-0.5 block"
                    >
                      كشف تفصيلي
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-gray-900 font-sans">آخر الحركات المالية المكتملة</span>
            </div>
            <button
              onClick={() => setActiveScreen('cashbox')}
              className="text-xs font-bold text-accent hover:underline cursor-pointer"
            >
              الأرشيف الكامل ←
            </button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FA] border border-gray-100/40 hover:bg-gray-100/80 transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    tx.type === 'receipt' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    {tx.type === 'receipt' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-gray-800 block truncate">{tx.title}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{tx.date} • {tx.category}</span>
                  </div>
                </div>
                <div className={`text-xs font-mono font-extrabold pr-2 ${tx.type === 'receipt' ? 'text-emerald-700' : 'text-red-700'}`}>
                  {tx.type === 'receipt' ? '+' : '-'}{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
