/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Banknote, 
  HandCoins, 
  Clock, 
  Calculator, 
  TrendingUp, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeScreen, setActiveScreen, currentUser, setCurrentUser } = useApp();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'workers', label: 'إدارة العمال', icon: Users },
    { id: 'wages', label: 'الأجور اليومية', icon: Banknote },
    { id: 'advances', label: 'السلف والسحوبات', icon: HandCoins },
    { id: 'attendance', label: 'الدوام والحضور', icon: Clock },
    { id: 'cashbox', label: 'حركة الصندوق', icon: Calculator },
    { id: 'reports', label: 'التقارير الشاملة', icon: TrendingUp },
    { id: 'settings', label: 'تهيئة الإعدادات', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const getRoleBadge = (role?: string) => {
    switch(role) {
      case 'admin': return 'مدير النظام';
      case 'accountant': return 'المحاسب المعتمد';
      case 'supervisor': return 'مراقب الموقع';
      default: return 'مستخدم عادي';
    }
  };

  return (
    <div className="font-sans text-right select-none" dir="rtl">
      {/* Mobile Header Bar */}
      <header className="md:hidden bg-[#0A2617] text-white p-4 flex justify-between items-center border-b border-[#ECC45C]/20 sticky top-0 z-40 shadow-md">
        <button 
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 -mr-2 text-gray-200 focus:outline-none hover:text-[#ECC45C]"
        >
          {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-bold text-base text-[#ECC45C]">القاضي لإدارة الأجور</span>
        <div className="w-8 h-8 rounded-full bg-emerald-990 border border-[#ECC45C] flex items-center justify-center text-[#ECC45C]">
          <UserIcon className="w-4 h-4" />
        </div>
      </header>

      {/* Desktop Drawer Sidebar & Mobile Nav overlay Drawer */}
      <div className={`
        fixed inset-y-0 right-0 transform ${isOpenMobile ? 'translate-x-0' : 'translate-x-full'} 
        md:translate-x-0 md:static md:flex md:flex-col flex-shrink-0 transition-transform duration-250 ease-in-out 
        w-64 bg-[#0A2617] text-white border-l-4 border-[#ECC45C] min-h-screen z-50 shadow-2xl md:shadow-none
      `}>
        {/* Header Branding */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3.5">
          <div className="w-10 h-10 bg-[#ECC45C] rounded-xl flex items-center justify-center border border-[#ECC45C] shadow-md">
            <span className="font-black text-[#0A2617] text-lg font-sans">⚖️</span>
          </div>
          <div>
            <div className="font-black text-lg tracking-wide text-white leading-none">القاضي</div>
            <span className="text-[9px] uppercase tracking-wider text-[#ECC45C] font-semibold block mt-1">لإدارة الأجور والعمال</span>
          </div>
        </div>

        {/* User Info Capsule */}
        {currentUser && (
          <div className="px-5 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#153f31] border border-[#ECC45C]/40 flex items-center justify-center flex-shrink-0 text-[#ECC45C] font-bold text-xs">
                {currentUser.fullName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUser.fullName}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#ECC45C]/15 text-[#ECC45C] border border-[#ECC45C]/20">
                  {getRoleBadge(currentUser.role)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Sidebar List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scroller-minimal">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const IsActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveScreen(item.id);
                  setIsOpenMobile(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition duration-150 cursor-pointer text-[13px] font-semibold select-none text-right
                  ${IsActive 
                    ? 'bg-[#ECC45C]/15 border-r-3 border-[#ECC45C] text-[#ECC45C] font-bold' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${IsActive ? 'text-[#ECC45C]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-300 text-xs font-bold transition duration-150 cursor-pointer text-right"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>تسجيل خروج</span>
          </button>
        </div>
      </div>

      {/* Mobile Dark Backdrop when Menu Open */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        ></div>
      )}
    </div>
  );
};
export default Sidebar;
