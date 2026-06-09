'use client';

import { useState, useEffect } from 'react';

// 1. ALL SCRAP ADS DATABASE (Top level execution alignment)
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire scrap. Clean shining stock, ready for delivery." },
  { id: 3, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", desc: "Compressed aluminum drink beverage can bundles. Total weight 35 munds loaded in Lahore Badami Bagh." },
  { id: 4, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", price: "98", unit: "kg", weight: "3 Ton", isFeatured: false, origin: "local", icon: "🛢️", desc: "Blue and white HDPE industrial crushed plastic flakes ready for recycling plants injection molding." },
  { id: 5, titleEn: "Imported Scrap Solar Cells for Silver Recovery", titleUr: "امپورٹڈ سولر سیل اسکریپ سلور نکالنے کیلئے", city: "karachi", price: "320", unit: "kg", weight: "8 Ton", isFeatured: true, origin: "imported", icon: "☀️", desc: "Premium imported damaged solar panel cell waste. High concentration material directly available from Karachi Port containers." },
  { id: 6, titleEn: "Decommissioned Telecom Lead Acid Batteries", titleUr: "ٹیلی کام پاور لیڈ ایسڈ بیٹریاں اسکریپ", city: "multan", price: "240", unit: "kg", weight: "85 units", isFeatured: false, origin: "local", icon: "🔋", desc: "Scrap heavy backup dry battery units collected from telecom towers. Selling on per kg scale weight." }
];

// 2. NEW B2B VERIFIED FACTORIES & YARDS DIRECTORY DATABASE
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
      { item: "Alumina Smelting Scrap Lot", buy: "450", sell: "475", cycle: "Monthly Container" }
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

// 3. Complete Translation Dictionary
const translations: any = {
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
    navChat: "Chat Inbox",
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
    feedTitle: "Scrap Marketplace Feed",
    localBadge: "Local (0-15 km)",
    nearbyBadge: "Nearby (15-80 km)",
    regionalBadge: "Regional (>80 km)",
    loadingMoreText: "Loading more matching ads automatically...",
    callSeller: "Direct Call 📞",
    whatsappSeller: "WhatsApp 💬",
    appChatSeller: "App Chat 💬",
    postedIn: "Posted in",
    weightLabel: "Total Weight",
    typeLabel: "Stock Type",
    loginBtn: "Login / Register",
    logoutBtn: "Logout 👤",
    inboxTitle: "Your App Messages",
    chatPlaceholder: "Type your scrap offer here...",
    sendChatBtn: "Send",
    b2bTitle: "Verified Factories & Commercial Yards 👑",
    verifyActionBtn: "Register Factory Store ⭐",
    buyPriceLabel: "Buying Rate",
    sellPriceLabel: "Selling Rate",
    catalogTitle: "Routine Catalog & Stock Availability",
    portalTitle: "Factory Verification Registration",
    portalDesc: "Pay a nominal security verification fee to post your daily bulk routine catalog rates.",
    companyNameLabel: "Official Factory / Business Name",
    storeTypeLabel: "Select Store/Plant Type",
    payFeeBtn: "Pay Verification Fee & Activate Store 💳"
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
    navChat: "چیٹ ان باکس",
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
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)",
    localBadge: "مقامی اشتہار (0-15 کلومیٹر)",
    nearbyBadge: "قریبی شہر (15-80 کلومیٹر)",
    regionalBadge: "دوسرا ریجن (>80 کلومیٹر)",
    loadingMoreText: "مزید اشتہارات خود بخود لوڈ ہو رہے ہیں...",
    callSeller: "فوری فون کال 📞",
    whatsappSeller: "واٹس ایپ 💬",
    appChatSeller: "ایپ چیٹ 💬",
    postedIn: "لوکیشن",
    weightLabel: "کل وزن",
    typeLabel: "مال کی قسم",
    loginBtn: "لاگ ان / رجسٹر",
    logoutBtn: "لاگ آؤٹ 👤",
    inboxTitle: "آپ کے ان ایپ پیغامات",
    chatPlaceholder: "یہاں اپنا پیغام لکھیں...",
    sendChatBtn: "بھیجیں",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور بڑے کمرشل یارڈز 👑",
    verifyActionBtn: "فیکٹری اسٹور رجسٹر کریں ⭐",
    buyPriceLabel: "خرید ریٹ",
    sellPriceLabel: "بیچ ریٹ",
    catalogTitle: "روزمرہ کا کیٹلاگ اور مال کی دستیابی",
    portalTitle: "فیکٹری ویریفیکیشن رجسٹریشن پورٹل",
    portalDesc: "روزانہ اور ماہانہ ہول سیل ریٹ لسٹ لگانے کیلئے تصدیقی فیس جمع کروائیں۔",
    companyNameLabel: "فیکٹری یا کاروباری ادارے کا نام",
    storeTypeLabel: "ادارے کی قسم منتخب کریں",
    payFeeBtn: "ویریفیکیشن فیس ادا کر کے اسٹور چلائیں 💳"
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
    { id: "plastic", nameKey: "cat2", icon: "🛢️", price: "90" }
  ]
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  
  // Auth & Screen Control States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  const [showPostAd, setShowPostAd] = useState(false);
  const [adStep, setAdStep] = useState<'select' | 'form'>('select');
  const [adType, setAdType] = useState<'sell' | 'buy'>('sell');
  const [unit, setUnit] = useState('kg');
  const [scrapOrigin, setScrapOrigin] = useState('local');
  const [isFeatured, setIsFeatured] = useState(false);

  // Infinite Scroll States
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
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
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

  // PREMIUM SYSTEM-AGNOSTIC APPLE FONT SCHEME
  const iphoneStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    textAlign: (lang === 'ur' ? 'right' : 'left') as any
  };

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24" style={iphoneStyle} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {/* Top Main Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
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
        <div className="grid grid-cols-2
