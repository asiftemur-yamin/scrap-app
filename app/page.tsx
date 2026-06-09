'use client';

import { useState, useEffect } from 'react';
import { Noto_Nastaliq_Urdu } from 'next/font/google';

// iPhone Style Urdu Font Setup
const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
});

// Languages, Local Price, LME Prices & Auth Dictionary
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
    lmeTitle: "LME Live International Rates",
    rateUnit: "Rs / Kg",
    lmeUnit: "USD / Ton",
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
    lmeMetals: {
      copper: "LME Copper",
      aluminum: "LME Aluminum",
      zinc: "LME Zinc",
      lead: "LME Lead"
    },
    originSectionTitle: "Select Scrap Type",
    localScrap: "Local Scrap",
    localScrapDesc: "Pakistani local market material",
    importedScrap: "Imported Scrap",
    importedScrapDesc: "International container imported stock",
    // Auth translations
    loginBtn: "Login / Register",
    logoutBtn: "Logout 👤",
    authTitleLogin: "Welcome Back",
    authTitleRegister: "Create Account",
    authTitleForgot: "Reset Password",
    emailLabel: "Email Address",
    passLabel: "Password",
    forgotLink: "Forgot Password?",
    googleLogin: "Continue with Google",
    appleLogin: "Continue with Apple",
    orDivider: "OR CONTINUE WITH EMAIL",
    noAccount: "Don't have an account? Register",
    haveAccount: "Already have an account? Login",
    backToLogin: "Back to Login",
    sendResetBtn: "Send Reset Link 📩",
    signIn: "Login",
    signUp: "Register Account",
    // Form Translations
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
    lmeTitle: "ایل ایم ای (LME) لائیو ریٹس",
    rateUnit: "روپے / کلو",
    lmeUnit: "ڈالر / ٹن",
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
    lmeMetals: {
      copper: "تانبا (Copper)",
      aluminum: "ایلومینیم",
      zinc: "زنک (Zinc)",
      lead: "لیڈ (Lead)"
    },
    originSectionTitle: "اسکریپ کی قسم منتخب کریں",
    localScrap: "لوکل اسکریپ",
    localScrapDesc: "پاکستانی مقامی مارکیٹ کا مال",
    importedScrap: "امپورٹڈ اسکریپ",
    importedScrapDesc: "باہر سے امپورٹڈ کنٹینر کا اسٹاک",
    // Auth translations
    loginBtn: "لاگ ان / رجسٹر",
    logoutBtn: "لاگ آؤٹ 👤",
    authTitleLogin: "خوش آمدید",
    authTitleRegister: "نیا اکاؤنٹ بنائیں",
    authTitleForgot: "پاس ورڈ ری سیٹ کریں",
    emailLabel: "ای میل ایڈریس",
    passLabel: "پاس ورڈ",
    forgotLink: "پاس ورڈ بھول گئے؟",
    googleLogin: "گوگل (Gmail) کے ساتھ لاگ ان کریں",
    appleLogin: "ایپل (Apple ID) کے ساتھ لاگ ان کریں",
    orDivider: "یا ای میل کے ذریعے لاگ ان کریں",
    noAccount: "اکاؤنٹ نہیں ہے؟ رجسٹریشن کریں",
    haveAccount: "پہلے سے اکاؤنٹ ہے؟ لاگ ان کریں",
    backToLogin: "لاگ ان پیج پر واپس جائیں",
    sendResetBtn: "ری سیٹ لنک بھیجیں 📩",
    signIn: "لاگ ان کریں",
    signUp: "نیا اکاؤنٹ بنائیں",
    // Form Translations
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

