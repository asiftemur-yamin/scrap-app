'use client';

import { useState, useEffect } from 'react';

// 👑 LIVE CONNECTED DATABASE KEYS (STAY ACTIVE ALWAYS)
const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

const translations: any = {
  en: {
    appName: "SCRAP WORLD",
    loginBtn: "Login / Register",
    logoutBtn: "Logout 👤",
    moreBtn: "More Options ☰",
    currentLang: "اردو"
  },
  ur: {
    appName: "اسکریپ ورلڈ",
    loginBtn: "لاگ ان / رجسٹر",
    logoutBtn: "لاگ آؤٹ 👤",
    moreBtn: "مزید اختیارات ☰",
    currentLang: "English"
  }
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en'); // 🎯 By default English set hai
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => { 
      setShowSplash(false); 
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f6fa]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', textAlign: lang === 'ur' ? 'right' : 'left' }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {/* 1️⃣ SPLASH SCREEN (Wohi aap ki pasandida screen) */}
      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            <div className="text-7xl animate-bounce">🏭♻️</div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Database Connection Engine</p>
          </div>
        </div>
      )}

      {/* 2️⃣ TOP MASTER BANNER (Sirf yahi nazar aayega screen par) */}
      <header className="bg-[#1a365d] text-white px-4 py-6 shadow-md rounded-b-3xl">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Left Side: Logo & App Name */}
          <div className="flex items-center gap-3">
            <div className="text-4xl bg-white/10 p-2 rounded-xl">🏭</div>
            <div>
              <h1 className="text-2xl font-black tracking-wider text-amber-400">{t.appName}</h1>
              <span className="text-[10px] text-emerald-400 font-bold block">● DATABASE LIVE NODE</span>
            </div>
          </div>

          {/* Right Side: Language, Login, and More Button */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} 
              className="bg-white/10 text-white font-black text-xs px-3 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              🌐 {t.currentLang}
            </button>

            {/* Login / Register Button */}
            <button 
              onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else setShowAuth(true); }} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              {isLoggedIn ? t.logoutBtn : t.loginBtn}
            </button>

            {/* ☰ More Button Control */}
            <button 
              onClick={() => alert("More menu options path configuration trigger.")} 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              {t.moreBtn}
            </button>

          </div>
        </div>
      </header>

      {/* 3️⃣ CLEAN EMPTY HOME SPACE (Agay aap jo bolenge sirf wahi banega) */}
      <main className="max-w-4xl mx-auto p-4 mt-12 text-center">
        <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-white text-slate-400 text-xs font-bold uppercase tracking-wider">
          Main Dashboard Hub Area (Aap ke aglay hukum ka muntazir) 🚀
        </div>
      </main>

      {/* Auth Modal Quick Bypasser */}
      {showAuth && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[300] flex flex-col justify-center p-4">
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl p-6 space-y-4 text-center">
            <h2 className="text-xl font-black text-[#1a365d]">User Account Login</h2>
            <button onClick={() => { setIsLoggedIn(true); setShowAuth(false); }} className="w-full bg-[#0066cc] text-white font-black text-sm py-3.5 rounded-xl shadow">Quick Bypass Login 🔑</button>
            <button onClick={() => setShowAuth(false)} className="w-full bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-xl">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}
