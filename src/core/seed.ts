/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Worker, WageRecord, AdvanceRecord, AttendanceRecord, CashTransaction, User } from './types';

export const seedUsers: User[] = [
  {
    uid: 'mgr_01',
    fullName: 'خالد القاضي',
    email: 'admin@alqady.com',
    role: 'admin',
    phone: '0599123456',
    createdAt: '2026-01-01T08:00:00Z'
  },
  {
    uid: 'acc_01',
    fullName: 'محمد أحمد العبيدي',
    email: 'accountant@alqady.com',
    role: 'accountant',
    phone: '0599654321',
    createdAt: '2026-02-15T09:00:00Z'
  },
  {
    uid: 'sup_01',
    fullName: 'أبو فهد المشرف',
    email: 'supervisor@alqady.com',
    role: 'supervisor',
    phone: '0599789123',
    createdAt: '2026-03-01T10:00:00Z'
  }
];

export const seedWorkers: Worker[] = [
  {
    id: 'wrk_01',
    fullName: 'أحمد يوسف الحريري',
    phone: '0599111222',
    profession: 'بناء وحجر',
    dailyWage: 150,
    startDate: '2026-05-01',
    isArchived: false,
    photoUrl: undefined,
    notes: 'عامل نشيط وخبرة ممتازة في البناء التقليدي والتشطيبات.',
    currentBalance: 750,
    createdAt: '2026-05-01T07:30:00Z'
  },
  {
    id: 'wrk_02',
    fullName: 'علي محمود الجابري',
    phone: '0599222333',
    profession: 'فني كهرباء تمديدات',
    dailyWage: 180,
    startDate: '2026-05-03',
    isArchived: false,
    photoUrl: undefined,
    notes: 'ملتزم جداً بمواعيد العمل وإجراءات السلامة المهنية.',
    currentBalance: 520,
    createdAt: '2026-05-03T07:30:00Z'
  },
  {
    id: 'wrk_03',
    fullName: 'محمود عبدالكريم الكيالي',
    phone: '0599333444',
    profession: 'سائق رافعة وشاحنة',
    dailyWage: 200,
    startDate: '2026-05-05',
    isArchived: false,
    photoUrl: undefined,
    notes: 'رخصة قيادة فئة ثقيلة، عامل محترف.',
    currentBalance: 1100,
    createdAt: '2026-05-05T07:30:00Z'
  },
  {
    id: 'wrk_04',
    fullName: 'سعيد ناصر السعدي',
    phone: '0599444555',
    profession: 'نجار مسلح وقوالب',
    dailyWage: 160,
    startDate: '2026-05-01',
    isArchived: false,
    photoUrl: undefined,
    notes: 'متخصص في قوالب الإعمار الخرسانية والأسقف والمخططات الهندسية.',
    currentBalance: 320,
    createdAt: '2026-05-01T07:30:00Z'
  },
  {
    id: 'wrk_05',
    fullName: 'عثمان بكر عبدالحق',
    phone: '0599555666',
    profession: 'عامل حركة ومساعد',
    dailyWage: 100,
    startDate: '2026-05-08',
    isArchived: false,
    photoUrl: undefined,
    notes: 'مساعد عام، نشيط في تزويد البنائين بالمواد وتنظيف الموقع.',
    currentBalance: 400,
    createdAt: '2026-05-08T07:30:00Z'
  }
];

export const seedWages: WageRecord[] = [
  {
    id: 'wg_01',
    workerId: 'wrk_01',
    workerName: 'أحمد يوسف الحريري',
    date: '2026-05-20',
    daysWorked: 5,
    rate: 150,
    totalEarned: 750,
    notes: 'أجرة الأسبوع الثالث من شهر مايو - 5 أيام عمل كاملة',
    registeredBy: 'أبو فهد المشرف',
    createdAt: '2026-05-20T17:00:00Z'
  },
  {
    id: 'wg_02',
    workerId: 'wrk_01',
    workerName: 'أحمد يوسف الحريري',
    date: '2026-05-27',
    daysWorked: 4,
    rate: 150,
    totalEarned: 600,
    notes: 'أجرة الأسبوع الرابع من مايو - 4 أيام عمل ويوم غياب معتمد',
    registeredBy: 'محمد أحمد العبيدي',
    createdAt: '2026-05-27T17:00:00Z'
  },
  {
    id: 'wg_03',
    workerId: 'wrk_02',
    workerName: 'علي محمود الجابري',
    date: '2026-05-20',
    daysWorked: 5,
    rate: 180,
    totalEarned: 900,
    notes: 'تمديد أسلاك الطابق الثاني - 5 أيام',
    registeredBy: 'أبو فهد المشرف',
    createdAt: '2026-05-20T17:00:00Z'
  }
];

export const seedAdvances: AdvanceRecord[] = [
  {
    id: 'adv_01',
    workerId: 'wrk_01',
    workerName: 'أحمد يوسف الحريري',
    date: '2026-05-18',
    amount: 300,
    type: 'advance',
    notes: 'سلفة لشراء أغراض عائلية عاجلة',
    registeredBy: 'محمد أحمد العبيدي',
    createdAt: '2026-05-18T10:00:00Z'
  },
  {
    id: 'adv_02',
    workerId: 'wrk_01',
    workerName: 'أحمد يوسف الحريري',
    date: '2026-05-25',
    amount: 300,
    type: 'withdrawal',
    notes: 'سحب نقدي من الحساب لتسديد رسوم شخصية',
    registeredBy: 'محمد أحمد العبيدي',
    createdAt: '2026-05-25T11:30:00Z'
  }
];

export const seedAttendance: AttendanceRecord[] = [
  { id: 'att_01', workerId: 'wrk_01', workerName: 'أحمد يوسف الحريري', date: '2026-05-31', status: 'present', recordedBy: 'أبو فهد المشرف' },
  { id: 'att_02', workerId: 'wrk_02', workerName: 'علي محمود الجابري', date: '2026-05-31', status: 'present', recordedBy: 'أبو فهد المشرف' },
  { id: 'att_03', workerId: 'wrk_03', workerName: 'محمود عبدالكريم الكيالي', date: '2026-05-31', status: 'present', recordedBy: 'أبو فهد المشرف' }
];

export const seedTransactions: CashTransaction[] = [
  {
    id: 'tx_01',
    type: 'receipt',
    category: 'رأس مال',
    amount: 50000,
    title: 'تغذية صندوق المشروع - تم الإيداع نقداً من المالك',
    date: '2026-05-01',
    recordedBy: 'خالد القاضي'
  },
  {
    id: 'tx_02',
    type: 'receipt',
    category: 'دفعة عميل',
    amount: 15000,
    title: 'دفعة نقدية مستلمة من العميل لتشطيب الطابق الأول',
    date: '2026-05-10',
    recordedBy: 'محمد أحمد العبيدي'
  }
];

export const seedInitialData = {
  workers: seedWorkers,
  wages: seedWages,
  advances: seedAdvances,
  attendance: seedAttendance,
  transactions: seedTransactions
};