const lmeData = [
  { id: "cop", key: "copper", icon: "🔴", price: "9,645", change: "+1.4%", up: true },
  { id: "alu", key: "aluminum", icon: "⚪", price: "2,520", change: "-0.3%", up: false },
  { id: "zn", key: "zinc", icon: "⛓️", price: "2,890", change: "+0.8%", up: true },
  { id: "pb", key: "lead", icon: "🔋", price: "2,140", change: "+0.2%", up: true }
];

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
  
  // Auth Smart States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  // Post Ad States
  const [showPostAd, setShowPostAd] = useState(false);
  const [adStep, setAdStep] = useState<'select' | 'form'>('select');
  const [adType, setAdType] = useState<'sell' | 'buy'>('sell');
  
  // Form Control States
  const [unit, setUnit] = useState('kg');
  const [scrapOrigin, setScrapOrigin] = useState('local');
  const [isFeatured, setIsFeatured] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePostAdTrigger = () => {
    if (!isLoggedIn) {
      setAuthView('login');
      setShowAuth(true);
    } else {
      setAdStep('select');
      setShowPostAd(true);
    }
  };

  const handleBackNavigation = () => {
    if (adStep === 'form') {
      setAdStep('select');
    } else {
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
    // DYNAMIC FONT SWITCHING: Applying iPhone style Noto Urdu class globally when language is 'ur'
    <div className={`min-h-screen bg-[#f2f6fa] text-slate-800 pb-24 ${lang === 'ur' ? `${notoUrdu.className} text-right` : 'font-sans text-left'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      
      {/* Top Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="text-2xl font-black tracking-wider text-white">{t.appName}</div>
          
          <div className="flex items-center space-x-2 gap-2">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setIsLoggedIn(false);
                } else {
                  setAuthView('login');
                  setShowAuth(true);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm transition-all active:scale-95"
            >
              {isLoggedIn ? t.logoutBtn : t.loginBtn}
            </button>

            <button 
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30 transition-all"
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>
          </div>
        </div>

        {/* Top Pills */}
        <div className="flex overflow-x-auto pb-3 scrollbar-none gap-2">
          <button className="bg-[#0066cc] text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm">{t.sellScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.buyScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.rates}</button>
          <button 
            onClick={handlePostAdTrigger}
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

      {/* Main Body */}
      <main className="px-4 mt-6">
        
        {/* Local vs Imported Origin */}
        <div className="mb-3">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.originSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border-2 border-blue-500/20 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div>
              <span className="font-black text-sm text-[#1a365d] block">{t.localScrap}</span>
              <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{t.localScrapDesc}</span>
            </div>
            <span className="text-3xl">🇵🇰</span>
          </div>
          <div className="bg-white border-2 border-green-600/20 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div>
              <span className="font-black text-sm text-[#1a365d] block">{t.importedScrap}</span>
              <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{t.importedScrapDesc}</span>
            </div>
            <span className="text-3xl">🚢</span>
          </div>
        </div>

        {/* Categories Grid */}
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

        {/* LME Ticker */}
        <div className="mb-3 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.lmeTitle}</h2>
            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-bold animate-pulse">LIVE</span>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-3 gap-3 scrollbar-none snap-x">
          {lmeData.map((metal) => (
            <div key={metal.id} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 min-w-[140px] shadow-md snap-center flex flex-col justify-between border border-slate-700/50">
              <div className="flex justify-between items-center gap-2">
                <span className="text-xl bg-white/10 p-1 rounded-lg">{metal.icon}</span>
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-md ${metal.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {metal.change}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-[11px] font-bold text-slate-400 block truncate">{(t as any).lmeMetals[metal.key]}</span>
                <span className="text-lg font-black text-white block mt-0.5">${metal.price}</span>
                <span className="text-[9px] text-slate-500 font-bold tracking-tight uppercase block">{t.lmeUnit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cities */}
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
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 shadow-sm'
              }`}
            >
              {t.cities[cityName]}
            </button>
          ))}
        </div>

        {/* Price List */}
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

      {/* FULL SCREEN MODAL: AUTHENTICATION CONTAINER */}
      {showAuth && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[110] flex flex-col justify-center p-6 overflow-y-auto">
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 space-y-6 relative">
            
            <button 
              onClick={() => setShowAuth(false)} 
              className="absolute top-4 right-4 text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-500 px-3 py-1.5 rounded-full"
            >
              ✕
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-black text-[#1a365d]">
                {authView === 'login' ? t.authTitleLogin : authView === 'register' ? t.authTitleRegister : t.authTitleForgot}
              </h2>
            </div>

            {authView !== 'forgot' && (
              <div className="space-y-2">
                <button 
                  onClick={() => { setIsLoggedIn(true); setShowAuth(false); if(showPostAd) setAdStep('select'); }}
                  className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span className="text-base">🔴</span> {t.googleLogin}
                </button>
                <button 
                  onClick={() => { setIsLoggedIn(true); setShowAuth(false); if(showPostAd) setAdStep('select'); }}
                  className="w-full bg-black hover:bg-slate-900 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span className="text-base">🍏</span> {t.appleLogin}
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-slate-200 after:flex-1 after:border-t after:border-slate-200">
                  <p className="mx-4 text-[10px] text-slate-400 font-extrabold tracking-wider">{t.orDivider}</p>
                </div>
              </div>
            )}

            <div className="space-y-4 text-left" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.emailLabel}</label>
                <input type="email" placeholder="name@email.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc]" />
              </div>

              {authView !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{t.passLabel}</label>
                    {authView === 'login' && (
                      <button onClick={() => setAuthView('forgot')} className="text-xs font-bold text-[#0066cc] hover:underline">
                        {t.forgotLink}
                      </button>
                    )}
                  </div>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc]" />
                </div>
              )}

              <button
                onClick={() => {
                  if (authView === 'forgot') {
                    alert("Password reset link sent successfully!");
                    setAuthView('login');
                  } else {
                    setIsLoggedIn(true);
                    setShowAuth(false);
                    setShowPostAd(true);
                    setAdStep('select');
                  }
                }}
                className="w-full bg-[#0066cc] hover:bg-blue-600 text-white font-black text-sm py-3.5 rounded-xl shadow-md transition-all mt-2"
              >
                {authView === 'login' ? t.signIn : authView === 'register' ? t.signUp : t.sendResetBtn}
              </button>
            </div>

            <div className="text-center text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
              {authView === 'login' && (
                <button onClick={() => setAuthView('register')} className="text-[#0066cc] font-bold hover:underline">{t.noAccount}</button>
              )}
              {authView === 'register' && (
                <button onClick={() => setAuthView('login')} className="text-[#0066cc] font-bold hover:underline">{t.haveAccount}</button>
              )}
              {authView === 'forgot' && (
                <button onClick={() => setAuthView('login')} className="text-[#0066cc] font-bold hover:underline">← {t.backToLogin}</button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* FULL-SCREEN OVERLAY FOR POST AD */}
      {showPostAd && isLoggedIn && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[100] flex flex-col overflow-y-auto pb-12">
          
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

          {/* STEP 1: CHOOSE AD TYPE */}
          {adStep === 'select' && (
            <div className="p-6 max-w-md mx-auto w-full flex flex-col justify-center space-y-6 mt-12 text-center">
              <h2 className="text-2xl font-black text-[#1a365d] mb-4">{t.chooseTypeTitle}</h2>
              
              <button
                onClick={() => { setAdType('sell'); setAdStep('form'); }}
                className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center space-y-2 transform active:scale-95"
              >
                <span className="text-5xl bg-blue-50 p-3 rounded-full">💰</span>
                <span className="text-xl font-black text-blue-600 block">{t.optionSellTitle}</span>
                <span className="text-xs text-slate-400 font-medium leading-normal">{t.optionSellDesc}</span>
              </button>

              <button
                onClick={() => { setAdType('buy'); setAdStep('form'); }}
                className="bg-white border-2 border-green-600 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center space-y-2 transform active:scale-95"
              >
                <span className="text-5xl bg-green-50 p-3 rounded-full">📢</span>
                <span className="text-xl font-black text-green-600 block">{t.optionBuyTitle}</span>
                <span className="text-xs text-slate-400 font-medium leading-normal">{t.optionBuyDesc}</span>
              </button>
            </div>
          )}

          {/* STEP 2: AD FORM AREA */}
          {adStep === 'form' && (
            <div className="p-5 max-w-lg mx-auto w-full space-y-5" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.itemName}</label>
                <input type="text" placeholder={t.itemNamePlh} className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm font-medium" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.originSectionTitle}</label>
                <div className="grid grid-cols-2 gap-2">
                  {['local', 'imported'].map((originType) => (
                    <button
                      key={originType}
                      type="button"
                      onClick={() => setScrapOrigin(originType)}
                      className={`py-3 text-xs font-black rounded-xl border transition-all ${
                        scrapOrigin === originType ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-md' : 'bg-white text-slate-600 border-slate-200 shadow-sm'
                      }`}
                    >
                      {originType === 'local' ? `🇵🇰 ${t.localScrap}` : `🚢 ${t.importedScrap}`}
                    </button>
                  ))}
                </div>
              </div>

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

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {adType === 'sell' ? t.rateLabelSell : t.rateLabelBuy}
                </label>
                <input type="number" placeholder="Rs. 0" className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm font-bold text-slate-800" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.locLabel}</label>
                <input type="text" placeholder="e.g., Khiali, Gujranwala" className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.picLabel}</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                  <span className="text-4xl mb-1">📸</span>
                  <span className="text-sm font-bold text-slate-700">{t.picLabel}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{t.picDesc}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.detailsLabel}</label>
                <textarea rows={3} placeholder={t.detailsPlh} className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] shadow-sm resize-none"></textarea>
              </div>

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

      {/* Sticky Bottom Navigation Bar */}
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
          <button 
            onClick={handlePostAdTrigger}
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
