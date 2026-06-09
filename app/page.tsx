'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' ya 'prices'

  // 3 Second ka timer Splash Screen ke liye
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 1. خریداری فہرست (Buyer Demands)
  const [buyerItems] = useState([
    { id: 1, item: 'لوہا اسکریپ (Iron)', rate: 'Rs. 180 / kg', quantity: '5 Tons', city: 'گوجرانوالہ' },
    { id: 2, item: 'تانبا اسکریپ (Copper)', rate: 'Rs. 2,100 / kg', quantity: '800 kg', city: 'لاہور' },
    { id: 3, item: 'ایلومینیم پيک (Aluminum)', rate: 'Rs. 350 / kg', quantity: '1.5 Tons', city: 'سیالکوٹ' },
  ]);

  // 2. فروخت فہرست (Seller Stock)
  const [sellItems] = useState([
    { id: 1, item: 'پرانی گاڑیاں کی بیٹریاں', rate: 'Rs. 4,500 / pc', quantity: '40 Pcs', city: 'گوجرانوالہ' },
    { id: 2, item: 'پلاسٹک بوتلیں (PET)', rate: 'Rs. 85 / kg', quantity: '1,200 kg', city: 'فیصل آباد' },
    { id: 3, item: 'الیکٹرانک ویسٹ بورڈز', rate: 'Rs. 650 / kg', quantity: '300 kg', city: 'لاہور' },
  ]);

  // 3. لائیو پرائس لسٹ ڈیٹا (City-wise Live Rates)
  const [cityRates] = useState([
    {
      city: 'گوجرانوالہ (Gujranwala)',
      rates: [
        { name: 'لوہا اسکریپ (Loha)', price: 'Rs. 180 / kg' },
        { name: 'تانبا اسکریپ (Tamba)', price: 'Rs. 2,090 / kg' },
        { name: 'ایلومینیم اسکریپ', price: 'Rs. 345 / kg' },
        { name: 'گاڑیوں کی بیٹری', price: 'Rs. 4,500 / pc' }
      ]
    },
    {
      city: 'لاہور (Lahore)',
      rates: [
        { name: 'لوہا اسکریپ (Loha)', price: 'Rs. 183 / kg' },
        { name: 'تانبا اسکریپ (Tamba)', price: 'Rs. 2,120 / kg' },
        { name: 'پلاسٹک دانہ (PET)', price: 'Rs. 88 / kg' },
        { name: 'ایلومینیم اسکریپ', price: 'Rs. 352 / kg' }
      ]
    },
    {
      city: 'سیالکوٹ (Sialkot)',
      rates: [
        { name: 'لوہا اسکریپ (Loha)', price: 'Rs. 179 / kg' },
        { name: 'ایلومینیم پيک', price: 'Rs. 350 / kg' },
        { name: 'تانبا اسکریپ (Tamba)', price: 'Rs. 2,080 / kg' }
      ]
    }
  ]);

  // ========================================================
  // 1. SPLASH SCREEN (عربی اردو ٹیکسٹ کے ساتھ)
  // ========================================================
  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] text-slate-800">
        <div className="flex flex-col items-center space-y-6 text-center animate-pulse">
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-.5 1l3.5 3.5L23.5 9" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">SCRAP<span className="text-emerald-600">APP</span></h1>
            <h2 className="text-lg font-bold text-emerald-600 font-urdu tracking-normal">پریمیم اسکریپ مارکیٹ</h2>
          </div>
          <div className="w-20 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- MAIN HEADER --- */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-50 px-4 py-3.5 shadow-sm shadow-slate-100/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-.5 1l3.5 3.5L23.5 9" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">SCRAP<span className="text-emerald-600 font-extrabold">APP</span></span>
          </div>
          
          <button 
            onClick={() => alert('لاگ ان فارم جلد فعال ہوگا')}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            لاگ ان / رجسٹریشن
          </button>
        </div>
      </header>

      {/* --- VIEW 1: HOME PAGE --- */}
      {currentView === 'home' && (
        <main className="max-w-6xl mx-auto px-4 py-8">
          
          {/* TOP BUTTONS */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {/* لائیو پرائس لسٹ بٹن */}
            <button 
              onClick={() => setCurrentView('prices')}
              className="bg-white hover:bg-amber-50/40 border border-slate-200 text-amber-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm hover:border-amber-300 group"
            >
              <span className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m9-.5V11a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m5.5-1.5V14a3 3 0 00-3-3H12a3 3 0 00-3 3v6" />
                </svg>
              </span>
              لائیو پرائس لسٹ
            </button>
            
            {/* اشتہار لگائیں بٹن */}
            <button 
              onClick={() => alert('اشتہار لگانے کا فارم جلد آ رہا ہے')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md shadow-emerald-600/10"
            >
              <span className="p-2 rounded-xl bg-white/10 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              اشتہار لگائیں (Post Ad)
            </button>
          </div>

          {/* DUAL LISTS (BUY & SELL) */}
          <div className="grid md:grid-cols-2 gap-8 text-right" style={{ direction: 'rtl' }}>
            
            {/* خریداری فہرست */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-md bg-blue-500 shadow-sm shadow-blue-500/40"></span>
                  خریدارى فہرست (Buyer List)
                </h2>
                <span className="text-[11px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold border border-blue-100">ڈیمانڈ</span>
              </div>

              <div className="space-y-3">
                {buyerItems.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex justify-between items-center hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="space-y-1 text-right">
                      <h3 className="font-bold text-slate-800 text-base">{item.item}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>مطلوبہ مقدار: <strong className="text-slate-600 font-semibold">{item.quantity}</strong></span>
                        <span>•</span>
                        <span>📍 {item.city}</span>
                      </div>
                    </div>
                    <span className="text-sm bg-slate-50 text-emerald-600 font-black px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm" style={{ direction: 'ltr' }}>
                      {item.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* فروخت فہرست */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500 shadow-sm shadow-emerald-500/40"></span>
                  فروخت فہرست (Sell List)
                </h2>
                <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-bold border border-emerald-100">دستیاب</span>
              </div>

              <div className="space-y-3">
                {sellItems.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex justify-between items-center hover:border-emerald-300 hover:shadow-md transition-all">
                    <div className="space-y-1 text-right">
                      <h3 className="font-bold text-slate-800 text-base">{item.item}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>اسٹاک: <strong className="text-slate-600 font-semibold">{item.quantity}</strong></span>
                        <span>•</span>
                        <span>📍 {item.city}</span>
                      </div>
                    </div>
                    <span className="text-sm bg-slate-50 text-emerald-600 font-black px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm" style={{ direction: 'ltr' }}>
                      {item.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      )}

      {/* --- VIEW 2: LIVE PRICE LIST PAGE --- */}
      {currentView === 'prices' && (
        <main className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
          
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => setCurrentView('home')}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              واپس ہوم پیج (Back)
            </button>
          </div>

          {/* Heading */}
          <div className="border-b border-slate-200 pb-4 mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-900">📊 لائیو پرائس لسٹ (شہروں کے حساب سے)</h2>
            <p className="text-slate-500 text-xs mt-1">پاکستان کے مختلف شہروں میں اسکریپ کے تازہ ترین ریٹس</p>
          </div>

          {/* City Wise Rates Display */}
          <div className="space-y-8" style={{ direction: 'rtl' }}>
            {cityRates.map((cityGroup, index) => (
              <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                
                {/* City Title Header */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
                  <span className="w-3 h-6 bg-gradient-to-b from-amber-400 to-amber-500 rounded-sm"></span>
                  <h3 className="text-lg font-black text-slate-900">{cityGroup.city}</h3>
                </div>

                {/* Items & Rates Inside the City */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {cityGroup.rates.map((rateItem, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/50 rounded-xl p-4 flex justify-between items-center">
                      <span className="font-bold text-slate-800 text-sm">{rateItem.name}</span>
                      <span className="text-sm text-amber-700 font-black bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg" style={{ direction: 'ltr' }}>
                        {rateItem.price}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </main>
      )}

      {/* --- FOOTER --- */}
      <footer className="text-center py-10 text-slate-400 text-xs border-t border-slate-200/60 bg-white mt-20">
        © 2026 اسکریپ ایپ کارپوریشن۔ تمام حقوق محفوظ ہیں۔
      </footer>
    </div>
  );
}
