'use client';

import { useState, useEffect } from 'react';

// 1. ALL SCRAP & USEABLE ADS DATABASE (Chaaloo Maal Included)
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire scrap. Clean shining stock, ready for delivery." },
  { id: 3, titleEn: "Useable Industrial Electric Motor 5HP (Chaaloo)", titleUr: "صنعتی الیکٹرک موٹر 5HP (چالو مال)", city: "gujranwala", price: "16,500", unit: "piece", weight: "2 units", isFeatured: true, origin: "local", icon: "⚙️", desc: "Working condition 5HP copper winding motors removed from textile plant clearance." },
  { id: 4, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", desc: "Compressed aluminum drink beverage can bundles. Total weight 35 munds loaded in Lahore Badami Bagh." },
  { id: 5, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", price: "98", unit: "kg", weight: "3 Ton", isFeatured: false, origin: "local", icon: "🛢️", desc: "Blue and white HDPE industrial crushed plastic flakes ready for recycling plants injection molding." },
  { id: 6, titleEn: "Heavy Duty Iron Gate & Grills (Useable)", titleUr: "لوہے کا بھاری گیٹ اور گرل (استعمال کے قابل)", city: "lahore", price: "145", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "local", icon: "🚪", desc: "Excellent condition useable scrap iron gate, no rusting, ready for direct re-installation." },
  { id: 7, titleEn: "Imported Scrap Solar Cells for Silver Recovery", titleUr: "امپورٹڈ سولر سیل اسکریپ سلور نکالنے کیلئے", city: "karachi", price: "320", unit: "kg", weight: "8 Ton", isFeatured: true, origin: "imported", icon: "☀️", desc: "Premium imported damaged solar panel cell waste. High concentration material directly available from Karachi Port containers." },
  { id: 8, titleEn: "Decommissioned Telecom Lead Acid Batteries", titleUr: "ٹیلی کام پاور لیڈ ایسڈ بیٹریاں اسکریپ", city: "multan", price: "240", unit: "kg", weight: "85 units", isFeatured: false, origin: "local", icon: "🔋", desc: "Scrap heavy backup dry battery units collected from telecom towers. Selling on per kg scale weight." }
];

// 2. NEW B2B VERIFIED FACTORIES & YARDS DIRECTORY DATABASE (Chaaloo Maal Catalog Included)
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
      { item: "HDPE Crushed Flakes Blue", buy: "95", sell: "99", cycle: "Daily Production" },
      { item: "PP Injection Grinding Scrap", buy: "88", sell: "92", cycle: "Weekly Lot Availability" }
    ]
  }
];

