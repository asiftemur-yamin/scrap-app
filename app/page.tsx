'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // views: 'home', 'prices', 'auth', 'post-ad'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' ya 'signup'

  // Post Ad Form State
  const [adItemName, setAdItemName] = useState('');
  const [adRate, setAdRate] = useState('');
  const [adQuantity, setAdQuantity] = useState('');
  const [adCity, setAdCity] = useState('');
  const [adPhone, setAdPhone] = useState('');

  // 3 Second Timer for Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // خریداری فہرست (Buyer Demands Data)
  const [buyerItems] = useState([
    { id: 1, item: 'لوہا اسکریپ / Iron Scrap', rate: 'Rs. 180 / kg', quantity: '5 Tons', city: 'گوجرانوالہ / Gujranwala' },
    { id: 2, item: 'تانبا اسکریپ / Copper Scrap', rate: 'Rs. 2,100 / kg', quantity: '800 kg', city: 'لاہور / Lahore' },
    { id: 3, item: 'ایلومینیم پيک / Aluminum Pack', rate: 'Rs. 350 / kg', quantity: '1.5 Tons', city: 'سیالکوٹ / Sialkot' },
  ]);

  // فروخت فہرست (Seller Stock Data)
  const [sellItems, setSellItems] = useState([
    { id: 1, item: 'پرانی گاڑیاں کی بیٹریاں / Car Batteries', rate: 'Rs. 4,500 / pc', quantity: '40 Pcs', city: 'گوجرانوالہ / Gujranwala' },
    { id: 2, item: 'پلاسٹک بوتلیں / PET Bottles', rate: 'Rs. 85 / kg', quantity: '1,200 kg', city: 'فیصل آباد / Faisalabad' },
  ]);

  // شہروں کے ریٹس (City Wise Live Price List)
  const [cityRates] = useState([
    {
      city: 'گوجرانوالہ (Gujranwala)',
      rates: [
        { name: 'لوہا اسکریپ / Iron', price: 'Rs. 180 / kg' },
        { name: 'تانبا اسکریپ / Copper', price: 'Rs. 2,090 / kg' },
        { name: 'گاڑیوں کی بیٹری / Battery', price: 'Rs. 4,500 / pc' }
      ]
    },
    {
      city: 'لاہور (Lahore)',
      rates: [
        { name: 'لوہا اسکریپ / Iron', price: 'Rs. 183 / kg' },
        { name: 'تانبا اسکریپ / Copper', price: 'Rs. 2,120 / kg' },
        { name: 'پلاسٹک دانہ / PET Plastic', price: 'Rs. 88 / kg' }
      ]
    }
  ]);

  // Handle Post Ad Button Click
  const handlePostAdClick = () => {
    if (!isLoggedIn) {
      setCurrentView('auth');
    } else {
      setCurrentView('post-ad');
    }
  };

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adItemName || !adRate || !adQuantity || !adCity) {
      alert('براہ کرم تمام خانے پر کریں / Please fill all fields');
      return;
    }
    const newAd = {
      id: sellItems.length + 1,
      item: adItemName,
      rate: `Rs. ${adRate} / kg`,
      quantity: adQuantity,
      city: adCity
    };
    setSellItems([newAd, ...sellItems]);
    alert('اشتہار کامیابی سے پوسٹ ہو گیا! / Ad Posted Successfully!');
    // Reset Form
    setAdItemName(''); setAdRate(''); setAdQuantity(''); setAdCity(''); setAdPhone('');
    setCurrentView('home');
  };

  // ========================================================
  // 1. SPLASH SCREEN VIEW
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
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">SCRAP<span className="text-emerald-600">APP</span></h1>
            <h2 className="text-sm font-bold text-slate-400">پریمیم مارکیٹ / Premium Marketplace</h2>
          </div>
          <div className="w-20 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 font-sans selection:bg-emerald-100">
      
      {/* --- GLOBAL NAVBAR --- */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-50 px-4 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-.5 1l3.5 3.5L23.5 9" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">SCRAP<span className="text-emerald-600 font-extrabold">APP</span></span>
          </div>
          
          <button 
            onClick={() => { if(isLoggedIn) { setIsLoggedIn(false); setCurrentView('home'); } else { setCurrentView('auth'); } }}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {isLoggedIn ? 'لاگ آؤٹ / Logout' : 'لاگ ان / Login'}
          </button>
        </div>
      </header>

      {/* ========================================================
          VIEW 1: HOME PAGE (MARKETPLACE)
          ======================================================== */}
      {currentView === 'home' && (
        <main className="max-w-6xl mx-auto px-4 py-8">
          
          {/* ACTION BUTTONS WITH DUAL LANGUAGE */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <button 
              onClick={() => setCurrentView('prices')}
              className="bg-white hover:bg-amber-50/40 border border-slate-200 text-amber-600 font-bold py-4 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-sm group"
            >
              <span className="text-lg font-black">📊 لائیو پرائس لسٹ</span>
              <span className="text-xs text-slate-400 font-medium font-sans">Live Price List</span>
            </button>
            
            <button 
              onClick={handlePostAdClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-md shadow-emerald-600/10"
            >
              <span className="text-lg font-black">📢 اشتہار لگائیں</span>
              <span className="text-xs text-emerald-100 font-medium font-sans">Post New Ad</span>
            </button>
          </div>

          {/* DUAL LIST LAYOUT */}
          <div className="grid md:grid-cols-2 gap-8 text-right" style={{ direction: 'rtl' }}>
            
            {/* خریداری فہرست / Buyer List */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-md bg-blue-500 shadow-sm"></span>
                  خریدارى فہرست / Buyer List
                </h2>
                <span className="text-[11px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold border border-blue-100">ڈیمانڈ / Demand</span>
              </div>

              <div className="space-y-3">
                {buyerItems.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex justify-between items-center hover:shadow-md transition-all">
                    <div className="space-y-1 text-right">
                      <h3 className="font-bold text-slate-800 text-base">{item.item}</h3>
                      <p className="text-xs text-slate-400">مقدار / Qty: <span className="text-slate-600 font-semibold">{item.quantity}</span> • 📍 {item.city}</p>
                    </div>
                    <span className="text-sm bg-slate-50 text-emerald-600 font-black px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm" style={{ direction: 'ltr' }}>
                      {item.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* فروخت فہرست / Sell List */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500 shadow-sm"></span>
                  فروخت فہرست / Sell List
                </h2>
                <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-bold border border-emerald-100">دستیاب / Available</span>
              </div>

              <div className="space-y-3">
                {sellItems.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex justify-between items-center hover:shadow-md transition-all">
                    <div className="space-y-1 text-right">
                      <h3 className="font-bold text-slate-800 text-base">{item.item}</h3>
                      <p className="text-xs text-slate-400">اسٹاک / Stock: <span className="text-slate-600 font-semibold">{item.quantity}</span> • 📍 {item.city}</p>
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

      {/* ========================================================
          VIEW 2: LIVE PRICE LIST
          ======================================================== */}
      {currentView === 'prices' && (
        <main className="max-w-4xl mx-auto px-4 py-8 text-right" style={{ direction: 'rtl' }}>
          <button onClick={() => setCurrentView('home')} className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs shadow-sm mb-6 flex items-center gap-1.5 ml-auto">
            ← واپس ہوم پیج / Back to Home
          </button>

          <div className="border-b border-slate-200 pb-3 mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-900">📊 لائیو پرائس لسٹ / Live Price List</h2>
            <p className="text-slate-400 text-xs mt-1">شہروں کے مطابق تازہ ترین ریٹس / City Wise Scrap Rates</p>
          </div>

          <div className="space-y-6">
            {cityRates.map((cityGroup, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 mb-4 text-right">📍 {cityGroup.city}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cityGroup.rates.map((rateItem, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex justify-between items-center">
                      <span className="font-bold text-slate-700 text-sm">{rateItem.name}</span>
                      <span className="text-sm text-amber-700 font-black bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100" style={{ direction: 'ltr' }}>
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

      {/* ========================================================
          VIEW 3: AUTH PAGE (LOGIN / REGISTER WITH GMAIL & APPLE)
          ======================================================== */}
      {currentView === 'auth' && (
        <main className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center">
            
            <h2 className="text-2xl font-black text-slate-900">
              {authMode === 'login' ? 'لاگ ان کریں / Login' : 'اکاؤنٹ بنائیں / Sign Up'}
            </h2>
            <p className="text-slate-400 text-xs mt-1 mb-6">اشتہار پوسٹ کرنے کے لیے اکاؤنٹ ضروری ہے / Account required to post ads</p>

            {/* SOCIAL LOGIN BUTTONS */}
            <div className="space-y-3 mb-6">
              {/* Google Button */}
              <button 
                onClick={() => { setIsLoggedIn(true); setCurrentView('post-ad'); }}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span className="text-base">📧</span> گوگل (Gmail) سے لاگ ان کریں / Continue with Google
              </button>

              {/* Apple Button */}
              <button 
                onClick={() => { setIsLoggedIn(true); setCurrentView('post-ad'); }}
                className="w-full bg-black hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span className="text-base">🍏</span> ایپل (Apple ID) سے لاگ ان کریں / Continue with Apple
              </button>
            </div>

            <div className="relative flex py-2 items-center text-xs text-slate-300 uppercase font-bold my-4">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400">یا / OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* EMAIL LOGIN FORM */}
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setCurrentView('post-ad'); }} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">ای میل ایڈریس / Email Address</label>
                <input type="email" required placeholder="name@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500 text-left font-sans" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">پاس ورڈ / Password</label>
                <input type="password" required placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500 text-left font-sans" />
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-md mt-2">
                {authMode === 'login' ? 'جاری رکھیں / Continue' : 'رجسٹریشن مکمل کریں / Register'}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <p className="text-xs text-slate-500 mt-6 cursor-pointer hover:text-emerald-600 font-bold" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
              {authMode === 'login' ? 'نیا اکاؤنٹ بنائیں؟ / Create an account' : 'پہلے سے اکاؤنٹ موجود ہے؟ / Already have an account?'}
            </p>

          </div>
        </main>
      )}

      {/* ========================================================
          VIEW 4: POST AD FORM PAGE
          ======================================================== */}
      {currentView === 'post-ad' && (
        <main className="max-w-lg mx-auto px-4 py-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            
            <div className="border-b border-slate-100 pb-3 mb-6 text-center">
              <h2 className="text-xl font-black text-slate-900">📢 نیا اشتہار لگائیں / Post New Ad</h2>
              <p className="text-slate-400 text-xs mt-0.5">اپنا اسکریپ بیچنے کے لیے معلومات درج کریں / Sell your scrap items</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-right">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">آئٹم کا نام / Item Name</label>
                <input type="text" value={adItemName} onChange={(e) => setAdItemName(e.target.value)} placeholder="مثال: لودہا اسکریپ، کاپر تار" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500" />
              </div>

              {/* Rate */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">قیمت (فی کلوگرام) / Rate (Rs / kg)</label>
                <input type="number" value={adRate} onChange={(e) => setAdRate(e.target.value)} placeholder="مثال: 180" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500 text-left font-sans" />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">مقدار (ٹنز یا کلوگرام) / Total Quantity</label>
                <input type="text" value={adQuantity} onChange={(e) => setAdQuantity(e.target.value)} placeholder="مثال: 2 Tons یا 500 kg" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500" />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">آپ کا شہر / Your City</label>
                <input type="text" value={adCity} onChange={(e) => setAdCity(e.target.value)} placeholder="مثال: گوجرانوالہ، لاہور" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500" />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">فون نمبر / Phone Number</label>
                <input type="tel" value={adPhone} onChange={(e) => setAdPhone(e.target.value)} placeholder="03001234567" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-emerald-500 text-left font-sans" />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setCurrentView('home')} className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs text-center transition-all">
                  منسوخ کریں / Cancel
                </button>
                <button type="submit" className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-emerald-600/10 transition-all">
                  اشتہار لائیو کریں / Submit Ad
                </button>
              </div>

            </form>

          </div>
        </main>
      )}

      {/* --- GLOBAL FOOTER --- */}
      <footer className="text-center py-10 text-slate-400 text-xs border-t border-slate-200/60 bg-white mt-20">
        © 2026 اسکریپ ایپ کارپوریشن۔ تمام حقوق محفوظ ہیں۔ / Scrap App Corp.
      </footer>
    </div>
  );
}
