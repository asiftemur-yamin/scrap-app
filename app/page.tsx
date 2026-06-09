'use client';

import { useState, useEffect } from 'react';

// 1. EXTENDED ADS DATABASE (With Sub-Categories & Chaaloo Maal Breakdown)
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", mainCat: "iron", subCat: "scrap", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", mainCat: "copper", subCat: "scrap", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire scrap. Clean shining stock, ready for delivery." },
  { id: 3, titleEn: "Chaaloo Industrial Air Compressor 200L", titleUr: "چالو انڈسٹریل ائیر کمپریسر 200L", city: "gujranwala", mainCat: "chaaloo", subCat: "compressor", price: "45,000", unit: "piece", weight: "1 unit", isFeatured: true, origin: "local", icon: "💨", desc: "Perfect working condition 3-phase piston air compressor, suitable for recycling plants or workshops." },
  { id: 4, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", mainCat: "aluminum", subCat: "scrap", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", desc: "Compressed aluminum drink beverage can bundles. Total weight 35 munds loaded in Lahore Badami Bagh." },
  { id: 5, titleEn: "Useable Industrial Electric Motor 5HP (Chaaloo)", titleUr: "صنعتی الیکٹرک موٹر 5HP (چالو مال)", city: "gujranwala", mainCat: "chaaloo", subCat: "motor", price: "16,500", unit: "piece", weight: "2 units", isFeatured: true, origin: "local", icon: "⚙️", desc: "Working condition 5HP copper winding motors removed from textile plant clearance." },
  { id: 6, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", mainCat: "plastic", subCat: "scrap", price: "98", unit: "kg", weight: "3 Ton", isFeatured: false, origin: "local", icon: "🛢️", desc: "Blue and white HDPE industrial crushed plastic flakes ready for recycling plants injection molding." },
  { id: 7, titleEn: "Chaaloo Diesel Generator 10 KVA Stanley", titleUr: "چالو ڈیزل جنریٹر 10 KVA", city: "lahore", mainCat: "chaaloo", subCat: "generator", price: "185,000", unit: "piece", weight: "1 unit", isFeatured: false, origin: "imported", icon: "⚡", desc: "Imported soundproof useable diesel generator. Self-start operational condition." },
  { id: 8, titleEn: "Heavy Duty Iron Gate & Grills (Useable)", titleUr: "لوہے کا بھاری گیٹ اور گرل (استعمال کے قابل)", city: "lahore", mainCat: "iron", subCat: "useable", price: "145", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "local", icon: "🚪", desc: "Excellent condition useable scrap iron gate, no rusting, ready for direct re-installation." }
];

const initialVerifiedStores: any[] = [
  { 
    id: 501, 
    nameEn: "R-H-A-F Recycling & Smelting Co.", 
    nameUr: "آر ایچ اے ایف ریسائیکلنگ اینڈ اسمیلٹنگ فیکٹری", 
    city: "gujranwala", 
    verified: true, 
    icon: "🏭", 
    badge: "Premium Smelter", 
    catalog: [
      { item: "HMS 1 Industrial Iron", buy: "124", sell: "128", cycle: "Daily Stock Availability" },
      { item: "Pure Copper Stripped Wire", buy: "1,850", sell: "1,890", cycle: "Weekly Bulk Lot" },
      { item: "Useable Motors / Machinery", buy: "14,500", sell: "16,000", cycle: "As Per Stock Lot" }
    ]
  },
  { 
    id: 502, 
    nameEn: "Lahore Eco-Plastic Shredders", 
    nameUr: "لاہور ایکو پلاسٹک شریڈرز پلانٹ", 
    city: "lahore", 
    verified: true, 
    icon: "🏗️", 
    badge: "Bulk Crusher", 
    catalog: [
      { item: "HDPE Crushed Flakes Blue", buy: "95", sell: "99", cycle: "Daily Production" }
    ]
  }
];