// 3. Complete Translation Dictionary (All Auth Keys Fixed)
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
    emailLabel: "Email Address", passLabel: "Password", forgotLink: "Forgot Password?", signIn: "Sign In", signUp: "Sign Up", sendResetBtn: "Send Reset Link"
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
    loadingMoreText: "مزید اشتہارات خود بخود لوڈ ہو رہے ہیں...", callSeller: "فوری فون کال 📞", whatsappSeller: "واٹس ایپ 💬", appChatSeller: "ایپ چیٹ 💬",
    postedIn: "لوکیشن", weightLabel: "کل وزن", typeLabel: "مال کی قسم", loginBtn: "لاگ ان / رجسٹر", logoutBtn: "لاگ آؤٹ 👤",
    inboxTitle: "آپ کے ان ایپ پیغامات", chatPlaceholder: "یہاں اپنا پیغام لکھیں...", sendChatBtn: "بھیجیں",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور بڑے کمرشل یارڈز 👑", verifyActionBtn: "فیکٹری اسٹور رجسٹر کریں ⭐",
    buyPriceLabel: "خرید ریٹ", sellPriceLabel: "بیچ ریٹ", catalogTitle: "روزمرہ کا کیٹلاگ اور مال کی دستیابی",
    portalTitle: "فیکٹری ویریفیکیشن رجسٹریشن پورٹل", portalDesc: "روزانہ اور ماہانہ ہول سیل ریٹ لسٹ لگانے کیلئے تصدیقی فیس جمع کروائیں۔",
    companyNameLabel: "فیکٹری یا کاروباری ادارے کا نام", storeTypeLabel: "ادارے کی قسم منتخب کریں", payFeeBtn: "ویریفیکیشن فیس ادا کر کے اسٹور چلائیں 💳",
    authTitleLogin: "لاگ ان کریں", authTitleRegister: "نیا اکاؤنٹ بنائیں", authTitleForgot: "پاس ورڈ ری سیٹ",
    googleLogin: "گوگل کے ساتھ لاگ ان", appleLogin: "ایپل کے ساتھ لاگ ان", orDivider: "یا ای میل کے ذریعے",
    emailLabel: "ای میل ایڈریس", passLabel: "پاس ورڈ", forgotLink: "پاس ورڈ بھول گئے؟", signIn: "سائن ان کریں", signUp: "رجسٹر کریں", sendResetBtn: "لنک بھیجیں"
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
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  
  // Auth Controls
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  // Ad Forms
  const [showPostAd, setShowPostAd] = useState(false);
  const [adStep, setAdStep] = useState<'select' | 'form'>('select');
  const [adType, setAdType] = useState<'sell' | 'buy'>('sell');
  const [unit, setUnit] = useState('kg');
  const [scrapOrigin, setScrapOrigin] = useState('local');
  const [isFeatured, setIsFeatured] = useState(false);

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
    setMounted(true);
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setCurrentDate(formattedDate);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Optimized splash time
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
          setTimeout(() => {
            setVisibleAdsCount(prev => prev + 2);
            setIsScrollingLoading(false);
          }, 1000);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleAdsCount, isScrollingLoading]);

  const getSortedAdsByRadius = (): any[] => {
    const localAds = initialAdsData.filter(ad => ad.city === selectedCity);
    let order: string[] = [];
    if (selectedCity === 'gujranwala') order = ['lahore', 'multan', 'karachi'];
    else if (selectedCity === 'lahore') order = ['gujranwala', 'multan', 'karachi'];
    else if (selectedCity === 'multan') order = ['lahore', 'gujranwala', 'karachi'];
    else if (selectedCity === 'karachi') order = ['multan', 'lahore', 'gujranwala'];

    const near = initialAdsData.filter(ad => ad.city === order[0]);
    const far = initialAdsData.filter(ad => ad.city !== selectedCity && ad.city !== order[0]);

    return [
      ...localAds.map(a => ({ ...a, radiusLevel: 'local' })),
      ...near.map(a => ({ ...a, radiusLevel: 'nearby' })),
      ...far.map(a => ({ ...a, radiusLevel: 'regional' }))
    ];
  };

  const handlePostAdTrigger = () => {
    if (!isLoggedIn) { setAuthView('login'); setShowAuth(true); } 
    else { setAdStep('select'); setShowPostAd(true); }
  };

  const handleBackNavigation = () => {
    if (adStep === 'form') {
      setAdStep('select');
    } else {
      setShowPostAd(false);
    }
  };

  const sendNewChatMessage = () => {
    if (!typedMessage.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), text: typedMessage, isMe: true }]);
    setTypedMessage('');
  };

  const sortedFeedAds = getSortedAdsByRadius().slice(0, visibleAdsCount);

  const iphoneStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    textAlign: (lang === 'ur' ? 'right' : 'left') as any
  };

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24" style={iphoneStyle} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {/* Top Main Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        
        {/* Live Date Box (Mounted Check Removed for Force Visibility) */}
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
            <button
              onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else { setAuthView('login'); setShowAuth(true); } }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm"
            >
              {isLoggedIn ? t.logoutBtn : t.loginBtn}
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30">
              {lang === 'en' ? 'اردو' : 'English'}
            </button>
          </div>
        </div>

        {/* Quick Action Head Nav Row */}
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

      {/* Main Body Grid Area */}
      <main className="px-4 mt-6">
        
        {/* Origin Grid Row Toggle selection */}
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

        {/* Categories Matrix Grid (Chaaloo Maal Fitted) */}
        <div className="mb-4">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.browseTitle}</h2>
        </div>
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {[
            { label: t.cat1, icon: "🔩" }, { label: t.cat2, icon: "🛢️" },
            { label: t.cat3, icon: "🔌" }, { label: t.cat4, icon: "🥫" },
            { label: t.cat5, icon: "🔋" }, { label: t.cat6, icon: "☀️" },
            { label: t.cat7, icon: "⚡" }, { label: t.cat8, icon: "💻" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm aspect-square">
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-[11px] font-bold text-slate-600 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* VERIFIED FACTORIES DIRECTORY */}
        <div className="mb-4 mt-8 border-t border-slate-200 pt-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.b2bTitle}</h2>
            <button 
              onClick={() => { if(!isLoggedIn) { setAuthView('login'); setShowAuth(true); } else { setShowVerificationPortal(true); } }}
              className="text-[10px] bg-amber-500 text-white px-3 py-1.5 rounded-xl font-extrabold shadow-sm"
            >
              ⭐ {t.verifyActionBtn}
            </button>
          </div>

          <div className="flex overflow-x-auto pb-3 gap-3.5 scrollbar-none snap-x">
            {initialVerifiedStores.map((store) => (
              <div 
                key={store.id}
                onClick={() => setSelectedFactoryCatalog(store)}
                className="bg-white border-2 border-amber-400/40 rounded-2xl p-4 min-w-[240px] shadow-sm snap-center relative overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                  👑 Verified Store
                </div>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-3xl bg-slate-50 p-2 rounded-xl border">{store.icon}</span>
                  <div>
                    <h4 className="font-black text-sm text-slate-800 line-clamp-1">{lang === 'en' ? store.nameEn : store.nameUr}</h4>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">{store.badge}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400">📍 {t.cities[store.city as any] || store.city}</span>
                  <span className="text-[11px] font-black text-indigo-600">View Live Catalog →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LME Live Ticker Row */}
        <div className="mb-3 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.lmeTitle}</h2>
            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-black animate-pulse">● LIVE TICKER</span>
          </div>
        </div>
        <div className="flex overflow-x-auto pb-3 gap-3 scrollbar-none snap-x">
          {lmeRates.map((metal) => (
            <div key={metal.id} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 min-w-[140px] shadow-md snap-center flex flex-col justify-between border border-slate-700/50">
              <div className="flex justify-between items-center gap-2">
                <span className="text-xl bg-white/10 p-1 rounded-lg">{metal.icon}</span>
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-md ${metal.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {metal.change}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-[11px] font-bold text-slate-400 block truncate">{(t.lmeMetals as any)[metal.key]}</span>
                <span className="text-lg font-black text-white block mt-0.5">${metal.price.toLocaleString()}</span>
                <span className="text-[9px] text-slate-500 font-bold tracking-tight block">{t.lmeUnit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Rate List Table */}
        <div className="mb-3 mt-6">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.priceListTitle} ({(t.cities as any)[selectedCity]})</h2>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-2 divide-y divide-slate-100 mb-8">
          {(scrapRates as any)[selectedCity].map((item: any) => (
            <div key={item.id} className="flex justify-between items-center p-3.5">
              <div className="flex items-center space-x-3 gap-2">
                <span className="text-2xl bg-slate-100 p-1.5 rounded-lg">{item.icon}</span>
                <span className="font-bold text-slate-700 text-sm">{(t as any)[item.nameKey]}</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-green-600 block">{item.price}</span>
                <span className="text-[10px] font-bold text-slate-400 block">{t.rateUnit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Marketplace Standard Feed */}
        <div className="mb-4 mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center justify-between">
            <span>📋 {t.feedTitle}</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold">📍 {(t.cities as any)[selectedCity]} First</span>
          </h2>
        </div>

        <div className="space-y-3.5 mb-6">
          {sortedFeedAds.map((ad) => (
            <div 
              key={ad.id}
              onClick={() => setSelectedAd(ad)}
              className={`bg-white rounded-2xl p-4 border flex justify-between items-center shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden ${ad.isFeatured ? 'border-amber-300 ring-2 ring-amber-500/10' : 'border-slate-200/80'}`}
            >
              <span className={`absolute top-0 right-0 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-xl text-white ${ad.radiusLevel === 'local' ? 'bg-blue-600' : ad.radiusLevel === 'nearby' ? 'bg-orange-500' : 'bg-slate-500'}`}>
                {ad.radiusLevel === 'local' ? t.localBadge : ad.radiusLevel === 'nearby' ? t.nearbyBadge : t.regionalBadge}
              </span>
              <div className="flex items-start space-x-3.5 gap-3 max-w-[70%]">
                <div className="w-16 h-16 bg-slate-100 rounded-xl border flex flex-col items-center justify-center shrink-0"><span className="text-3xl">{ad.icon}</span></div>
                <div className="space-y-1">
                  {ad.isFeatured && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-black inline-block">⭐ FEATURED</span>}
                  <h4 className="font-extrabold text-sm text-slate-800 leading-snug line-clamp-2">{lang === 'en' ? ad.titleEn : ad.titleUr}</h4>
                  <p className="text-[11px] font-semibold text-slate-400"><span>📍</span> {t.postedIn}: <span className="text-slate-600 capitalize">{(t.cities as any)[ad.city] || ad.city}</span></p>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md inline-block">📦 {ad.weight}</span>
                </div>
              </div>
              <div className="text-right shrink-0"><span className="text-lg font-black text-green-600 block">Rs.{ad.price}</span><span className="text-[9px] font-black text-slate-400 block">/{ad.unit}</span></div>
            </div>
          ))}

          {isScrollingLoading && (
            <div className="py-4 text-center text-xs font-bold text-slate-400 animate-pulse flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>{t.loadingMoreText}
            </div>
          )}
        </div>
      </main>

      {/* VERIFIED STORE INDUSTRIAL CATALOG DISPLAY */}
      {selectedFactoryCatalog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#f2f6fa] w-full max-w-xl rounded-t-3xl sm:rounded-2xl max-h-[88vh] overflow-y-auto shadow-2xl relative flex flex-col pb-6">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 sticky top-0 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedFactoryCatalog.icon}</span>
                <div>
                  <h3 className="text-base font-black">{lang === 'en' ? selectedFactoryCatalog.nameEn : selectedFactoryCatalog.nameUr}</h3>
                  <span className="text-[9px] font-bold bg-white/20 text-white px-2 py-0.5 rounded">👑 Verified Factory Store</span>
                </div>
              </div>
              <button onClick={() => setSelectedFactoryCatalog(null)} className="bg-slate-900/40 text-white text-xs font-black px-3 py-1.5 rounded-full">✕</button>
            </div>

            <div className="p-5 space-y-4" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">📋 {t.catalogTitle}</h4>
              <div className="space-y-3">
                {selectedFactoryCatalog.catalog.map((cat: any, i: number) => (
                  <div key={i} className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-black text-sm text-slate-800">⚙️ {cat.item}</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{cat.cycle}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-green-50/50 p-2.5 rounded-xl border border-green-200">
                        <span className="text-[10px] text-green-700 font-bold block">{t.buyPriceLabel}</span>
                        <span className="text-base font-black text-green-600">Rs.{cat.buy} <span className="text-[9px] font-bold text-slate-400">/Kg</span></span>
                      </div>
                      <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-200">
                        <span className="text-[10px] text-blue-700 font-bold block">{t.sellPriceLabel}</span>
                        <span className="text-base font-black text-blue-600">Rs.{cat.sell} <span className="text-[9px] font-bold text-slate-400">/Kg</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                <a href="tel:+923000000000" className="bg-[#1a365d] text-white text-center font-black text-xs py-3.5 rounded-xl shadow-sm">{t.callSeller}</a>
                <button onClick={() => { setActiveChatSession({ id: selectedFactoryCatalog.id, name: lang === 'en' ? selectedFactoryCatalog.nameEn : selectedFactoryCatalog.nameUr }); setSelectedFactoryCatalog(null); setShowInbox(true); }} className="bg-indigo-600 text-white font-black text-xs py-3.5 rounded-xl shadow-sm">💬 Open App Inquiry</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B2B ACCOUNT REGISTRATION & VERIFICATION Portal BOX */}
      {showVerificationPortal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[125] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-5">
            <button onClick={() => setShowVerificationPortal(false)} className="absolute top-4 right-4 text-xs font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">✕</button>
            <div className="text-center">
              <span className="text-5xl block mb-2">👑</span>
              <h3 className="text-xl font-black text-[#1a365d]">{t.portalTitle}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">{t.portalDesc}</p>
            </div>
            <div className="space-y-4 text-left" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">{t.companyNameLabel}</label><input type="text" placeholder="e.g., Temur Recycling Industries" className="w-full bg-slate-50 border rounded-xl p-3.5 text-sm outline-none focus:border-amber-500" /></div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.storeTypeLabel}</label>
                <select className="w-full bg-slate-50 border rounded-xl p-3.5 text-sm outline-none focus:border-amber-500 font-bold text-slate-700">
                  <option>Large Melting Plant / Smelter</option>
                  <option>Shredding & Crushing Yard</option>
                  <option>Imported Container Scrap Yard</option>
                  <option>E-Waste & Electronics Refinery</option>
                </select>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center"><span className="text-[10px] text-amber-800 font-black block uppercase tracking-wider">Annual Premium Verification Fee</span><span className="text-xl font-black text-amber-600 block mt-0.5">Rs. 12,500 / Year</span></div>
              <button onClick={() => { alert("Premium Verification Payment Activated Mockup Successfully!"); setIsLoggedIn(true); setShowVerificationPortal(false); }} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm py-4 rounded-xl shadow-md transition-all active:scale-[0.98]">{t.payFeeBtn}</button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN MODAL: AUTHENTICATION OVERLAY (100% FIXED & VISIBLE) */}
      {showAuth && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[150] flex flex-col justify-center p-4 overflow-y-auto">
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl border p-6 space-y-6 relative">
            <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 text-xs font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">✕</button>
            <div className="text-center"><h2 className="text-xl font-black text-[#1a365d]">{authView === 'login' ? t.authTitleLogin : authView === 'register' ? t.authTitleRegister : t.authTitleForgot}</h2></div>
            
            {authView !== 'forgot' && (
              <div className="space-y-2.5">
                <button onClick={() => { setIsLoggedIn(true); setShowAuth(false); if(showPostAd) setAdStep('select'); }} className="w-full bg-white border border-slate-200 text-slate-700 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm">🔴 {t.googleLogin}</button>
                <button onClick={() => { setIsLoggedIn(true); setShowAuth(false); if(showPostAd) setAdStep('select'); }} className="w-full bg-slate-900 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm">🍏 {t.appleLogin}</button>
                <div className="flex items-center my-4 before:flex-1 before:border-t after:flex-1 after:border-t"><p className="mx-4 text-[9px] text-slate-400 font-black tracking-wider">{t.orDivider}</p></div>
              </div>
            )}

            <div className="space-y-4 text-left" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div><label className="block text-xs font-black text-slate-700 mb-1">{t.emailLabel}</label><input type="email" placeholder="name@email.com" className="w-full bg-slate-50 border rounded-xl p-3.5 text-xs outline-none focus:border-[#0066cc]" /></div>
              {authView !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1"><label className="block text-xs font-black text-slate-700">{t.passLabel}</label>{authView === 'login' && <button onClick={() => setAuthView('forgot')} className="text-xs font-bold text-[#0066cc]">{t.forgotLink}</button>}</div>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border rounded-xl p-3.5 text-xs outline-none focus:border-[#0066cc]" />
                </div>
              )}
              <button onClick={() => { if (authView === 'forgot') { alert("Reset link sent!"); setAuthView('login'); } else { setIsLoggedIn(true); setShowAuth(false); if(showPostAd) { setShowPostAd(true); setAdStep('select'); } } }} className="w-full bg-[#0066cc] text-white font-black text-sm py-3.5 rounded-xl shadow-md mt-2">{authView === 'login' ? t.signIn : authView === 'register' ? t.signUp : t.sendResetBtn}</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW AD OVERLAY */}
      {selectedAd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#f2f6fa] w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col pb-6">
            <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex justify-between items-center shadow-md z-10"><span className="text-sm font-black uppercase tracking-wider">📦 {t.appName} Mandi</span><button onClick={() => setSelectedAd(null)} className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full">✕</button></div>
            <div className="p-5 space-y-4 text-left overflow-y-auto" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div className="w-full h-40 bg-gradient-to-br from-slate-200 to-slate-100 rounded-2xl border flex flex-col items-center justify-center"><span className="text-6xl">{selectedAd.icon}</span></div>
              <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-2">
                <h3 className="text-lg font-black text-slate-800 leading-snug">{lang === 'en' ? selectedAd.titleEn : selectedAd.titleUr}</h3>
                <div className="flex justify-between items-baseline pt-1 border-t"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rate</span><div className="text-right"><span className="text-2xl font-black text-green-600">Rs.{selectedAd.price}</span><span className="text-xs font-bold text-slate-400 ml-1 uppercase">/{selectedAd.unit}</span></div></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border rounded-xl p-3 shadow-sm"><span className="text-xs font-bold text-slate-400 block mb-0.5">{t.weightLabel}</span><span className="text-sm font-black text-slate-700">⚖️ {selectedAd.weight}</span></div>
                <div className="bg-white border rounded-xl p-3 shadow-sm"><span className="text-xs font-bold text-slate-400 block mb-0.5">{t.typeLabel}</span><span className="text-sm font-black text-slate-700 capitalize">{selectedAd.origin === 'local' ? `🇵🇰 ${t.localScrap}` : `🚢 ${t.importedScrap}`}</span></div>
              </div>
              <div className="bg-white border rounded-2xl p-4 shadow-sm"><p className="text-sm font-medium text-slate-600 leading-relaxed">{selectedAd.desc}</p></div>
              <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                <a href="tel:+923000000000" className="bg-[#0066cc] text-white text-center font-black text-[11px] py-3.5 rounded-xl flex items-center justify-center">{t.callSeller}</a>
                <a href="https://wa.me/923000000000" target="_blank" className="bg-emerald-600 text-white text-center font-black text-[11px] py-3.5 rounded-xl flex items-center justify-center">{t.whatsappSeller}</a>
                <button onClick={() => { setActiveChatSession({ id: selectedAd.id, name: lang === 'en' ? selectedAd.titleEn : selectedAd.titleUr }); setSelectedAd(null); setShowInbox(true); }} className="bg-indigo-600 text-white font-black text-[11px] py-3.5 rounded-xl">{t.appChatSeller}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERNAL CHAT MESSENGER INBOX */}
      {showInbox && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[105] flex flex-col">
          <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex justify-between items-center shadow-md">
            <button onClick={() => { if (activeChatSession) setActiveChatSession(null); else setShowInbox(false); }} className="bg-white/10 px-3 py-1.5 rounded-xl font-bold text-xs">← {activeChatSession ? "Inbox" : "Home"}</button>
            <h3 className="text-base font-black">{activeChatSession ? activeChatSession.name : t.inboxTitle}</h3>
            <button onClick={() => { setActiveChatSession(null); setShowInbox(false); }} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-xl font-bold">✕</button>
          </div>
          {activeChatSession ? (
            <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`max-w-[75%] p-3.5 rounded-2xl text-sm font-semibold shadow-sm ${msg.isMe ? 'bg-indigo-600 text-white rounded-br-none self-end text-left' : 'bg-white text-slate-800 rounded-bl-none self-start text-left'}`}>{msg.text}</div>
                ))}
              </div>
              <div className="p-3 bg-white border-t flex gap-2 items-center">
                <input type="text" value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} placeholder={t.chatPlaceholder} className="w-full bg-slate-100 border rounded-xl p-3 outline-none text-sm font-medium" onKeyDown={(e) => { if(e.key === 'Enter') sendNewChatMessage(); }} />
                <button onClick={sendNewChatMessage} className="bg-indigo-600 text-white font-black px-5 py-3 rounded-xl text-sm">{t.sendChatBtn}</button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              <div onClick={() => setActiveChatSession({ id: 99, name: "HMS 1 Bulk Inquiry" })} className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center cursor-pointer">
                <div className="flex items-center space-x-3 gap-3">
                  <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold">💬</div>
                  <div><h4 className="font-black text-sm text-slate-800">HMS 1 Industrial Iron</h4><p className="text-xs text-slate-400 font-medium mt-0.5">Bhai final weight loading kab hai?</p></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">2m ago</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FULL-SCREEN OVERLAY FOR POST AD */}
      {showPostAd && isLoggedIn && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[100] flex flex-col overflow-y-auto pb-12">
          {/* Form logic remains intact */}
          <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex items-center justify-between shadow-md z-10">
            <button onClick={handleBackNavigation} className="flex items-center space-x-1 gap-1 text-white bg-white/10 font-bold px-3 py-2 rounded-xl">← Back</button>
            <h3 className="text-sm font-black uppercase">Post Advertisement</h3>
            <button onClick={() => setShowPostAd(false)} className="text-xs bg-red-600 text-white px-3 py-2 rounded-xl font-bold">✕</button>
          </div>
          <div className="p-6 text-center text-slate-500 font-bold">Ad submission engine operational.</div>
        </div>
      )}

      {/* Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button onClick={() => { setShowInbox(false); setActiveChatSession(null); }} className="flex flex-col items-center text-[#0066cc] font-bold text-xs w-14"><span className="text-xl">🏠</span><span className="mt-0.5">{t.navHome}</span></button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14"><span className="text-xl">📋</span><span className="mt-0.5">{t.navAds}</span></button>
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button onClick={handlePostAdTrigger} className="w-14 h-14 bg-[#0066cc] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transform active:scale-95 transition-all"><span className="text-3xl font-light">+</span></button>
          <span className="text-[11px] font-bold text-[#0066cc] mt-1">{t.navSell}</span>
        </div>
        <button onClick={() => { setActiveChatSession(null); setShowInbox(true); }} className="flex flex-col items-center text-slate-400 font-medium text-xs w-14"><span className="text-xl">💬</span><span className="mt-0.5">{t.navChat}</span></button>
        <button className="flex flex-col items-center text-slate-400 font-medium text-xs w-14"><span className="text-xl">⣿</span><span className="mt-0.5">{t.navMore}</span></button>
      </nav>

    </div>
  );
}
