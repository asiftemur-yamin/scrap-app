'use client';

import { useState, useEffect } from 'react';

// Languages & Price List Dictionary
const translations = {
  en: {
    appName: "SCRAP WORLD",
    sellScrap: "Sell Scrap",
    buyScrap: "Buy Scrap",
    rates: "Live Rates",
    postAd: "Post Ad",
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
    },
    // New Flow Translations
    chooseTypeTitle: "What do you want to do?",
    optionSellTitle: "Sell My Scrap",
    optionSellDesc: "Post an ad to sell your scrap material to buyers.",
    optionBuyTitle: "Do You Want to Buy? (Demand)",
    optionBuyDesc: "Post your business requirement / demand to get offers.",
    formTitleSell: "Create Sell Advertisement",
    formTitleBuy: "Create Buy Demand Advertisement",
    itemName: "Item Name / Title",
    itemNamePlh: "e.g., Heavy Industrial Melting Iron",
    selectUnit: "Select Weight Unit",
    perKg: "Per Kg",
    perTon: "Per Ton",
    perMund: "Per Mund (37.324 Kg)",
    rateLabelSell: "Your Selling Price (Rs)",
    rateLabelBuy: "Your Buying Budget Price (Rs)",
    locLabel: "Ad Location / City",
    picLabel: "Upload Scrap Pictures",
    picDesc: "Add up to 5 clear photos of your material",
    detailsLabel: "Scrap Details / Description",
    detailsPlh: "Mention total weight, quality, and pickup availability...",
    featureLabel: "Feature This Ad (VIP)",
    featureDesc: "Get 10x more direct calls from premium clients",
    submitBtnSell: "Publish Sell Ad 🚀",
    submitBtnBuy: "Publish Demand Ad 📢"
  },
  ur: {
    appName: "اسکریپ ورلڈ",
    sellScrap: "اسکریپ بیچیں",
    buyScrap: "اسکریپ خریدیں",
    rates: "لائیو ریٹس",
    postAd: "اشتہار لگائیں",
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
    },
    // New Flow Translations
    chooseTypeTitle: "آپ کیا کرنا چاہتے ہیں؟",
    optionSellTitle: "اسکریپ بیچنا ہے",
    optionSellDesc: "اپنا مال گاہکوں کو بیچنے کے لیے اشتہار لگائیں۔",
    optionBuyTitle: "مال خریدنا ہے؟ (ڈیمانڈ اشتہار)",
    optionBuyDesc: "اپنی فیکٹری یا کاروبار کی ڈیمانڈ ڈالیں تاکہ لوگ آفرز دیں۔",
    formTitleSell: "بیچنے کا نیا اشتہار بنائیں",
    formTitleBuy: "خریداری کی نئی ڈیمانڈ کا اشتہار بنائیں",
    itemName: "چیز کا نام / ٹائٹل",
    itemNamePlh: "مثال کے طور پر: فیکٹری کا پگھلنے والا لوہا",
    selectUnit: "وزن کی اکائی (Unit) منتخب کریں",
    perKg: "فی کلو (Per Kg)",
    perTon: "فی ٹن (Per Ton)",
    perMund: "فی من (37.324 Kg)",
    rateLabelSell: "بیچنے کی قیمت (روپے)",
    rateLabelBuy: "خریدنے کا بجٹ / ریٹ (روپے)",
    locLabel: "شہر / لوکیشن",
    picLabel: "اسکریپ کی تصاویر اپلوڈ کریں",
    picDesc: "اپنے مال کی صاف اور واضح تصاویر شامل کریں",
    detailsLabel: "مال کی تفصیلات / ڈسکرپشن",
    detailsPlh: "کل وزن، کوالٹی اور مال اٹھانے کی تفصیلات لکھیں...",
    featureLabel: "اشتہار کو فیچرڈ کریں (VIP)",
    featureDesc: "بڑے ڈیلرز سے 10 گنا زیادہ فون کالز حاصل کریں",
    submitBtnSell: "بیچنے کا اشتہار لگائیں 🚀",
    submitBtnBuy: "خریداری کی ڈیمانڈ پوسٹ کریں 📢"
  }
};

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
    { id: "plastic", nameKey: "cat2", icon: "105" }
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
  
  // Post Ad Smart States
  const [showPostAd, setShowPostAd] = useState(false);
  const [adStep, setAdStep] = useState<'select' | 'form'>('select'); // 'select' or 'form'
  const [adType, setAdType] = useState<'sell' | 'buy'>('sell'); // 'sell' or 'buy'
  
  // Form Control States
  const [unit, setUnit] = useState('kg');
  const [isFeatured, setIsFeatured] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // SMART BACK BUTTON LOGIC
  const handleBackNavigation = () => {
    if (adStep === 'form') {
      // Form se pichlay page (Select screen) par jaye ga, exit nahi karega
      setAdStep('select');
    } else {
      // Main Select screen par close ho kar app dashboard par aa jaye ga
      setShowPostAd(false);
    }
  };

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
      
      {/* Top Main Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-black tracking-wider text-white">{t.appName}</div>
          
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30 transition-all"
          >
            {lang === 'en' ? 'اردو (Urdu)' : 'English'}
          </button>
        </div>

        {/* Navigation Top Buttons */}
        <div className="flex overflow-x-auto pb-3 scrollbar-none gap-2">
          <button className="bg-[#0066cc] text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm">{t.sellScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.buyScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.rates}</button>
          <button 
            onClick={() => { setShowPostAd(true); setAdStep('select'); }}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-full whitespace-nowrap shadow-md transition-all active:scale-95"
          >
            📢 {t.postAd}
          </button>
        </div>

        <div className="mt-2 bg-white rounded-lg p-3 flex items-center shadow-inner text-slate-700">
          <span className="text-slate-400 mx-2">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent outline-none text-sm placeholder-slate-400 font-medium"
          />
        </div>
      </header>

      {/* Main Categories & Live Price List */}
      <main className="px-4 mt-6">
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

        {/* City Filter Selection */}
        <div className="mb-3 mt-6">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.selectCityTitle}</h2>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {(['gujranwala', 'lahore', 'karachi', 'multan'] as const).map((cityName) => (
            <button
              key={cityName}
              onClick={() => setSelectedCity(cityName)}
              className={`py-2.5 px-1 text-center rounded-xl font-bold text-xs border transition-all ${
                selectedCity === cityName
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {t.cities[cityName]}
            </button>
          ))}
        </div>

        {/* Dynamic Rate List Grid */}
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

      {/* FULL-SCREEN PREMIUM OVERLAY FOR POST AD (Z-INDEX 100 FIXED FIX) */}
      {showPostAd && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[100] flex flex-col overflow-y-auto pb-12">
          
          {/* Custom Form Header with Integrated Smart Back Arrow */}
          <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex items-center justify-between shadow-md z-10">
            <button 
              onClick={handleBackNavigation}
              className="flex items-center space-x-1 gap-1 text-white bg-white/10 hover:bg-white/20 font-bold px-3 py-2 rounded-xl transition-all"
            >
              {lang === 'ur' ? '→' : '←'} {t.appName}
            </button>
            <h3 className="text-base font-black uppercase tracking-wide">
              {adStep === 'select' ? t.postAd : (adType === 'sell' ? t.formTitleSell : t.formTitleBuy)}
            </h3>
            <button onClick={() => setShowPostAd(false)} className="text-xs bg-red-600 text-white px-3 py-2 rounded-xl font-bold">
              ✕
            </button>
          </div>

          {/* STEP 1: CHOOSE AD TYPE SCREEN (SELL VS DO YOU WANT TO BUY / DEMAND) */}
          {adStep === 'select' && (
            <div className="p-6 max-w-md mx-auto w-full flex flex-col justify-center space-y-6 mt-12 text-center">
              <h2 className="text-2xl font-black text-[#1a365d] mb-4">{t.chooseTypeTitle}</h2>
              
              {/* Option A: Sell Scrap Ad Button */}
              <button
                onClick={() => { setAdType('sell'); setAdStep('form'); }}
                className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center space-y-2 transform active:scale-95 group"
              >
                <span className="text-5xl bg-blue-50 p-3 rounded-full">💰</span>
                <span className="text-xl font-black text-blue-600 block">{t.optionSellTitle}</span>
                <span className="text-xs text-slate-400 font-medium leading-normal">{t.optionSellDesc}</span>
              </button>

              {/* Option B: Want to Buy / Demand Ad Button */}
              <button
                onClick={() => { setAdType('buy'); setAdStep('form'); }}
                className="bg-white border-2 border-green-600 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center space-y-2 transform active:scale-95 group"
              >
                <span className="text-5xl bg-green-50 p-3 rounded-full">📢</span>
                <span className="text-xl font-black text-green-600 block">{t.optionBuyTitle}</span>
                <span className="text-xs text-slate-400 font-medium leading-normal">{t.optionBuyDesc}</span>
              </button>
            </div>
          )}

          {/* STEP 2: ACTUAL AD DATA FORM FILL AREA */}
          {adStep === 'form' && (
            <div className="p-5 max-w-lg mx-auto w-full space-y-5" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              
              {/* Item Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.itemName}</label>
                <input type="text" placeholder={t.itemNamePlh} className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm font-medium" />
              </div>

              {/* Advanced Unit Selector Row */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.selectUnit}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['kg', 'ton', 'mund'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`py-3 text-xs font-black rounded-xl border transition-all ${
                        unit === u ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-md' : 'bg-white text-slate-600 border-slate-200 shadow-sm'
                      }`}
                    >
                      {u === 'kg' ? t.perKg : u === 'ton' ? t.perTon : t.perMund}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Rate Pricing Input Label */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {adType === 'sell' ? t.rateLabelSell : t.rateLabelBuy}
                </label>
                <input type="number" placeholder="Rs. 0" className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm font-bold text-slate-800" />
              </div>

              {/* Location Input Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.locLabel}</label>
                <input type="text" placeholder="e.g., Khiali, Gujranwala" className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm" />
              </div>

              {/* Picture Upload Container */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.picLabel}</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                  <span className="text-4xl mb-1">📸</span>
                  <span className="text-sm font-bold text-slate-700">{t.picLabel}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{t.picDesc}</span>
                </div>
              </div>

              {/* Scrap Description Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.detailsLabel}</label>
                <textarea rows={3} placeholder={t.detailsPlh} className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm resize-none"></textarea>
              </div>

              {/* FEATURED VIP GOLD SWITCH ROW */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex justify-between items-center gap-4 shadow-sm">
                <div className="max-w-[80%]">
                  <span className="text-sm font-black text-amber-900 block">⭐ {t.featureLabel}</span>
                  <span className="text-xs text-amber-700 font-medium leading-normal block mt-0.5">{t.featureDesc}</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 accent-amber-600 cursor-pointer transform scale-125"
                />
              </div>

              {/* NEW CLEAR GREEN SUBMIT BUTTON - FULLY VISIBLE & NO OVERLAPS */}
              <button 
                type="button"
                onClick={() => { alert("Ad Published Successfully on Scrap World!"); setShowPostAd(false); }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-sm py-4 rounded-xl shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all mt-6"
              >
                {adType === 'sell' ? t.submitBtnSell : t.submitBtnBuy}
              </button>

            </div>
          )}

        </div>
      )}

      {/* Sticky Bottom Navigation Bar (Stays safely under the overlay) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button className="flex flex-col items-center text-[#0066cc] font-bold text-xs w-14">
          <span className="text-xl">🏠</span>
          <span className="mt-0.5">{t.navHome}</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14">
          <span className="text-xl">📋</span>
          <span className="mt-0.5">{t.navAds}</span>
        </button>
        
        {/* Floating Center Button aligned with the new flow trigger */}
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button 
            onClick={() => { setShowPostAd(true); setAdStep('select'); }}
            className="w-14 h-14 bg-[#0066cc] hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 border-4 border-white transform active:scale-95 transition-all"
          >
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
