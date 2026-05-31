/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useApp } from '../../../store/AppContext';
import { 
  Settings as SettingsIcon, 
  Save, 
  Database, 
  Download, 
  Upload, 
  RefreshCcw, 
  AlertOctagon, 
  Check, 
  Sparkles
} from 'lucide-react';
import { seedInitialData } from '../../../core/seed';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, clearDatabase, restoreDatabase, workers, wages, advances, attendance, transactions } = useApp();

  const [projName, setProjName] = useState(settings.projectName);
  const [curr, setCurr] = useState(settings.currency);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupLog, setBackupLog] = useState<{ text: string; success: boolean } | null>(null);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      projectName: projName,
      currency: curr
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      payload: {
        settings,
        workers,
        wages,
        advances,
        attendance,
        transactions
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `نسخة_احتياطية_القاضي_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setBackupLog({
      text: '✓ تم تصدير وتحميل ملف النسخة الاحتياطية بنجاح!',
      success: true
    });
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        
        if (!parsed.payload || !parsed.payload.workers || !parsed.payload.wages) {
          throw new Error('صيغة ملف النسخة الاحتياطية غير صالحة أو مفقودة للبيانات التشغيلية الأساسية.');
        }

        const data = parsed.payload;
        restoreDatabase(data);

        setBackupLog({
          text: '✓ تم استعادة النسخة الاحتياطية وتحديث قواعد البيانات والصندوق بنجاح!',
          success: true
        });

        setProjName(data.settings?.projectName || settings.projectName);
        setCurr(data.settings?.currency || settings.currency);

      } catch (err: any) {
        setBackupLog({
          text: `❌ فشل استعادة الملف: ${err?.message || 'تأكد من اختيار ملف JSON صحيح صدر من برمجية القاضي.'}`,
          success: false
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReseed = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط المصنع لمشروعك؟ سيتم تنشيط البيانات التجريبية الشاملة للعمال وتحديث الصندوق للأجور النموذجية.')) {
      restoreDatabase({
        settings: {
          projectName: 'القاضي لإدارة الأجور والعمال الميدانيين',
          currency: 'دولار',
          allowSupervisorWagesEdit: true
        },
        workers: seedInitialData.workers,
        wages: seedInitialData.wages,
        advances: seedInitialData.advances,
        attendance: seedInitialData.attendance,
        transactions: seedInitialData.transactions
      });

      setProjName('القاضي لإدارة الأجور والعمال الميدانيين');
      setCurr('دولار');

      setBackupLog({
        text: '✓ تم إعادة تهيئة البيانات وسيد العينات الافتتاحية بنجاح بنمط المحاسب الذكي.',
        success: true
      });
    }
  };

  const handleWipeOut = () => {
    if (window.confirm('🚨 تحذير صارم: ستقوم الآن بحذف ومسح جميع بيانات العمال، كشوفات الدوام، والصندوق تماماً وتصفير الخزينة. لا يمكن التراجع عن هذا الإجراء! هل تريد المتابعة؟')) {
      clearDatabase();
      setProjName('');
      setCurr('دينار');
      setBackupLog({
        text: '⚠️ تم مسح جميع البيانات وتصفير الخزينة تماماً. البرنامج فارغ الآن لتعبئة بياناتك الحقيقية.',
        success: true
      });
    }
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-emerald-700" />
          <span>لوحة التحكم وإعدادات النظام المالي</span>
        </h1>
        <p className="text-[10px] text-gray-500 mt-0.5">تهيئة الهوية المعتمدة للمقاول والعملة المستخدمة وإجراءات النسخ الاحتياطي وحماية قاعدة البيانات</p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs p-4 rounded-2xl flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>✓ تم تحديث الإعدادات والهوية التشغيلة وحفظها بنجاح في متصفحك!</span>
        </div>
      )}

      {backupLog && (
        <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
          backupLog.success 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900' 
            : 'bg-red-500/10 border-red-500/30 text-red-900'
        }`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
            backupLog.success ? 'bg-emerald-600 text-white' : 'bg-red-650 text-white'
          }`}>
            {backupLog.success ? '✓' : '⚠️'}
          </div>
          <div className="flex-1 font-bold">
            <span>{backupLog.text}</span>
            <button 
              onClick={() => setBackupLog(null)}
              className="mt-2 text-[10px] underline block text-stone-900 cursor-pointer"
            >
              إغلاق الإشعار
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-emerald-700" />
              <span>تهيئة هوية وخصائص المشروع</span>
            </h2>
            <p className="text-[10px] text-gray-450 mt-0.5">تسمية الفواتير وعقود المقاولات المعتمدة لكشوفات الدفع</p>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">اسم المشروع أو جهة المقاولة العامة *</label>
              <input
                type="text"
                required
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                placeholder="مثال: القاضي للمقاولات العامة"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">عملة الحسابات والرواتب *</label>
              <select
                value={curr}
                onChange={(e) => setCurr(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 text-xs px-3 py-2.5 focus:outline-none"
              >
                <option value="دولار">دولار ($)</option>
                <option value="ريال">ريال سعودي (ر.س)</option>
                <option value="دينار">دينار عراقي (د.ع)</option>
                <option value="جنيه">جنيه مصري (ج.م)</option>
                <option value="درهم">درهم إماراتي (د.إ)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات العامة</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Database className="w-4.5 h-4.5 text-amber-600" />
                <span>مركز النسخ الاحتياطي وإصلاح القواعد (Backup Hub)</span>
              </h2>
              <p className="text-[10px] text-gray-400 mt-0.5">خذ لقطة كاملة لجميع الدفاتر والعمال حالياً بملف خارجي، أو استعد دفاترك السابقة بنقرة واحدة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-150 flex flex-col justify-between text-xs space-y-3">
                <div>
                  <span className="font-extrabold text-gray-950 block">تصدير قاعدة البيانات الحالية</span>
                  <span className="text-[10px] text-gray-500 block mt-1 leading-normal">
                    تحميل ملف يحمل امتداد .json مشفر بكافة حسابات كشوفات اليوميات، الحضور والغياب، والصندوق لحفظه على هاتفك أو حاسوبك الخارجي.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="w-full py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل النسخة الاحتياطية (.json)</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-150 flex flex-col justify-between text-xs space-y-3">
                <div>
                  <span className="font-extrabold text-gray-950 block">استعادة نسخة سابقة</span>
                  <span className="text-[10px] text-gray-500 block mt-1 leading-normal">
                    قم برفع وتغذية ملف النسخة المرجعية المحفوظ سابقاً لاستعادة حسابات العمال والصندوق وإحلالها محل البيانات الحالية.
                  </span>
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 bg-white border border-gray-200 hover:border-emerald-700 text-gray-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-50/20"
                  >
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>رفع واستعادة ملف (.json)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-150 space-y-3">
            <h3 className="text-xs font-black text-red-900 flex items-center gap-1">
              <AlertOctagon className="w-4.5 h-4.5 text-red-650" />
              <span>إجراءات مدراء الورشة المتقدمة (قيد الأمن):</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleReseed}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 font-bold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط المصنع بالبيانات التجريبية</span>
              </button>
              
              <button
                type="button"
                onClick={handleWipeOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer shadow-red-500/15 shadow-sm"
              >
                <span>تهيئة تامة (مسح الخزينة وتصفير الدفاتر)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
