'use client';

import { useState, useEffect } from 'react';

// Languages & Price List Dictionary
const translations = {
  en: {
    appName: "SCRAP WORLD",
    sellScrap: "Sell Scrap",
    buyScrap: "Buy Scrap",
    rates: "Live Rates",
    directory: "Directory",
    searchPlaceholder: "Search scrap iron, plastic, copper...",
    browseTitle: "Browse Scrap Categories",
    priceListTitle: "Live Market Price List",
    selectCityTitle: "Select City for Rates",
    rateUnit: "Rs / Kg",
    cat1: "Iron (Loha)",
    cat2: "Plastic",
    cat3: "Copper (Tamba)",
    cat4: "Aluminum",
    cat5: "Batteries",
    cat6: "Solar Panels",
    cat7: "Mix Scrap",
    cat8: "Electronic",
    navHome: "Home",
    navAds: "My Ads",
    navSell: "Sell Now",
    navChat: "Chat",
    navMore: "More",
    cities: {
      gujranwala: "Gujranwala",
      lahore: "Lahore",
      karachi: "Karachi",
      multan: "Multan"
    }
  },
  ur: {
    appName: "اسکریپ ورلڈ",
    sellScrap: "اسکریپ بیچیں",
    buyScrap: "اسکریپ خریدیں",
    rates: "لائیو ریٹس",
    directory: "ڈائریکٹری",
    searchPlaceholder: "لوہا، پلاسٹک، تانبا تلاش کریں...",
    browseTitle: "اسکریپ کیٹیگریز تلاش کریں",
    priceListTitle: "مارکیٹ کی لائیو ریٹ لسٹ",
    selectCityTitle: "شہر کا انتخاب کریں",
    rateUnit: "روپے / کلو",
    cat1: "لوہا (Iron)",
    cat2: "پلاسٹک (Plastic)",
    cat3: "تانبا (Copper)",
    cat4: "ایلومینیم",
    cat5: "بیٹریاں",
    cat6: "سولر پینل",
    cat7: "مکس اسکریپ",
    cat8: "الیکٹرانک",
    navHome: "ہوم",
    navAds: "اشتہارات",
    navSell: "ابھی بیچیں",
    navChat: "چیٹ",
    navMore: "مزید",
    cities: {
      gujranwala: "گوجرانوالہ",
      lahore: "لاہور",
      karachi: "کراچی",
      multan: "ملتان"
    }
  }
};

// Cities Live Scrap Rates Data
const scrapRates = {
  gujranwala: [
    { id: "iron", nameKey: "cat1", icon: "🔩", price: "120" },
    { id: "copper", nameKey: "cat3", icon: "🔌", price: "1,850" },
    { id: "aluminum", nameKey: "cat4", icon: "🥫", price: "450" },
    { id: "plastic", nameKey: "cat2", icon: "🛢️", price: "95" }
  ],
  lahore: [
    { id: "iron", nameKey: "cat1", icon: "🔩", price: "124" },
    { id: "copper", nameKey: "cat3", icon: "🔌", price: "1,880" },
    { id: "aluminum", nameKey: "cat4", icon: "🥫", price: "465" },
    { id: "plastic", nameKey: "cat2", icon: "🛢️", price: "98" }
  ],
  karachi: [
    { id: "iron", nameKey: "cat1", icon: "🔩", price: "130" },
    { id: "copper", nameKey: "cat3", icon: "🔌", price: "1,920" },
    { id: "aluminum", nameKey: "cat4", icon: "🥫", price: "480" },
    { id: "plastic", nameKey: "cat2", icon: "🛢️", price: "105" }
  ],
  multan: [
    { id: "iron", nameKey: "cat1", icon: "🔩", price: "118" },
    { id: "copper", nameKey: "cat3", icon: "🔌", price: "1,820" },
    { id: "aluminum", nameKey: "cat4", icon: "🥫", price: "440" },
    { id: "plastic", nameKey: "cat2", icon: "🛢️", price: "90" }
  ]
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 1. Splash Screen
  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a365d] text-white">
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl">♻️</span>
          </div>
          <h1 className="text-4xl font-black tracking-widest text-white">SCRAP WORLD</h1>
          <div className="w-16 h-1 bg-blue-400 rounded-full overflow-hidden">
            <div className="w-full h-full bg-white animate-infinite origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f2f6fa] text-slate-800 font-sans pb-24 ${lang === 'ur' ? 'text-right' : 'text-left'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      
      {/* Header Container */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-black tracking-wider text-white">{t.appName}</div>
          
          {/* Language Switching Button */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30 transition-all active:scale-95"
          >
            {lang === 'en' ? 'اردو (Urdu)' : 'English'}
          </button>
        </div>

        {/* Top Horizontal Navigation */}
        <div className="flex overflow-x-auto pb-3 scrollbar-none gap-2">
          <button className="bg-[#0066cc] text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm">{t.sellScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.buyScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.rates}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.directory}</button>
        </div>

        {/* Search Bar Layout */}
        <div className="mt-2 bg-white rounded-lg p-3 flex items-center shadow-inner text-slate-700">
          <span className="text-slate-400 mx-2">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent outline-none text-sm placeholder-slate-400 font-medium"
          />
        </div>
      </header>

      {/* Main Body Grid content */}
      <main className="px-4 mt-6">
        
        {/* Category Browsing */}
        <div className="mb-4">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.browseTitle}</h2>
        </div>

        <div className="grid grid-cols-4 gap-2.5 mb-6">
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

        {/* NEW VIP FEATURE: 4 City Select Boxes */}
        <div className="mb-3 mt-6">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.selectCityTitle}</h2>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {(['gujranwala', 'lahore', 'karachi', 'multan'] as const).map((cityName) => (
            <button
              key={cityName}
              onClick={() => setSelectedCity(cityName)}
              className={`py-2.5 px-1 text-center rounded-xl font-bold text-xs border transition-all active:scale-95 ${
                selectedCity === cityName
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {t.cities[cityName]}
            </button>
          ))}
        </div>

        {/* NEW VIP FEATURE: Dynamic Price List Card Grid Row */}
        <div className="mb-3">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">
            {t.priceListTitle} ({t.cities[selectedCity]})
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-2 divide-y divide-slate-100 mb-12">
          {scrapRates[selectedCity].map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3.5 hover:bg-slate-50/50 transition-all">
              <div className="flex items-center space-x-3 gap-2">
                <span className="text-2xl bg-slate-100 p-1.5 rounded-lg">{item.icon}</span>
                <span className="font-bold text-slate-700 text-sm">{(t as any)[item.nameKey]}</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-green-600 block">{item.price}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{t.rateUnit}</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Fixed Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button className="flex flex-col items-center text-[#0066cc] font-bold text-xs w-14">
          <span className="text-xl">🏠</span>
          <span className="mt-0.5">{t.navHome}</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14">
          <span className="text-xl">📋</span>
          <span className="mt-0.5">{t.navAds}</span>
        </button>
        
        {/* Floating Center Button */}
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