const translations: any = {
  en: {
    appName: "SCRAP WORLD", sellScrap: "Sell Scrap", buyScrap: "Buy Scrap", rates: "Live Rates", postAd: "Post Ad",
    searchPlaceholder: "Search scrap iron, plastic, copper...", browseTitle: "Browse Scrap Categories",
    priceListTitle: "Live Market Price List", selectCityTitle: "Select City for Rates", lmeTitle: "LME Live International Rates",
    rateUnit: "Rs / Kg", lmeUnit: "USD / Ton", cat1: "Iron (Loha)", cat2: "Plastic", cat3: "Copper (Tamba)",
    cat4: "Aluminum", cat5: "Batteries", cat6: "Solar Panels", cat7: "Chaaloo Maal", cat8: "Electronic",
    navHome: "Home", navAds: "My Ads", navSell: "Sell Now", navChat: "Chat Inbox", navMore: "More",
    cities: { gujranwala: "Gujranwala", lahore: "Lahore", karachi: "Karachi", multan: "Multan" },
    lmeMetals: { copper: "LME Copper", aluminum: "LME Aluminum", zinc: "LME Zinc", lead: "LME Lead" },
    originSectionTitle: "Select Scrap Type", localScrap: "Local Scrap", localScrapDesc: "Pakistani local market material",
    importedScrap: "Imported Scrap", importedScrapDesc: "International container imported stock",
    feedTitle: "Scrap Marketplace Feed", localBadge: "Local (0-15 km)", nearbyBadge: "Nearby (15-80 km)", regionalBadge: "Regional (>80 km)",
    loadingMoreText: "Loading more matching ads automatically...", callSeller: "Direct Call 📞", whatsappSeller: "WhatsApp 💬", appChatSeller: "App Chat 💬",
    postedIn: "Posted in", weightLabel: "Total Weight", typeLabel: "Stock Type", loginBtn: "Login / Register", logoutBtn: "Logout 👤",
    inboxTitle: "Your App Messages", chatPlaceholder: "Type your scrap offer here...", sendChatBtn: "Send",
    b2bTitle: "Verified Factories & Commercial Yards 👑", verifyActionBtn: "Register Factory Store ⭐",
    buyPriceLabel: "Buying Rate", sellPriceLabel: "Selling Rate", catalogTitle: "Routine Catalog & Stock Availability",
    portalTitle: "Factory Verification Registration", portalDesc: "Pay a nominal security verification fee to post your daily bulk routine catalog rates.",
    companyNameLabel: "Official Factory / Business Name", storeTypeLabel: "Select Store/Plant Type", payFeeBtn: "Pay Verification Fee & Activate Store 💳",
    authTitleLogin: "Welcome Back", authTitleRegister: "Create Account", authTitleForgot: "Reset Password",
    googleLogin: "Continue with Google", appleLogin: "Continue with Apple", orDivider: "OR WITH EMAIL",
    emailLabel: "Email Address", passLabel: "Password", forgotLink: "Forgot Password?", signIn: "Sign In", signUp: "Sign Up", sendResetBtn: "Send Reset Link",
    chaalooTitle: "Chaaloo Maal Sub-Categories ⚡", itemTypeLabel: "Select Specific Sub-Category",
    subCats: { all: "Show All", compressor: "Chaaloo Compressor 💨", motor: "Chaaloo Motor ⚙️", generator: "Chaaloo Generator ⚡", other: "Other Useable / Items 📦" }
  },
  ur: {
    appName: "اسکریپ ورلڈ", sellScrap: "اسکریپ بیچیں", buyScrap: "اسکریپ خریدیں", rates: "لائیو ریٹس", postAd: "اشتہار لگائیں",
    searchPlaceholder: "لوہا، پلاسٹک، تانبا تلاش کریں...", browseTitle: "اسکریپ کیٹیگریز تلاش کریں",
    priceListTitle: "مارکیٹ کی لائیو ریٹ لسٹ", selectCityTitle: "شہر کا انتخاب کریں", lmeTitle: "ایل ایم ای (LME) لائیو ریٹس",
    rateUnit: "روپے / کلو", lmeUnit: "ڈالر / ٹن", cat1: "لوہا (Iron)", cat2: "پلاسٹک (Plastic)", cat3: "تانبا (Copper)",
    cat4: "ایلومینیم", cat5: "بیٹریاں", cat6: "سولر پینل", cat7: "چالو مال (Useable)", cat8: "الیکٹرانک",
    navHome: "ہوم", navAds: "اشتہارات", navSell: "ابھی بیچیں", navChat: "چیٹ ان باکس", navMore: "مزید",
    cities: { gujranwala: "گوجرانوالہ", lahore: "لاہور", karachi: "کراچی", multan: "ملتان" },
    lmeMetals: { copper: "تانبا (Copper)", aluminum: "ایلومینیم", zinc: "زنک (Zinc)", lead: "لیڈ (Lead)" },
    originSectionTitle: "اسکریپ کی قسم منتخب کریں", localScrap: "لوکل اسکریپ", localScrapDesc: "پاکستانی مقامی مارکیٹ کا مال",
    importedScrap: "امپورٹڈ اسکریپ", importedScrapDesc: "باہر سے امپورٹڈ کنٹینر کا اسٹاک",
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)", localBadge: "مقامی اشتہار (0-15 کلومیٹر)", nearbyBadge: "قریبی شہر (15-80 کلومیٹر)", regionalBadge: "دوسرا ریجن (>80 کلومیٹر)",
    loadingMoreText: "مزید اشتہارات خود بخود لوڈ ہو رہے ہیں...",  callSeller: "فوری فون کال 📞", whatsappSeller: "واٹس ایپ 💬", appChatSeller: "ایپ چیٹ 💬",
    postedIn: "لوکیشن", weightLabel: "کل وزن", typeLabel: "مال کی قسم", loginBtn: "لاگ ان / رجسٹر", logoutBtn: "لاگ آؤٹ 👤",
    inboxTitle: "آپ کے ان ایپ پیغامات", chatPlaceholder: "یہاں اپنا پیغام لکھیں...", sendChatBtn: "بھیجیں",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور بڑے کمرشل یارڈز 👑", verifyActionBtn: "فیکٹری اسٹور رجسٹر کریں ⭐",
    buyPriceLabel: "خرید ریٹ", sellPriceLabel: "بیچ ریٹ", catalogTitle: "روزمرہ کا کیٹلاگ اور مال کی دستیابی",
    portalTitle: "فیکٹری ویریفیکیشن رجسٹریشن پورٹل", portalDesc: "روزانہ اور ماہانہ ہول سیل ریٹ لسٹ لگانے کیلئے تصدیقی فیس جمع کروائیں۔",
    companyNameLabel: "فیکٹری یا کاروباری ادارے کا نام", storeTypeLabel: "ادارے کی قسم منتخب کریں", payFeeBtn: "ویریفیکیشن فیس ادا کر کے اسٹور چلائیں 💳",
    authTitleLogin: "لاگ ان کریں", authTitleRegister: "نیا اکاؤنٹ بنائیں", authTitleForgot: "پاس ورڈ ری سیٹ",
    googleLogin: "گوگل کے ساتھ لاگ ان", appleLogin: "ایپل کے ساتھ لاگ ان", orDivider: "یا ای میل کے ذریعے",
    emailLabel: "ای میل ایڈریس", passLabel: "پاس ورڈ", forgotLink: "پاس ورڈ بھول گئے؟", signIn: "سائن ان کریں", signUp: "رجسٹر کریں", sendResetBtn: "لنک بھیجیں",
    chaalooTitle: "چالو مال کی کیٹیگریز ⚡", itemTypeLabel: "مخصوص آئٹم منتخب کریں",
    subCats: { all: "سب دکھائیں", compressor: "چالو کمپریسر 💨", motor: "چالو موٹر ⚙️", generator: "چالو جنریٹر ⚡", other: "دیگر استعمال کا سامان / Other 📦" }
  }
};

