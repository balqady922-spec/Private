import { getLocalDateString } from '../../../core/utils';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { Worker } from '../../../core/types';
import { 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Archive, 
  Phone, 
  Briefcase, 
  X
} from 'lucide-react';

export const WorkersPage: React.FC = () => {
  const { workers, addWorker, updateWorker, deleteWorker, archiveWorker, settings, setActiveScreen, setSelectedWorkerId } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [professionFilter, setProfessionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('active'); // active, archived, all

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [dailyWage, setDailyWage] = useState(120);
  const [startDate, setStartDate] = useState(getLocalDateString());
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const professionsList = ['All', ...Array.from(new Set(workers.map(w => w.profession)))];

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.fullName.includes(searchTerm) || w.phone.includes(searchTerm) || w.profession.includes(searchTerm);
    const matchesProfession = professionFilter === 'All' || w.profession === professionFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'active') matchesStatus = !w.isArchived;
    if (statusFilter === 'archived') matchesStatus = w.isArchived;
    
    return matchesSearch && matchesProfession && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFullName('');
    setPhone('');
    setProfession('');
    setDailyWage(120);
    setStartDate(getLocalDateString());
    setNotes('');
    setPhotoUrl('');
    setEditingWorker(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (w: Worker) => {
    setEditingWorker(w);
    setFullName(w.fullName);
    setPhone(w.phone);
    setProfession(w.profession);
    setDailyWage(w.dailyWage);
    setStartDate(w.startDate);
    setNotes(w.notes || '');
    setPhotoUrl(w.photoUrl || '');
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !profession || !dailyWage) return;

    if (editingWorker) {
      updateWorker(editingWorker.id, {
        fullName,
        phone,
        profession,
        dailyWage: Number(dailyWage),
        startDate,
        notes,
        photoUrl: photoUrl || undefined
      });
    } else {
      addWorker({
        fullName,
        phone,
        profession,
        dailyWage: Number(dailyWage),
        startDate,
        notes: notes || undefined,
        photoUrl: photoUrl || undefined,
        isArchived: false,
      });
    }
    setShowAddModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت واثق تماماً من حذف سجل العامل (${name}) بالكامل؟ سيؤدي ذلك أيضاً لحذف حركاته وسجل حضوره بشكل دائم من هذا الجهاز.`)) {
      deleteWorker(id);
    }
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>إدارة شؤون العمال والمقاولين</span>
          </h1>
          <p className="text-[10px] text-gray-500 mt-0.5">تسجيل العمال وتحديد مهنهم، أجورهم، وحالة أرشيفهم بالمشروع</p>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-emerald-700 text-white hover:bg-emerald-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عامل جديد</span>
        </button>
      </div>

      <div className="space-y-4 bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-xs">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم العامل، تليفونه..."
              className="w-full rounded-xl bg-gray-50 border border-gray-200 pr-10 pl-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 focus:bg-white transition animate-none"
            />
          </div>

          <div className="w-full md:w-48">
            <select
              value={professionFilter}
              onChange={(e) => setProfessionFilter(e.target.value)}
              className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 focus:bg-white transition"
            >
              <option value="All">كل المهن</option>
              {professionsList.filter((p) => p !== 'All').map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="flex w-full md:w-auto bg-gray-50 px-1.5 py-1.5 rounded-xl border border-gray-200 shrink-0">
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 sm:px-4 py-1 text-xs font-bold rounded-lg transition ${
                statusFilter === 'active' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
              }`}
            >
              النشطين الحاليين
            </button>
            <button
              onClick={() => setStatusFilter('archived')}
              className={`px-3 sm:px-4 py-1 text-xs font-bold rounded-lg transition ${
                statusFilter === 'archived' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
              }`}
            >
              المؤرشفين
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 sm:px-4 py-1 text-xs font-bold rounded-lg transition ${
                statusFilter === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-emerald-700'
              }`}
            >
              الكل
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1.5 pt-1 scroller-minimal">
          {professionsList.map((prof, idx) => (
            <button
              key={idx}
              onClick={() => setProfessionFilter(prof)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                professionFilter === prof 
                  ? 'bg-amber-100/50 border-amber-400 text-amber-800' 
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {prof === 'All' ? 'جميع المهن والمهارات' : prof}
            </button>
          ))}
        </div>
      </div>

      {filteredWorkers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 text-gray-500 text-xs">
          🚫 لم نجد أي عامل يطابق الفلترة المحددة. سجل عاملاً جديداً للبدء.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((w) => {
            const isSafe = w.currentBalance >= 0;
            return (
              <div 
                key={w.id} 
                className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden relative flex flex-col justify-between"
              >
                {w.isArchived && (
                  <div className="absolute top-2 left-2 bg-gray-500/10 border border-gray-400/30 text-gray-600 text-[8px] font-bold px-2 py-0.5 rounded-full z-10">
                    مؤرشف مؤقتاً
                  </div>
                )}

                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800 border-2 border-emerald-200/50 flex items-center justify-center flex-shrink-0 text-base font-black">
                      {w.fullName.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-extrabold text-sm text-gray-900 truncate">{w.fullName}</h3>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium mt-1">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{w.profession}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-3 text-xs border-t border-gray-100">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 block font-semibold">الأجرة اليومية المقررة</span>
                      <span className="font-bold text-gray-900 block font-mono">
                        {w.dailyWage} <span className="text-[10px] font-sans text-gray-500">{settings.currency}/يوم</span>
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 block font-semibold">بداية العمل بالورشة</span>
                      <span className="font-mono text-gray-600 block text-[11px]">{w.startDate}</span>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-2xl flex justify-between items-center text-xs font-bold leading-none ${
                    isSafe ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50' : 'bg-red-50 text-red-800 border border-red-100/50'
                  }`}>
                    <span className="text-[10px] font-semibold text-gray-500">الحالة المحاسبية:</span>
                    <span className="font-mono font-black">
                      {w.currentBalance > 0 ? '+' : ''}{w.currentBalance} {settings.currency}
                      <span className="text-[9px] font-sans font-medium mr-1.5">
                        ({isSafe ? 'مستحق له' : 'مدين عليه'})
                      </span>
                    </span>
                  </div>

                  {w.notes && (
                    <p className="text-[10px] text-gray-400 leading-relaxed bg-gray-50 p-2 rounded-xl truncate">
                      {w.notes}
                    </p>
                  )}
                </div>

                <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(w)}
                      className="p-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs"
                      title="تعديل تفاصيل العامل"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => archiveWorker(w.id)}
                      className="p-2 bg-white hover:bg-amber-50 text-amber-700 rounded-lg border border-gray-200 hover:border-amber-300 transition-all cursor-pointer shadow-2xs"
                      title={w.isArchived ? 'تنشيط العامل' : 'أرشفة مؤقتة'}
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(w.id, w.fullName)}
                      className="p-2 bg-white hover:bg-red-50 text-red-600 rounded-lg border border-gray-200 hover:border-red-300 transition-all cursor-pointer shadow-2xs"
                      title="حذف السجل بالكامل"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex gap-1.5">
                    {w.phone && (
                      <a
                        href={`tel:${w.phone}`}
                        className="p-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-all shadow-xs"
                        title="اتصال هاتفي مباشر"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setSelectedWorkerId(w.id);
                        setActiveScreen('reports');
                      }}
                      className="px-3 py-1.5 bg-emerald-150 hover:bg-emerald-200 text-emerald-800 border border-emerald-300/40 rounded-xl text-[10px] font-extrabold cursor-pointer transition-all"
                    >
                      كشف الحركات
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative text-right" dir="rtl">
            <div className="bg-emerald-950 p-4 text-white flex justify-between items-center border-b border-emerald-900">
              <h2 className="text-sm font-bold text-amber-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{editingWorker ? 'تعديل سجل عامل قائم' : 'إضافة وتصنيف عامل جديد'}</span>
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full bg-emerald-900 hover:bg-emerald-800 text-emerald-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">الاسم الكامل للعامل *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: صالح عمر الجابري"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">رقم الهاتف الجوال</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 0599000000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">صنعة العامل / الحرفة *</label>
                  <input
                    type="text"
                    required
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="مثال: نجار مسلح، كهربائي، مساعد"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">الأجرة اليومية بالعملة الافتراضية *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={dailyWage}
                    onChange={(e) => setDailyWage(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">تاريخ مباشرة العمل لديه *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">رابط الصورة الشخصية (اختياري)</label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">ملاحظات وملحوظات إدارية</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="سجل أي تفاصيل إضافية مثل رقم الهوية الوطنية، شروط معينة في الراتب وهكذا..."
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-xs px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs font-bold cursor-pointer"
                >
                  إلغاء الأمر
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white hover:bg-emerald-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {editingWorker ? 'حفظ التعديلات' : 'تسجيل العامل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default WorkersPage;
