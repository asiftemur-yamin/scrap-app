'use client';

import { useState, useEffect } from 'react';

// Languages Dictionary (English & Urdu Script)
const translations = {
  en: {
    sellScrap: "Sell Scrap",
    buyScrap: "Buy Scrap",
    rates: "Live Rates",
    directory: "Directory",
    searchPlaceholder: "Search scrap iron, plastic, copper...",
    location: "Gujranwala",
    browseTitle: "Browse Scrap Categories",
    cat1: "Iron (Loha)",
    cat2: "Plastic",
    cat3: "Copper (Tamba)",
    cat4: "Aluminum",
    cat5: "Batteries",
    cat6: "Solar Panels",
    cat7: "Mix Scrap",
    cat8: "Electronic",
    servicesTitle: "Explore R-H-A-F Services",
    s1Title: "Scrap Inspection",
    s1Desc: "Get accurate weight & live market rates safely.",
    s2Title: "Sell It For Me",
    s2Desc: "Hassle-free heavy machinery & factory clearance.",
    s3Title: "R-H-A-F Wallet",
    s3Desc: "Manage your digital recycling payments instantly.",
    navHome: "Home",
    navAds: "My Ads",
    navSell: "Sell Now",
    navChat: "Chat",
    navMore: "More"
  },
  ur: {
    sellScrap: "اسکریپ بیچیں",
    buyScrap: "اسکریپ خریدیں",
    rates: "لائیو ریٹس",
    directory: "ڈائریکٹری",
    searchPlaceholder: "لوہا، پلاسٹک، تانبا تلاش کریں...",
    location: "گوجرانوالہ",
    browseTitle: "اسکریپ کیٹیگریز تلاش کریں",
    cat1: "لوہا (Iron)",
    cat2: "پلاسٹک (Plastic)",
    cat3: "تانبا (Copper)",
    cat4: "ایلومینیم",
    cat5: "بیٹریاں",
    cat6: "سولر پینل",
    cat7: "مکس اسکریپ",
    cat8: "الیکٹرانک",
    servicesTitle: "آر-ایچ-اے-ایف سروسز",
    s1Title: "اسکریپ کا معائنہ",
    s1Desc: "صحیح وزن اور مارکیٹ کے لائیو ریٹس جانیں۔",
    s2Title: "ہمارے ذریعے بیچیں",
    s2Desc: "فیکٹری اور بھاری مشینری کا اسکریپ خود اٹھوائیں۔",
    s3Title: "آر-ایچ-اے-ایف والٹ",
    s3Desc: "اپنی ری سائیکلنگ پیمنٹ فوری یہاں مینج کریں۔",
    navHome: "ہوم",
    navAds: "اشتہارات",
    navSell: "ابھی بیچیں",
    navChat: "چیٹ",
    navMore: "مزید"
  }
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 1. Splash Screen (3 Seconds)
  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a365d] text-white">
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl">♻️</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-wider text-white">R-H-A-F RECYCLING</h1>
          <div className="w-16 h-1 bg-blue-400 rounded-full overflow-hidden">
            <div className="w-full h-full bg-white animate-infinite origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main App Interface (PakWheels Style Layout)
  return (
    <div className={`min-h-screen bg-[#f2f6fa] text-slate-800 font-sans pb-24 ${lang === 'ur' ? 'text-right' : 'text-left'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      
      {/* Top Main Dark Blue Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold tracking-tight text-white">R-H-A-F</div>
          
          {/* Language Toggle Button */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="bg-white/20 hover:bg-white/30 text-white font-medium text-xs px-3 py-1.5 rounded-full border border-white/30 transition-all active:scale-95"
          >
            {lang === 'en' ? 'اردو (Urdu)' : 'English'}
          </button>
        </div>

        {/* Top Horizontal Pill Navigation Grid */}
        <div className="flex space-x-2 overflow-x-auto pb-3 scrollbar-none gap-2">
          <button className="bg-[#0066cc] text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm">{t.sellScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.buyScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.rates}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.directory}</button>
        </div>

        {/* Search Bar matching PakWheels layout */}
        <div className="mt-2 bg-white rounded-lg p-3 flex items-center shadow-inner text-slate-700">
          <span className="text-slate-400 mx-2">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent outline-none text-sm placeholder-slate-400 font-medium"
          />
          <div className="flex items-center text-xs text-slate-400 border-l border-slate-200 pl-2 ml-2 whitespace-nowrap gap-1">
            <span>📍</span>
            <span className="font-semibold text-slate-600">{t.location}</span>
          </div>
        </div>
      </header>

      {/* Main Container Body */}
      <main className="px-4 mt-6">
        
        {/* Browse Section Title */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">{t.browseTitle}</h2>
        </div>

        {/* Categories 2x4 Grid with Emojis */}
        <div className="grid grid-cols-4 gap-2.5 mb-8">
          {[
            { label: t.cat1, icon: "🔩" },
            { label: t.cat2, icon: "🛢️" },
            { label: t.cat3, icon: "🔌" },
            { label: t.cat4, icon: "🥫" },
            { label: t.cat5, icon: "🔋" },
            { label: t.cat6, icon: "☀️" },
            { label: t.cat7, icon: "📦" },
            { label: t.cat8, icon: "💻" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all cursor-pointer aspect-square">
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-[11px] font-bold text-slate-600 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Explore Services Grid Cards */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">{t.servicesTitle}</h2>
        </div>

        {/* Big Services Featured Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex justify-between items-center relative overflow-hidden">
            <div className="space-y-1 max-w-[70%]">
              <h3 className="font-bold text-base text-slate-800">{t.s1Title}</h3>
              <p className="text-xs text-slate-400 leading-normal">{t.s1Desc}</p>
            </div>
            <span className="text-5xl opacity-80">⚖️</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex justify-between items-center relative overflow-hidden">
            <div className="space-y-1 max-w-[70%]">
              <h3 className="font-bold text-base text-slate-800">{t.s2Title}</h3>
              <p className="text-xs text-slate-400 leading-normal">{t.s2Desc}</p>
            </div>
            <span className="text-5xl opacity-80">🚛</span>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Navigation Bar with Floating Center "+" Button */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button className="flex flex-col items-center text-[#0066cc] font-bold text-xs w-14">
          <span className="text-xl">🏠</span>
          <span className="mt-0.5">{t.navHome}</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14">
          <span className="text-xl">📋</span>
          <span className="mt-0.5">{t.navAds}</span>
        </button>
        
        {/* Floating Big Blue "+" Sell Now Center Button */}
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button className="w-14 h-14 bg-[#0066cc] hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 border-4 border-white transform active:scale-95 transition-all">
            <span className="text-3xl font-light text-white">+</span>
          </button>
          <span className="text-[11px] font-bold text-[#0066cc] mt-1 whitespace-nowrap">{t.navSell}</span>
        </div>

        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14">
          <span className="text-xl">💬</span>
          <span className="mt-0.5">{t.navChat}</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14">
          <span className="text-xl">⣿</span>
          <span className="mt-0.5">{t.navMore}</span>
        </button>
      </nav>

    </div>
  );
}
