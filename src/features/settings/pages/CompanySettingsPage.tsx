import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { Building2, MapPin, Phone, Briefcase, FileImage, ShieldCheck, CheckCircle } from 'lucide-react';

export const CompanySettingsPage: React.FC = () => {
  const { companySettings, updateCompanySettings } = useApp();
  const [formData, setFormData] = useState(companySettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // دالة تحويل ملف الصورة المرفوع إلى نص Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'companyLogo' | 'managerSignature' | 'companyStamp') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto" dir="rtl">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <Building2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">إعدادات الهوية والمستندات للوكالة</h2>
      </div>

      {savedSuccess && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-200 animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>تم حفظ الإعدادات بنجاح، وتحديث قوالب الـ PDF ونماذج الـ AI!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اسم الشركة */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">اسم الشركة / الوكالة</label>
            <div className="relative">
              <Building2 className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right"
                placeholder="مثال: وكالة القاضي للخدمات" required
              />
            </div>
          </div>

          {/* أرقام الهاتف */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">أرقام التواصل والهاتف</label>
            <div className="relative">
              <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={formData.phoneNumbers}
                onChange={e => setFormData({ ...formData, phoneNumbers: e.target.value })}
                className="w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="مثال: 777xxxxxx , 04xxxxxx" required
              />
            </div>
          </div>

          {/* عنوان الشركة */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">العنوان الجغرافي الرئيسي</label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={formData.companyAddress}
                onChange={e => setFormData({ ...formData, companyAddress: e.target.value })}
                className="w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right"
                placeholder="المدينة - الشارع - جوار معلم رئيسي" required
              />
            </div>
          </div>

          {/* الخدمات والمنتجات */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">الخدمات أو المنتجات التي توفرها الشركة</label>
            <div className="relative">
              <Briefcase className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <textarea 
                rows={3}
                value={formData.servicesOrProducts}
                onChange={e => setFormData({ ...formData, servicesOrProducts: e.target.value })}
                className="w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right"
                placeholder="قم بوصف طبيعة عملك ليقوم الذكاء الاصطناعي بفهمها وعرضها بالكشوفات..."
              />
            </div>
          </div>
        </div>

        {/* أقسام المرفقات الجرافيكية (الشعار، الختم، التوقيع) */}
        <div className="border-t pt-6">
          <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            الأختام، الشعارات والتوقيعات الرسمية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* الشعار */}
            <div className="p-4 border border-dashed rounded-xl flex flex-col items-center justify-center bg-gray-50">
              <span className="text-xs font-bold text-gray-600 mb-2">شعار الشركة (Logo)</span>
              {formData.companyLogo && <img src={formData.companyLogo} className="h-16 object-contain mb-2 rounded shadow-sm" />}
              <label className="cursor-pointer bg-white border px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm text-blue-600 hover:bg-blue-50 flex items-center gap-1">
                <FileImage className="w-3.5 h-3.5" /> رفع الشعار
                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'companyLogo')} className="hidden" />
              </label>
            </div>

            {/* ختم المدير */}
            <div className="p-4 border border-dashed rounded-xl flex flex-col items-center justify-center bg-gray-50">
              <span className="text-xs font-bold text-gray-600 mb-2">ختم الشركة الرسمي (Stamp)</span>
              {formData.companyStamp && <img src={formData.companyStamp} className="h-16 object-contain mb-2 rounded shadow-sm" />}
              <label className="cursor-pointer bg-white border px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm text-blue-600 hover:bg-blue-50 flex items-center gap-1">
                <FileImage className="w-3.5 h-3.5" /> رفع الختم
                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'companyStamp')} className="hidden" />
              </label>
            </div>

            {/* توقيع المدير */}
            <div className="p-4 border border-dashed rounded-xl flex flex-col items-center justify-center bg-gray-50">
              <span className="text-xs font-bold text-gray-600 mb-2">توقيع المدير العام (Signature)</span>
              {formData.managerSignature && <img src={formData.managerSignature} className="h-16 object-contain mb-2 rounded shadow-sm" />}
              <label className="cursor-pointer bg-white border px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm text-blue-600 hover:bg-blue-50 flex items-center gap-1">
                <FileImage className="w-3.5 h-3.5" /> رفع التوقيع
                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'managerSignature')} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all duration-150"
          >
            حفظ كافة التغييرات وحفظ الهوية
          </button>
        </div>
      </form>
    </div>
  );
};
