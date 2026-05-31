/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../../store/AppContext';
import { Shield, Lock, Mail, Phone, User as UserIcon, Coins } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthPage: React.FC = () => {
  const { signUp, logIn, isSimulatorMode } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'admin' | 'accountant' | 'supervisor' | 'user'>('admin');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const translateAuthError = (errCode: string): string => {
    switch (errCode) {
      case 'auth/invalid-email':
        return 'عنوان البريد الإلكتروني غير صالح أو مكتوب بصيغة خاطئة.';
      case 'auth/user-disabled':
        return 'لقد تم تعطيل حساب هذا المستخدم من قبل الإدارة.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'خطأ في البريد الإلكتروني أو كلمة المرور آمنة. يرجى مراجعة بيانات الاعتماد.';
      case 'auth/email-already-in-use':
        return 'عنوان البريد الإلكتروني هذا مسجل بالفعل لحساب آخر.';
      case 'auth/weak-password':
        return 'كلمة المرور ضعيفة جداً. يجب أن تتكون من 6 أحرف أو أرقام على الأقل.';
      case 'auth/network-request-failed':
        return 'فشل الاتصال بالإنترنت. يرجى التحقق من الشبكة والمحاولة مجدداً.';
      default:
        return 'حدث خطأ غير متوقع أثناء معالجة طلب تسجيل الدخول. يرجى المحاولة لاحقاً.';
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    try {
      if (isLogin) {
        if (!email || !password) {
          setError('يرجى كتابة البريد الإلكتروني وكلمة المرور.');
          setIsAuthenticating(false);
          return;
        }
        await logIn(email, password);
      } else {
        if (!fullName || !email || !password) {
          setError('يرجى ملء جميع الحقول الإلزامية مميزة بعلامة ( * ).');
          setIsAuthenticating(false);
          return;
        }
        if (password.length < 6) {
          setError('قواعد الأمان: يجب ألا تقل كلمة المرور الخاصة بك عن 6 أحرف.');
          setIsAuthenticating(false);
          return;
        }
        await signUp(email, password, fullName, phone, role);
      }
    } catch (err: any) {
      setError(translateAuthError(err?.code || ''));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setError('');
    setIsAuthenticating(true);
    setEmail(demoEmail);
    setPassword(demoPass);
    try {
      await logIn(demoEmail, demoPass);
    } catch (err: any) {
      setError(`تنبيه للتجريب الحقيقي: يرجى تسجيل حساب جديد أولاً إذا لم تكن قد أنشأت هذا المستخدم التجريبي في Firebase بعد.\n\n${translateAuthError(err?.code || '')}`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (showSplash) {
    return (
      <div id="splash_screen" className="fixed inset-0 bg-primary flex flex-col justify-between items-center text-white z-50 p-8 select-none overflow-hidden font-sans">
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-[#11382b]/40 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="my-auto flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.3)] border-2 border-accent relative"
          >
            <Coins className="w-12 h-12 text-primary stroke-[2.5]" />
            <div className="absolute -bottom-1 -right-1 bg-primary border border-accent p-1 rounded-lg">
              <Shield className="w-4 h-4 text-accent" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl font-extrabold mt-6 tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-accent/80 to-accent"
          >
            القاضي لإدارة الأجور والعمال
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-accent/85 font-mono text-xs tracking-widest mt-3 uppercase text-center"
          >
            AL-QADY LABOR & WAGE AUDITOR PRO
          </motion.p>

          <div className="mt-12 flex items-center gap-2 bg-[#12362a] px-4 py-2 rounded-full border border-accent/20 backdrop-blur">
            <div className={`w-2 h-2 rounded-full animate-ping ${isSimulatorMode ? 'bg-amber-400' : 'bg-accent'}`}></div>
            <span className="text-accent text-xs font-mono font-medium">
              {isSimulatorMode ? 'تفعيل بيئة المحاكاة المحلية الذكية...' : 'جاري المزامنة مع خادم Firebase الآمن...'}
            </span>
          </div>
        </div>

        <motion.div 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center font-sans text-xs text-accent/80 border-t border-accent/10 w-full max-w-xs pt-4"
        >
          {isSimulatorMode 
            ? 'بيئة تجريبية محلية فائقة الدقة لحفظ السجلات وتجربة الميزات أوفلاين'
            : 'مزامنة سحابية ونظام حماية معتمد لتنظيم الحسابات والعهد الميدانية'}
          <div className="mt-1 text-[10px] text-accent font-mono">
            {isSimulatorMode ? 'الإصدار التجريبي المحلي الآمن 2026 م' : 'الإصدار المدعوم • سحابي بالكامل 2026 م'}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="auth_container" className="min-h-screen bg-primary/95 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden text-right" dir="rtl">
      <div className="absolute pointer-events-none w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] -top-40 -left-40"></div>
      <div className="absolute pointer-events-none w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] -bottom-40 -right-40"></div>

      <div className="w-full max-w-md bg-[#0e2c22]/95 border border-accent/20 text-white rounded-2xl shadow-[0_15px_50px_-15px_rgba(2,44,19,0.7)] p-6 sm:p-8 backdrop-blur relative">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg border border-accent/30 mb-4">
            <Coins className="w-8 h-8 text-primary stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">القاضي لإدارة الأجور والعمال</h2>
          <p className="text-accent text-xs mt-1">تداول الحسابات الآمن بمزامنة Firebase السحابية</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3 rounded-xl mb-4 text-center leading-relaxed whitespace-pre-line">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-accent mb-1">الاسم الكامل للمستخدم *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <UserIcon className="h-4 w-4 text-accent/60" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: محمد علي هادي"
                    className="w-full rounded-xl bg-primary/40 border border-[#163c30] pr-10 pl-3 py-2.5 text-xs text-white placeholder-emerald-600 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent mb-1">رقم الهاتف الجوال</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Phone className="h-4 w-4 text-accent/60" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 0599000000"
                    className="w-full rounded-xl bg-primary/40 border border-[#163c30] pr-10 pl-3 py-2.5 text-xs text-white placeholder-emerald-600 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent mb-1">الدور الوظيفي / الصلاحية *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      role === 'admin'
                        ? 'bg-accent border-accent text-primary font-bold'
                        : 'bg-primary/20 border-[#163c30] text-accent hover:bg-white/5'
                    }`}
                  >
                    مدير مالي (كامل)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('accountant')}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      role === 'accountant'
                        ? 'bg-accent border-accent text-primary font-bold'
                        : 'bg-primary/20 border-[#163c30] text-accent hover:bg-white/5'
                    }`}
                  >
                    محاسب الموقع
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('supervisor')}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      role === 'supervisor'
                        ? 'bg-accent border-accent text-primary font-bold'
                        : 'bg-primary/20 border-[#163c30] text-accent hover:bg-white/5'
                    }`}
                  >
                    مراقب عام (حضور)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      role === 'user'
                        ? 'bg-accent border-accent text-primary font-bold'
                        : 'bg-primary/20 border-[#163c30] text-accent hover:bg-white/5'
                    }`}
                  >
                    زائر عادي (مشاهدة)
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-accent mb-1">البريد الإلكتروني *</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Mail className="h-4 w-4 text-accent/60" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="مثال: admin@alqady.com"
                className="w-full rounded-xl bg-primary/40 border border-[#163c30] pr-10 pl-3 py-2.5 text-xs text-white placeholder-emerald-600 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-accent mb-1">كلمة المرور الآمنة *</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Lock className="h-4 w-4 text-accent/60" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-primary/40 border border-[#163c30] pr-10 pl-3 py-2.5 text-xs text-white placeholder-emerald-600 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className={`w-full mt-2 bg-accent text-primary py-3 rounded-xl text-xs font-bold transition duration-150 shadow-md select-none ${
              isAuthenticating ? 'opacity-50 cursor-not-allowed animate-pulse' : 'hover:opacity-95 cursor-pointer'
            }`}
          >
            {isAuthenticating ? 'جاري معالجة الطلب الآمن...' : isLogin ? 'تسجيل دخول للنظام سحابياً' : 'إنشاء حساب جديد بالخادم'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-accent/10 flex justify-between items-center text-xs">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent hover:underline font-medium cursor-pointer"
          >
            {isLogin ? 'ليس لديك حساب؟ سجل الآن' : 'تمتلك حساباً بالفعل؟ سجل الدخول'}
          </button>
          {isSimulatorMode ? (
            <span className="text-amber-400 font-bold flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>المحاكاة المحلية نشطة</span>
            </span>
          ) : (
            <span className="text-emerald-500 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>خادم سحابي متصل</span>
            </span>
          )}
        </div>

        {isLogin && (
          <div className="mt-6 pt-4 border-t border-accent/10">
            <p className="text-center text-[10px] text-accent/70 mb-2">الدخول للمبرمجين بنمط تفعيل فوري:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin('admin@alqady.com', '123456')}
                className="py-1.5 px-2 text-[10px] border border-accent/20 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg cursor-pointer text-center truncate font-bold"
              >
                دخول سريع - المدير العام (admin@alqady.com)
              </button>
              <button
                onClick={() => handleDemoLogin('accountant@alqady.com', '123456')}
                className="py-1.5 px-2 text-[10px] border border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent rounded-lg cursor-pointer text-center truncate"
              >
                دوران المحاسب (accountant@alqady.com)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AuthPage;
