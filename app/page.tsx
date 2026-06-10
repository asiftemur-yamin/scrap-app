'use client';

import { useState, useEffect, useRef } from 'react';

// 👑 LIVE CONNECTED DATABASE KEYS (STAY ACTIVE ALWAYS)
const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

// 📦 10 REAL PRODUCTION ADS DATA
const initial10Ads = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", categoryEn: "Iron", categoryUr: "لوہا", price: "125", unitEn: "kg", unitUr: "کلو", weight: "12 Ton", location: "Khiali Gate, Gujranwala", icon: "🔩" },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", categoryEn: "Copper", categoryUr: "تانبا", price: "1,870", unitEn: "kg", unitUr: "کلو", weight: "450 Kg", location: "Sialkoti Gate, Gujranwala", icon: "🔌" },
  { id: 3, titleEn: "Chaaloo Industrial Air Compressor 200L", titleUr: "چالو انڈسٹریل ائیر کمپریسر 200L", categoryEn: "Chaaloo Maal", categoryUr: "چالو مال", price: "45,000", unitEn: "piece", unitUr: "عدد", weight: "1 Unit", location: "Gondlanwala Road, Gujranwala", icon: "💨" },
  { id: 4, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", categoryEn: "Aluminum", categoryUr: "ایلومینیم", price: "465", unitEn: "kg", unitUr: "کلو", weight: "35 Mund", location: "Badami Bagh, Lahore", icon: "🥫" },
  { id: 5, titleEn: "Mixed Crushed Plastic Drums Flakes HDPE", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", categoryEn: "Plastic", categoryUr: "پلاسٹک", price: "98", unitEn: "kg", unitUr: "کلو", weight: "3 Ton", location: "Sheikhupura Road, Gujranwala", icon: "🛢️" },
  { id: 6, titleEn: "Silicon Solar Panels Scrap Lot 250W", titleUr: "سولر پینل اسکریپ لاٹ 250W", categoryEn: "Solar Panels", categoryUr: "سولر پینل", price: "4,500", unit: "piece", weight: "85 Pieces", location: "Shahdara, Lahore", icon: "☀️" },
  { id: 7, titleEn: "Lead Acid UPS Batteries Scrap Lot", titleUr: "لیڈ ایسڈ یو پی ایس بیٹریاں اسکریپ", categoryEn: "Batteries", categoryUr: "بیٹریاں", price: "320", unitEn: "kg", unitUr: "کلو", weight: "220 Kg", location: "Ferozepur Road, Lahore", icon: "🔋" },
  { id: 8, titleEn: "Chaaloo Electric Motor 5HP Copper Winding", titleUr: "چالو الیکٹرک موٹر 5HP (تانبا وائنڈنگ)", category: "Chaaloo Maal", categoryUr: "چالو مال", price: "16,500", unitEn: "piece", unitUr: "عدد", weight: "2 Units", location: "Small Industrial Estate, Gujranwala", icon: "⚙️" },
  { id: 9, titleEn: "Industrial PVC Pipe Regrind Regulated Stock", titleUr: "انڈسٹریل پی وی سی پائپ ریگرائنڈ مال", categoryEn: "Plastic", categoryUr: "پلاسٹک", price: "115", unitEn: "kg", unitUr: "کلو", weight: "5 Ton", location: "G.T Road, Gujranwala", icon: "🧪" },
  { id: 10, titleEn: "Electronic Server Green Motherboards Grade B", titleUr: "الیکٹرانک سرور مدر بورڈز اسکریپ", categoryEn: "Electronic", categoryUr: "الیکٹرانک", price: "850", unitEn: "piece", unitUr: "عدد", weight: "120 Pieces", location: "Saddar, Karachi", icon: "💻" }
];

const translations: any = {
  en: {
    appName: "SCRAP WORLD", loginBtn: "Login", logoutBtn: "Logout 👤", moreBtn: "More Options", currentLang: "Urdu",
    priceLabel: "Price:", weightLabel: "Qty/Weight:", locLabel: "Location:", catLabel: "Category:",
    postAdBtn: "Post Ad 📢", ratesBtn: "Rates 💰", sortSimple: "Sort 📊", filterSimple: "Filters 🎛️", industriesBtn: "Industries 🏭",
    backBtn: "← Back to Feed"
  },
  ur: {
    appName: "اسکریپ ورلڈ", loginBtn: "لاگ ان", logoutBtn: "لاگ آؤٹ 👤", moreBtn: "مزید آپشنز", currentLang: "English",
    priceLabel: "قیمت:", weightLabel: "وزن / تعداد:", locLabel: "لوکیشن:", catLabel: "کیٹیگری:",
    postAdBtn: "اشتہار 📢", ratesBtn: "ریٹس 💰", sortSimple: "ترتیب 📊", filterSimple: "فلٹرز 🎛️", industriesBtn: "انڈسٹریز 🏭",
    backBtn: "← واپس ہوم فیڈ"
  }
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // 🌍 MULTI-PAGE ROUTING STATE SYSTEM
  const [currentPage, setCurrentPage] = useState<string>('home'); // home, page1, page2, page3, page4, page5, page6, page7

  const [visibleAds, setVisibleAds] = useState<any[]>(initial10Ads);
  const loaderRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => { setShowSplash(false); }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // INFINITE SCROLL LOOP ENGINE
  useEffect(() => {
    if (showSplash || currentPage !== 'home') return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setVisibleAds((prev) => [
            ...prev,
            ...initial10Ads.map((ad, idx) => ({ ...ad, id: prev.length + idx + 1 }))
          ]);
        }, 300);
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [showSplash, visibleAds, currentPage]);

  return (
    <div className="min-h-screen bg-[#f2f6fa] text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }} dir="ltr">

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            <div className="text-7xl animate-bounce">🏭♻️</div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Database Connection Engine</p>
          </div>
        </div>
      )}

      {/* COMPACT TOP BANNER */}
      <header className="bg-gradient-to-b from-[#1a365d] to-[#0f2444] text-white px-4 py-3 shadow-xl rounded-b-2xl sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-xl mx-auto space-y-2">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl text-amber-400">🏭</span>
              <h1 className="text-xl font-black tracking-wide text-white">{t.appName}</h1>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-black px-1.5 py-0.5 rounded-full">LIVE</span>
            </div>
          </div>

          {/* BANNER 6-GRID CONTROL PANEL */}
          <div className="grid grid-cols-3 gap-1.5">
            
            {/* BUTTON 1: Language Switcher */}
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/5 active:scale-95 border border-white/10 rounded-xl py-1.5 px-2 flex items-center justify-center gap-1.5 transition-all">
              <span className="text-sm">🌐</span>
              <span className="text-[11px] font-black text-slate-200">{t.currentLang}</span>
            </button>

            {/* BUTTON 2: Login Gate -> Navigates to PAGE 1 Account Area */}
            <button onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else setCurrentPage('page1'); }} className={`active:scale-95 border rounded-xl py-1.5 px-2 flex items-center justify-center gap-1.5 transition-all ${isLoggedIn ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-600/20 border-emerald-500/20'}`}>
              <span className="text-sm">{isLoggedIn ? '👤' : '🔐'}</span>
              <span className={`text-[11px] font-black ${isLoggedIn ? 'text-amber-400' : 'text-emerald-400'}`}>{isLoggedIn ? t.logoutBtn : t.loginBtn}</span>
            </button>

            {/* BUTTON 3: More Options -> Navigates to PAGE 2 */}
            <button onClick={() => setCurrentPage('page2')} className={`bg-white/5 active:scale-95 border rounded-xl py-1.5 px-2 flex items-center justify-center gap-1.5 transition-all ${currentPage === 'page2' ? 'bg-amber-500 text-slate-950 font-black' : 'border-white/10 text-slate-200'}`}>
              <span className="text-sm">☰</span>
              <span className="text-[11px] font-black">{t.moreBtn}</span>
            </button>

            {/* BUTTON 4: Recycling Industries -> Navigates to PAGE 3 */}
            <button onClick={() => setCurrentPage('page3')} className={`active:scale-95 border rounded-xl py-1.5 px-2 flex items-center justify-center gap-1.5 transition-all ${currentPage === 'page3' ? 'bg-indigo-600 text-white border-transparent' : 'bg-indigo-600/20 border-indigo-500/20 text-indigo-400'}`}>
              <span className="text-sm">🏭</span>
              <span className="text-[11px] font-black">{t.industriesBtn}</span>
            </button>

            {/* BUTTON 5: Post Advertisement -> Navigates to PAGE 4 */}
            <button onClick={() => setCurrentPage('page4')} className={`active:scale-95 border rounded-xl py-1.5 px-2 flex items-center justify-center gap-1.5 transition-all ${currentPage === 'page4' ? 'bg-sky-500 text-slate-950 font-black border-transparent' : 'bg-sky-500/20 border-sky-400/20 text-sky-400'}`}>
              <span className="text-sm">📢</span>
              <span className="text-[11px] font-black">{t.postAdBtn}</span>
            </button>

            {/* BUTTON 6: Live Mandi Rates -> Navigates to PAGE 5 */}
            <button onClick={() => setCurrentPage('page5')} className={`active:scale-95 border rounded-xl py-1.5 px-2 flex items-center justify-center gap-1.5 transition-all ${currentPage === 'page5' ? 'bg-amber-500 text-slate-950 font-black border-transparent' : 'bg-amber-500/20 border-amber-400/20 text-amber-400'}`}>
              <span className="text-sm">💰</span>
              <span className="text-[11px] font-black">{t.ratesBtn}</span>
            </button>
          </div>

        </div>
      </header>

      {/* 🔄 CONDITIONAL MULTI-PAGE VIEW TERMINAL PLATFORM */}
      
      {/* 🏠 MAIN HOME AD FEED */}
      {currentPage === 'home' && (
        <main className="max-w-xl mx-auto p-4 mt-2">
          
          {/* Simple Lower Filter Cluster */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={() => setCurrentPage('page6')} className="bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-slate-700 shadow-sm font-black text-xs transition-all">
              {t.sortSimple}
            </button>
            <button onClick={() => setCurrentPage('page7')} className="bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-slate-700 shadow-sm font-black text-xs transition-all">
              {t.filterSimple}
            </button>
          </div>

          {/* Ads Matrix Loop */}
          <div className="space-y-4">
            {visibleAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md flex flex-col gap-3 hover:border-blue-400 transition-all cursor-pointer transform active:scale-[0.99]">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-36 h-36 bg-slate-100 rounded-2xl flex items-center justify-center text-6xl shrink-0 border border-slate-200 shadow-inner">
                    {ad.icon}
                  </div>
                  <div className="flex-1 space-y-2 overflow-hidden text-left">
                    <h4 className="font-black text-base text-slate-800 leading-snug line-clamp-2">
                      {lang === 'ur' ? ad.titleUr : ad.titleEn}
                    </h4>
                    <div className="text-[11px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-md inline-block">
                      {lang === 'ur' ? ad.categoryUr || ad.category : ad.categoryEn || ad.category}
                    </div>
                    <div className="space-y-1 text-xs font-bold text-slate-600 text-left">
                      <div className="truncate"><span className="text-slate-400 text-[10px] uppercase font-black">{t.weightLabel} </span><span className="text-slate-800">{ad.weight}</span></div>
                      <div className="truncate"><span className="text-slate-400 text-[10px] uppercase font-black">{t.locLabel} </span><span className="text-slate-800">📍 {ad.location}</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-left">
                  <span className="text-xs text-slate-400 font-black uppercase">{t.priceLabel}</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-green-600">Rs.{ad.price}</span>
                    <span className="text-xs text-slate-400 font-bold"> /{lang === 'ur' ? ad.unitUr || ad.unit : ad.unitEn || ad.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div ref={loaderRef} className="py-6 flex items-center justify-center text-slate-400 gap-2">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-black uppercase tracking-wider">Loading More Scrap Stock...</span>
          </div>
        </main>
      )}

      {/* 📄 MASTER CLEAN SUB-PAGES MATRIX BLOCKS */}
      {currentPage !== 'home' && (
        <main className="max-w-xl mx-auto p-4 mt-6 animate-fade-in">
          
          {/* Global Back Navigation Trigger */}
          <button onClick={() => setCurrentPage('home')} className="mb-6 bg-[#1a365d] text-white font-black text-xs px-4 py-2.5 rounded-xl shadow border border-transparent active:scale-95 transition-all">
            {t.backBtn}
          </button>

          {/* PAGE 1: Login / Account Management Portal Area */}
          {currentPage === 'page1' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">🔐</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 1: User Verification & Authentication Hub</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: login_portal_node</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan login/register aur phone number authentication ka system banega aap ke bataye mutabik.
              </div>
            </div>
          )}

          {/* PAGE 2: More Menu Options Portal Area */}
          {currentPage === 'page2' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">☰</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 2: Advanced System Drawer Controls</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: system_more_drawer</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan settings, privacy, terms aur app ke bache hue extra links lagayein ge.
              </div>
            </div>
          )}

          {/* PAGE 3: Recycling Industries / Smelting Plants Portal Area */}
          {currentPage === 'page3' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">🏭</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 3: Verified Commercial Recycling Industries Registry</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: recycling_plants_matrix</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan fectries aur yards ki verified directories aur bulk catalog rates show honge.
              </div>
            </div>
          )}

          {/* PAGE 4: Post New Ad Submission Form Area */}
          {currentPage === 'page4' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">📢</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 4: Post New Scrap Advertisement Submission Terminal</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: ad_submission_form</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan user apna naya scrap iron, copper bechne ka poora 5 steps wala form khol sakega.
              </div>
            </div>
          )}

          {/* PAGE 5: Live Market Price List System Area */}
          {currentPage === 'page5' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">💰</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 5: Live Local Mandi Rates Broadcast Grid</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: mandi_live_rates_engine</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan Gujranwala, Lahore, Karachi ke daily subah ke pukkay rates ka dabba show hoga.
              </div>
            </div>
          )}

          {/* PAGE 6: Sort Configuration Area */}
          {currentPage === 'page6' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">📊</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 6: Feed Sorting Parameters Configuration</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: sorting_filter_node</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan ads ko low-to-high price ya distance ke hisab se upar niche karne ka control aayega.
              </div>
            </div>
          )}

          {/* PAGE 7: Advanced Filters Configuration Area */}
          {currentPage === 'page7' && (
            <div className="bg-white rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="text-5xl">🎛️</div>
              <h2 className="text-xl font-black text-slate-800">PAGE 7: Material Type & City Filter System</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asset Code Area: main_filter_matrix</p>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 rounded-xl">
                Asif bhai, yahan makhsoos shehar ya makhsoos material filter karne ki windows banengi.
              </div>
            </div>
          )}

        </main>
      )}

    </div>
  );
}
