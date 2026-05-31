/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { AuthPage } from './features/auth/pages/AuthPage';
import { Sidebar } from './shared/components/Sidebar';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { WorkersPage } from './features/workers/pages/WorkersPage';
import { WagesPage } from './features/wages/pages/WagesPage';
import { AdvancesPage } from './features/advances/pages/AdvancesPage';
import { AttendancePage } from './features/attendance/pages/AttendancePage';
import { CashBoxPage } from './features/cashbox/pages/CashBoxPage';
import { ReportsPage } from './features/reports/pages/ReportsPage';
import { SettingsPage } from './features/settings/pages/SettingsPage';
import { PermissionsPage } from './features/permissions/pages/PermissionsPage';
import { CompanySettingsPage } from './features/settings/pages/CompanySettingsPage';

const MainAppContent: React.FC = () => {
  const { currentUser, activeScreen } = useApp();

  // If user is not logged in / checked session, show the login wall
  if (!currentUser) {
    return <AuthPage />;
  }

  // Render the corresponding screen component based on sidebar menu selection
  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardPage />;
      case 'workers':
        return <WorkersPage />;
      case 'wages':
        return <WagesPage />;
      case 'advances':
        return <AdvancesPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'cashbox':
        return <CashBoxPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return (
          <div className="space-y-6">
            <CompanySettingsPage />
            <SettingsPage />
            <PermissionsPage />
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row text-right" dir="rtl">
      {/* Sidebar navigation section */}
      <Sidebar />

      {/* Main interactive panel canvas container */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6 transition-all duration-300">
        {renderActiveScreen()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
