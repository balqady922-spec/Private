/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { Shield, Key, Check, AlertTriangle } from 'lucide-react';

export const PermissionsPage: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [selectedRoleForDetails, setSelectedRoleForDetails] = useState<'admin' | 'accountant' | 'supervisor' | 'user'>('admin');

  const roleDefinitions = {
    admin: {
      title: 'مدير النظام المالي (كامل الصلاحيات)',
      desc: 'بصفة مدير النظام، تملك صلاحيات مطلقة لإدارة العمال والأجور بالكامل، تعديل الصندوق، حذف القيود المالية، ومسح قاعدة البيانات تماماً.',
      privileges: ['إضافة وتعديل وحذف العمال', 'رصد أجور جماعية وفردية عريضة', 'صرف السلف وتسجيل السحوبات والخصم', 'التحكم بالصندوق وسندات القبض والدفع الشاملة', 'النسخ الاحتياطي والاستعادة واسترجاع المصنع']
    },
    accountant: {
      title: 'محاسب الموقع المالي (محاسبة وصندوق)',
      desc: 'بصفة محاسب المشروع المعتمد، تتركز صلاحياتك في حركة المحاسبة والصندوق والمقبوضات، صرف السندات المورّدة، دون الوصول المباشر لتهيئة الإعدادات الشاملة.',
      privileges: ['إضافة وتعديل بيانات العمال اللوجستية', 'ترحيل الأجور اليومية للفئات والورش', 'إصدار سندات صرف السلف والسحوبات نقدية', 'إصدار سندات القبض التشغيلية وتعديل الدفاتر', 'طباعة الفواتير وتصدير كشوفات الحسابات']
    },
    supervisor: {
      title: 'مراقب عام الحقل (حضور ودوام)',
      desc: 'بصفة مراقب ميدان الورشة، يمكنك مراقبة دورتي الحضور والدوام وتسجيل الساعات الإضافية والدقائق المتأخرة، وإرسال الكشوفات للمحاسب دون حق التدخل النقدي.',
      privileges: ['استدعاء كشوفات أسماء العمال والاتصال المباشر', 'تسجيل حضور وغياب وتأخر العمال وإرسال الغيابات', 'تسجيل الساعات الإضافية لجدولة الحوافز', 'رؤية التقارير العامة المرخصة دون حركة الصندوق المركزي']
    },
    user: {
      title: 'زائر / مستخدم عادي (مشاهدة فقط)',
      desc: 'صلاحيات قراءة فقط غير مخصصة لأي معاملة تعديل في النظام، مخصصة للمراجعين أو المدققين الخارجيين لرؤية الحالة.',
      privileges: ['استعراض لوحة التحليلات والرسوم البيانية التوضيحية', 'رؤية جدول العمال النشطين دون تعديل', 'قراءة التقارير وسجلات الحضور والغياب المرفوعة']
    }
  };

  const handleToggleSupervisorEdit = () => {
    updateSettings({ allowSupervisorWagesEdit: !settings.allowSupervisorWagesEdit });
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <h1 className="text-xl font-bold text-gray-950 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-700" />
          <span>إدارة صلاحيات مستخدمي النظام</span>
        </h1>
        <p className="text-[10px] text-gray-500 mt-0.5">تهيئة أدوار وصلاحيات المشرفين والمحاسبين الميدانيين وفرض ضوابط الأمان المالي</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 h-fit space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Key className="w-4.5 h-4.5 text-emerald-700" />
              <span>أدوار الطاقم الإداري</span>
            </h2>
            <p className="text-[10px] text-gray-455 mt-0.5">اختر الفئة للاطلاع التفصيلي على رخص الأمان والعمل المالي لها</p>
          </div>

          <div className="space-y-1.5">
            {(Object.keys(roleDefinitions) as Array<keyof typeof roleDefinitions>).map((roleKey) => {
              const isActive = selectedRoleForDetails === roleKey;
              return (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRoleForDetails(roleKey)}
                  className={`w-full text-right p-3 rounded-2xl border text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-800 border-emerald-900 text-white shadow-md' 
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-amber-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{roleDefinitions[roleKey].title.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-150 space-y-3">
            <h3 className="text-xs font-bold text-gray-800">إجراءات الأمان المالي السريعة:</h3>
            
            <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <div>
                <span className="font-bold text-gray-900 block">منح المراقب حق الأجور اليومية</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">الحظر يمنع المشرف من تعديل مبالغ اليوميات</span>
              </div>
              <input
                type="checkbox"
                checked={settings.allowSupervisorWagesEdit}
                onChange={handleToggleSupervisorEdit}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
          <div className="space-y-2">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-300/30">تصنيف أمني معتمد</span>
            <h2 className="text-base font-black text-gray-900 mt-2">{roleDefinitions[selectedRoleForDetails].title}</h2>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {roleDefinitions[selectedRoleForDetails].desc}
            </p>
          </div>

          <div className="space-y-3.5 border-t border-gray-150 pt-5">
            <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>قائمة الرخص والإجراءات المفعلة له:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3">
              {roleDefinitions[selectedRoleForDetails].privileges.map((priv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-950 font-bold">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] flex-shrink-0">✓</div>
                  <span>{priv}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 text-amber-900 rounded-2xl flex gap-2 text-xs leading-relaxed">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>تنويه أمان:</strong> تفعيل نظام الصلاحيات الحالي يتم إثباته محلياً لضبط دقة الإدخال في الورشة والموقع. لتفعيل حماية حقل Firestore ومنع ثغرات القراءة والكتابة والعبث المزدوج، يرجى الاستعانة بقواعد الحماية الخاصة بـ Firebase Security Rules المرفقة في دليل Fortress.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PermissionsPage;