const lmeData = [
  { id: "cop", key: "copper", icon: "🔌", price: 9645, change: "+1.4%", up: true },
  { id: "alu", key: "aluminum", icon: "⚪", price: 2520, change: "-0.3%", up: false },
  { id: "zn", key: "zinc", icon: "⛓️", price: 2890, change: "+0.8%", up: true },
  { id: "pb", key: "lead", icon: "🔋", price: 2140, change: "+0.2%", up: true }
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
    { id: "plastic", nameKey: "cat2", icon: "105" }
  ],
  multan: [
    { id: "iron", nameKey: "cat1", icon: "🔩", price: "118" },
    { id: "copper", nameKey: "cat3", icon: "🔌", price: "1,820" },
    { id: "aluminum", nameKey: "cat4", icon: "🥫", price: "440" },
    { id: "plastic", nameKey: "cat2", icon: "90" }
  ]
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [lang, setLang] = useState<'en' | 'ur'>('ur');
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  
  // Custom Filters & List Navigation For Chaaloo Maal
  const [activeSubCatFilter, setActiveSubCatFilter] = useState<string>('all');
  const [showChaalooModal, setShowChaalooModal] = useState(false);

  // Auth Controls
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  // Ad Forms & Posting Management
  const [showPostAd, setShowPostAd] = useState(false);
  const [adStep, setAdStep] = useState<'select' | 'form'>('select');
  const [adType, setAdType] = useState<'sell' | 'buy'>('sell');
  const [unit, setUnit] = useState('kg');
  const [scrapOrigin, setScrapOrigin] = useState('local');
  const [isFeatured, setIsFeatured] = useState(false);
  const [formMainCat, setFormMainCat] = useState('iron');
  const [formSubCat, setFormSubCat] = useState('scrap');

  // Infinite Scroll & Detail Overlay
  const [visibleAdsCount, setVisibleAdsCount] = useState(4);
  const [isScrollingLoading, setIsScrollingLoading] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any | null>(null);

  // Chat Messenger States
  const [showInbox, setShowInbox] = useState(false);
  const [activeChatSession, setActiveChatSession] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, text: "Assalam o Alaikum, bulk clearance lot ka delivery time kya hai?", isMe: false }
  ]);
  const [typedMessage, setTypedMessage] = useState('');

  // B2B Specific Features States
  const [lmeRates, setLmeRates] = useState(lmeData);
  const [showVerificationPortal, setShowVerificationPortal] = useState(false);
  const [selectedFactoryCatalog, setSelectedFactoryCatalog] = useState<any | null>(null);

  const t: any = translations[lang];

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    
    const timer = setTimeout(() => { setShowSplash(false); }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // LME LIVE FLUCTUATION SIMULATOR TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      setLmeRates(prev => prev.map(m => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const finalP = Math.max(1000, m.price + delta);
        return { ...m, price: finalP, up: delta >= 0, change: `${delta >= 0 ? '+' : ''}${(Math.random() * 1.5).toFixed(1)}%` };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // AUTOMATIC INFINITE SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160) {
        if (visibleAdsCount < initialAdsData.length && !isScrollingLoading) {
          setIsScrollingLoading(true);
          setTimeout(() => { setVisibleAdsCount(prev => prev + 2); setIsScrollingLoading(false); }, 1000);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleAdsCount, isScrollingLoading]);

  const getSortedAdsByRadius = (): any[] => {
    let filtered = initialAdsData;
    if (activeSubCatFilter !== 'all') {
      filtered = initialAdsData.filter(ad => ad.mainCat === 'chaaloo' && ad.subCat === activeSubCatFilter);
    }
    
    const localAds = filtered.filter(ad => ad.city === selectedCity);
    let order: string[] = [];
    if (selectedCity === 'gujranwala') order = ['lahore', 'multan', 'karachi'];
    else if (selectedCity === 'lahore') order = ['gujranwala', 'multan', 'karachi'];
    else if (selectedCity === 'multan') order = ['lahore', 'gujranwala', 'karachi'];
    else if (selectedCity === 'karachi') order = ['multan', 'lahore', 'gujranwala'];

    const near = filtered.filter(ad => ad.city === order[0]);
    const far = filtered.filter(ad => ad.city !== selectedCity && ad.city !== order[0]);

    return [
      ...localAds.map(a => ({ ...a, radiusLevel: 'local' })),
      ...near.map(a => ({ ...a, radiusLevel: 'nearby' })),
      ...far.map(a => ({ ...a, radiusLevel: 'regional' }))
    ];
  };

  const handlePostAdTrigger = () => {
    if (!isLoggedIn) { 
      setAuthView('login'); 
      setShowAuth(true); 
    } else { 
      setAdStep('form'); 
      setShowPostAd(true); 
    }
  };

  const sortedFeedAds = getSortedAdsByRadius().slice(0, visibleAdsCount);

  const iphoneStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    textAlign: (lang === 'ur' ? 'right' : 'left') as any
  };

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24 relative" style={iphoneStyle} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {/* 👑 FULL SCREEN SPLASH SCREEN WITH LOGO ANIMATION */}
      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-4">
            <div className="text-7xl animate-bounce tracking-widest">🏭♻️</div>
            <h1 className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Pakistan's B2B Scrap & Industrial Directory</p>
            <div className="w-16 h-1 w-full bg-slate-700 rounded-full mx-auto overflow-hidden mt-4">
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-1/2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Top Main Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1.5">
          <span className="text-[11px] font-black tracking-wide bg-white/10 text-white px-3 py-1 rounded-full">
            📅 {currentDate || "09 Jun 2026"}
          </span>
          <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full font-black tracking-wider animate-pulse">
            ● LIVE MANDI
          </span>
        </div>

        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="text-2xl font-black tracking-wider">{t.appName}</div>
          <div className="flex items-center space-x-2 gap-2">
            <button onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else { setAuthView('login'); setShowAuth(true); } }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm">{isLoggedIn ? t.logoutBtn : t.loginBtn}</button>
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30">{lang === 'en' ? 'اردو' : 'English'}</button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-3 scrollbar-none gap-2">
          <button className="bg-[#0066cc] text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm">{t.sellScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.buyScrap}</button>
          <button className="bg-white text-[#1a365d] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border border-slate-200">{t.rates}</button>
          <button onClick={handlePostAdTrigger} className="bg-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-full whitespace-nowrap shadow-md">📢 {t.postAd}</button>
        </div>

        <div className="mt-2 bg-white rounded-lg p-3 flex items-center shadow-inner text-slate-700">
          <span className="text-slate-400 mx-2">🔍</span>
          <input type="text" placeholder={t.searchPlaceholder} className="w-full bg-transparent outline-none text-sm placeholder-slate-400 font-medium" />
        </div>
      </header>

      {/* Main Body Area */}
      <main className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border-2 border-blue-500/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div><span className="font-black text-sm text-[#1a365d] block">{t.localScrap}</span><span className="text-[10px] text-slate-400 font-bold block mt-0.5">{t.localScrapDesc}</span></div>
            <span className="text-3xl">🇵🇰</span>
          </div>
          <div className="bg-white border-2 border-green-600/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div><span className="font-black text-sm text-[#1a365d] block">{t.importedScrap}</span><span className="text-[10px] text-slate-400 font-bold block mt-0.5">{t.importedScrapDesc}</span></div>
            <span className="text-3xl">🚢</span>
          </div>
        </div>

        {/* Categories Matrix Grid */}
        <div className="mb-4"><h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.browseTitle}</h2></div>
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {[
            { id: 'cat1', label: t.cat1, icon: "🔩", trigger: null },
            { id: 'cat2', label: t.cat2, icon: "🛢️", trigger: null },
            { id: 'cat3', label: t.cat3, icon: "🔌", trigger: null },
            { id: 'cat4', label: t.cat4, icon: "🥫", trigger: null },
            { id: 'cat5', label: t.cat5, icon: "🔋", trigger: null },
            { id: 'cat6', label: t.cat6, icon: "☀️", trigger: null },
            { id: 'cat7', label: t.cat7, icon: "⚡", trigger: () => setShowChaalooModal(true) }, 
            { id: 'cat8', label: t.cat8, icon: "💻", trigger: null }
          ].map((item, idx) => (
            <div key={idx} onClick={() => { if(item.trigger) item.trigger(); }} className={`bg-white border rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm aspect-square cursor-pointer transition-transform active:scale-95 ${item.trigger ? 'border-amber-400 bg-amber-50/30' : 'border-slate-100'}`}>
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-[11px] font-bold text-slate-600 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CHAALOO MAAL POPUP */}
        {showChaalooModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-black text-base text-[#1a365d]">{t.chaalooTitle}</h3>
                <button onClick={() => setShowChaalooModal(false)} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">✕</button>
              </div>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {Object.keys(t.subCats).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setActiveSubCatFilter(key); setShowChaalooModal(false); }}
                    className={`w-full text-left p-3.5 rounded-xl border font-bold text-xs flex justify-between items-center ${activeSubCatFilter === key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                  >
                    <span>{t.subCats[key]}</span>
                    {activeSubCatFilter === key && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEED MARKETPLACE */}
        <div className="mb-4 mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center justify-between">
            <span>📋 {t.feedTitle} {activeSubCatFilter !== 'all' && `(${t.subCats[activeSubCatFilter]})`}</span>
            {activeSubCatFilter !== 'all' && <button onClick={() => setActiveSubCatFilter('all')} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">Reset ✕</button>}
          </h2>
        </div>

        <div className="space-y-3.5 mb-6">
          {sortedFeedAds.map((ad) => (
            <div key={ad.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 flex justify-between items-center shadow-sm">
              <div className="flex items-start space-x-3.5 gap-3 max-w-[70%]">
                <div className="w-16 h-16 bg-slate-100 rounded-xl border flex items-center justify-center text-3xl shrink-0">{ad.icon}</div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 leading-snug line-clamp-2">{lang === 'en' ? ad.titleEn : ad.titleUr}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md inline-block mt-1">📦 {ad.weight}</span>
                </div>
              </div>
              <div className="text-right shrink-0"><span className="text-lg font-black text-green-600 block">Rs.{ad.price}</span></div>
            </div>
          ))}
        </div>
      </main>

      {/* 🔐 FULL SCREEN AUTH OVERLAY (Fixed execution flow) */}
      {showAuth && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[300] flex flex-col justify-center p-4">
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl border p-6 space-y-6 relative">
            <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 text-xs font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">✕</button>
            <div className="text-center"><h2 className="text-xl font-black text-[#1a365d]">{t.authTitleLogin}</h2></div>
            <div className="space-y-4 text-left" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div><label className="block text-xs font-black text-slate-700 mb-1">{t.emailLabel}</label><input type="email" placeholder="name@email.com" className="w-full bg-slate-50 border rounded-xl p-3.5 text-xs outline-none focus:border-[#0066cc]" /></div>
              <div><label className="block text-xs font-black text-slate-700 mb-1">{t.passLabel}</label><input type="password" placeholder="••••••••" className="w-full bg-slate-50 border rounded-xl p-3.5 text-xs outline-none focus:border-[#0066cc]" /></div>
              <button onClick={() => { setIsLoggedIn(true); setShowAuth(false); setShowPostAd(true); setFormMainCat('chaaloo'); }} className="w-full bg-[#0066cc] text-white font-black text-sm py-3.5 rounded-xl shadow-md mt-2">Sign In & Post Ad 🔑</button>
            </div>
          </div>
        </div>
      )}

      {/* 📢 100% VISIBLE POST AD FORM OVERLAY */}
      {showPostAd && isLoggedIn && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[400] flex flex-col overflow-y-auto pb-12">
          <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex items-center justify-between shadow-md">
            <button onClick={() => setShowPostAd(false)} className="text-white bg-white/10 font-bold px-3 py-2 rounded-xl">← Back</button>
            <h3 className="text-sm font-black uppercase">Post Advertisement</h3>
            <button onClick={() => setShowPostAd(false)} className="text-xs bg-red-600 text-white px-3 py-2 rounded-xl font-bold">✕</button>
          </div>
          
          <div className="p-5 max-w-lg mx-auto w-full space-y-5" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Product Title</label>
              <input type="text" placeholder="e.g., Useable Copper Compressor 2Ton" className="w-full bg-white border rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc]" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Main Category</label>
              <select 
                value={formMainCat} 
                onChange={(e) => { setFormMainCat(e.target.value); if(e.target.value !== 'chaaloo') setFormSubCat('scrap'); }}
                className="w-full bg-white border rounded-xl p-3.5 text-sm outline-none focus:border-[#0066cc] font-bold text-slate-700"
              >
                <option value="iron">{t.cat1}</option>
                <option value="plastic">{t.cat2}</option>
                <option value="copper">{t.cat3}</option>
                <option value="chaaloo">{t.cat7}</option>
              </select>
            </div>

            {formMainCat === 'chaaloo' && (
              <div className="animate-fade-in">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.itemTypeLabel}</label>
                <select 
                  value={formSubCat} 
                  onChange={(e) => setFormSubCat(e.target.value)}
                  className="w-full bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-sm outline-none focus:border-amber-500 font-bold text-slate-800"
                >
                  <option value="compressor">Chaaloo Compressor 💨</option>
                  <option value="motor">Chaaloo Motor ⚙️</option>
                  <option value="generator">Chaaloo Generator ⚡</option>
                  <option value="other">Other Useable Items / Miscellaneous 📦</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Weight</label><input type="text" placeholder="e.g., 500 Kg" className="w-full bg-white border rounded-xl p-3.5 text-sm outline-none" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Rate Demanded</label><input type="number" placeholder="Rs." className="w-full bg-white border rounded-xl p-3.5 text-sm outline-none font-bold text-green-600" /></div>
            </div>

            <button type="button" onClick={() => { alert("Ad Published Successfully!"); setShowPostAd(false); }} className="w-full bg-green-600 text-white font-black text-sm py-4 rounded-xl shadow-lg mt-6">Publish Advertisement 📢</button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button onClick={() => { setShowInbox(false); setShowPostAd(false); }} className="flex flex-col items-center text-[#0066cc] font-bold text-xs w-14"><span className="text-xl">🏠</span><span className="mt-0.5">{t.navHome}</span></button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14"><span className="text-xl">📋</span><span className="mt-0.5">{t.navAds}</span></button>
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button onClick={handlePostAdTrigger} className="w-14 h-14 bg-[#0066cc] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transform active:scale-95 transition-all"><span className="text-3xl font-light">+</span></button>
          <span className="text-[11px] font-bold text-[#0066cc] mt-1">{t.navSell}</span>
        </div>
        <button onClick={() => { setShowInbox(true); }} className="flex flex-col items-center text-slate-400 font-medium text-xs w-14"><span className="text-xl">💬</span><span className="mt-0.5">{t.navChat}</span></button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14"><span className="text-xl">⣿</span><span className="mt-0.5">{t.navMore}</span></button>
      </nav>

    </div>
  );
}
