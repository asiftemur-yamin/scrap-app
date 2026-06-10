'use client';

import { useState, useEffect, useRef } from 'react';

// 1. EXTENDED PRODUCTION ADS DATABASE
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", mainCat: "iron", subCat: "scrap", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", mainCat: "copper", subCat: "scrap", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire scrap. Clean shining stock, ready for delivery." },
  { id: 3, titleEn: "Chaaloo Industrial Air Compressor 200L", titleUr: "چالو انڈسٹریل ائیر کمپریسر 200L", city: "gujranwala", mainCat: "chaaloo", subCat: "compressor", price: "45,000", unit: "piece", weight: "1 unit", isFeatured: true, origin: "local", icon: "💨", desc: "Perfect working condition 3-phase piston air compressor, suitable for recycling plants or workshops." },
  { id: 4, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", mainCat: "aluminum", subCat: "scrap", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", desc: "Compressed aluminum drink beverage can bundles. Total weight 35 munds loaded in Lahore Badami Bagh." },
  { id: 5, titleEn: "Useable Industrial Electric Motor 5HP (Chaaloo)", titleUr: "صنعتی الیکٹرک موٹر 5HP (چالو مال)", city: "gujranwala", mainCat: "chaaloo", subCat: "motor", price: "16,500", unit: "piece", weight: "2 units", isFeatured: true, origin: "local", icon: "⚙️", desc: "Working condition 5HP copper winding motors removed from textile plant clearance." },
  { id: 6, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", mainCat: "plastic", subCat: "scrap", price: "98", unit: "kg", weight: "3 Ton", isFeatured: false, origin: "local", icon: "🛢️", desc: "Blue and white HDPE industrial crushed plastic flakes ready for recycling plants injection molding." }
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
      { item: "Pure Copper Stripped Wire", buy: "1,850", sell: "1,890", cycle: "Weekly Bulk Lot" }
    ]
  }
];

const initialCategories = [
  { cat: 'iron', labelEn: "Iron (Loha)", labelUr: "لوہا (Iron)", icon: "🔩" },
  { cat: 'plastic', labelEn: "Plastic", labelUr: "پلاسٹک (Plastic)", icon: "🛢️" },
  { cat: 'copper', labelEn: "Copper (Tamba)", labelUr: "تانبا (Copper)", icon: "🔌" },
  { cat: 'aluminum', labelEn: "Aluminum", labelUr: "ایلومینیم", icon: "🥫" },
  { cat: 'batteries', labelEn: "Batteries", labelUr: "بیٹریاں", icon: "🔋" },
  { cat: 'solar', labelEn: "Solar Panels", labelUr: "سولر پینل", icon: "☀️" },
  { cat: 'chaaloo', labelEn: "Chaaloo Maal", labelUr: "چالو مال (Useable)", icon: "⚡" },
  { cat: 'electronic', labelEn: "Electronic", labelUr: "الیکٹرانک", icon: "💻" }
];

const translations: any = {
  en: {
    appName: "SCRAP WORLD", sellScrap: "Sell Scrap", buyScrap: "Buy Scrap", rates: "Live Rates", postAd: "Post Ad",
    searchPlaceholder: "Search scrap iron, plastic, copper...", browseTitle: "Browse Scrap Categories",
    priceListTitle: "Live Market Price List", selectCityTitle: "Select City for Rates", lmeTitle: "LME Live International Rates",
    rateUnit: "Rs / Kg", lmeUnit: "USD / Ton", navHome: "Home", navAds: "My Ads", navSell: "Sell Now", navChat: "Chat Inbox",
    cities: { gujranwala: "Gujranwala", lahore: "Lahore", karachi: "Karachi", multan: "Multan" },
    lmeMetals: { copper: "LME Copper", aluminum: "LME Aluminum", zinc: "LME Zinc", lead: "LME Lead" },
    originSectionTitle: "Select Scrap Type", localScrap: "Local Scrap", localScrapDesc: "Filter Pakistani local market material",
    importedScrap: "Imported Scrap", importedScrapDesc: "Filter international imported stock",
    feedTitle: "Scrap Marketplace Feed", localBadge: "Local (0-15 km)", regionalBadge: "Regional (>80 km)",
    callSeller: "Direct Call 📞", whatsappSeller: "WhatsApp 💬", appChatSeller: "App Chat 💬",
    postedIn: "Posted in", weightLabel: "Total Weight", loginBtn: "Login / Register", logoutBtn: "Logout 👤",
    inboxTitle: "Your App Messages", chatPlaceholder: "Type your scrap offer here...", sendChatBtn: "Send",
    b2bTitle: "Verified Factories & Commercial Yards 👑", verifyActionBtn: "Register Factory Store ⭐",
    buyPriceLabel: "Buying Rate", sellPriceLabel: "Selling Rate", catalogTitle: "Routine Catalog & Stock Availability",
    portalTitle: "Factory Verification Registration", portalDesc: "Pay a nominal security verification fee to post your daily bulk routine catalog rates.",
    companyNameLabel: "Official Factory / Business Name", storeTypeLabel: "Select Store/Plant Type", payFeeBtn: "Pay Verification Fee & Activate Store 💳",
    chaalooTitle: "Chaaloo Maal Sub-Categories ⚡", itemTypeLabel: "Select Specific Sub-Category",
    subCats: { all: "Show All Maal", compressor: "Chaaloo Compressor 💨", motor: "Chaaloo Motor ⚙️", generator: "Chaaloo Generator ⚡", other: "Other Useable Items 📦" }
  },
  ur: {
    appName: "اسکریپ ورلڈ", sellScrap: "اسکریپ بیچیں", buyScrap: "اسکریپ خریدیں", rates: "لائیو ریٹس", postAd: "اشتہار لگائیں",
    searchPlaceholder: "لوہا، پلاسٹک، تانبا تلاش کریں...", browseTitle: "اسکریپ کیٹیگریز (فلٹر لگانے کیلئے کلک کریں)",
    priceListTitle: "مارکیٹ کی لائیو ریٹ لسٹ", selectCityTitle: "شہر کا انتخاب کریں", lmeTitle: "ایل ایم ای (LME) لائیو ریٹس",
    rateUnit: "روپے / کلو", lmeUnit: "ڈالر / ٹن", navHome: "ہوم", navAds: "اشتہارات", navSell: "ابھی بیچیں", navChat: "چیٹ ان باکس",
    cities: { gujranwala: "گوجرانوالہ", lahore: "لاہور", karachi: "کراچی", multan: "ملتان" },
    lmeMetals: { copper: "تانبا (Copper)", aluminum: "ایلومینیم", zinc: "زنک (Zinc)", lead: "لیڈ (Lead)" },
    originSectionTitle: "اسکریپ کی قسم منتخب کریں", localScrap: "لوکل اسکریپ", localScrapDesc: "لوکل مارکیٹ کا مال دیکھنے کیلئے",
    importedScrap: "امپورٹڈ اسکریپ", importedScrapDesc: "امپورٹڈ کنٹینر کا اسٹاک دیکھنے کیلئے",
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)", localBadge: "مقامی اشتہار (0-15 کلومیٹر)", nearbyBadge: "قریبی شہر (15-80 کلومیٹر)", regionalBadge: "دوسرا ریجن (>80 کلومیٹر)",
    callSeller: "فوری فون کال 📞", whatsappSeller: "واٹس ایپ 💬", appChatSeller: "ایپ چیٹ 💬",
    postedIn: "لوکیشن", weightLabel: "کل وزن", loginBtn: "لاگ ان / رجسٹر", logoutBtn: "لاگ آؤٹ 👤",
    inboxTitle: "آپ کے ان ایپ پیغامات", chatPlaceholder: "یہاں اپنا پیغام لکھیں...", sendChatBtn: "بھیجیں",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور کمرشل یارڈز 👑 (ریٹ دیکھنے کیلئے کلک کریں)", verifyActionBtn: "فیکٹری اسٹور رجسٹر کریں ⭐",
    buyPriceLabel: "خرید ریٹ", sellPriceLabel: "بیچ ریٹ", catalogTitle: "روزمرہ کا کیٹلاگ اور مال کی دستیابی",
    portalTitle: "فیکٹری ویریفیکیشن رجسٹریشن پورٹل", portalDesc: "روزانہ اور ماہانہ ہول سیل ریٹ لسٹ لگانے کیلئے تصدیقی فیس جمع کروائیں۔",
    companyNameLabel: "فیکٹری یا کاروباری ادارے کا نام", storeTypeLabel: "ادارے کی قسم منتخب کریں", payFeeBtn: "ویریفیکیشن فیس ادا کر کے اسٹور چلائیں 💳",
    chaalooTitle: "چالو مال کی کیٹیگریز ⚡", itemTypeLabel: "مخصوص آئٹم منتخب کریں",
    subCats: { all: "سب چالو مال دکھائیں", compressor: "چالو کمپریسر 💨", motor: "چالو موٹر ⚙️", generator: "چالو جنریٹر ⚡", other: "دیگر چالو سامان / Other 📦" }
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
    { id: "plastic", nameKey: "cat2", icon: "98" }
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
  
  const ratesRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const [appCategories] = useState(initialCategories);
  const [allAdsList, setAllAdsList] = useState(initialAdsData);
  const [verifiedFactories] = useState(initialVerifiedStores);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMainCatFilter, setActiveMainCatFilter] = useState<string>('all');
  const [activeSubCatFilter, setActiveSubCatFilter] = useState<string>('all');
  const [showChaalooModal, setShowChaalooModal] = useState(false);
  const [activeOriginFilter, setActiveOriginFilter] = useState<string>('all');

  // Auth & General Modal States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPostAd, setShowPostAd] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any | null>(null);
  const [showInbox, setShowInbox] = useState(false);
  const [showVerificationPortal, setShowVerificationPortal] = useState(false);
  const [selectedFactoryCatalog, setSelectedFactoryCatalog] = useState<any | null>(null);
  const [lmeRates, setLmeRates] = useState(lmeData);

  // 👑 SPECIFIC INTERFACE VARIABLE FORM STATES
  const [formItemName, setFormItemName] = useState('');
  const [formMainCat, setFormMainCat] = useState('iron');
  const [formSubCat, setFormSubCat] = useState('scrap');
  const [formPrice, setFormPrice] = useState('');
  const [formUnit, setFormUnit] = useState('kg');
  const [formAbout, setFormAbout] = useState('');
  const [formWeight, setFormWeight] = useState('');

  const t: any = translations[lang];

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    const timer = setTimeout(() => { setShowSplash(false); }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePostAdTrigger = () => { if (!isLoggedIn) { setShowAuth(true); } else { setShowPostAd(true); } };
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => { elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const handlePublishAd = () => {
    if (!formItemName || !formPrice) {
      alert("Meherbani kar ke Item ka Naam aur Rate lazmi likhein!");
      return;
    }

    const newAdObj = {
      id: Date.now(),
      titleEn: formItemName,
      titleUr: formItemName,
      city: selectedCity,
      mainCat: formMainCat,
      subCat: formSubCat,
      price: Number(formPrice).toLocaleString(),
      unit: formUnit,
      weight: formWeight || "1 Lot",
      isFeatured: false,
      origin: "local",
      icon: formMainCat === 'iron' ? '🔩' : formMainCat === 'copper' ? '🔌' : formMainCat === 'plastic' ? '🛢️' : '📦',
      desc: formAbout || "No additional description provided."
    };

    setAllAdsList([newAdObj, ...allAdsList]);
    alert("📢 Aap ka Ad Mandi Feed par kamyabi se lag gaya hai!");
    
    // Clear fields
    setFormItemName(''); setFormPrice(''); setFormAbout(''); setFormWeight('');
    setShowPostAd(false);
  };

  const getFilteredAndSortedAds = (): any[] => {
    let dataset = allAdsList;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      dataset = dataset.filter(ad => ad.titleEn.toLowerCase().includes(query) || ad.titleUr.includes(query));
    }
    if (activeMainCatFilter !== 'all') dataset = dataset.filter(ad => ad.mainCat === activeMainCatFilter);
    if (activeSubCatFilter !== 'all') dataset = dataset.filter(ad => ad.subCat === activeSubCatFilter);
    if (activeOriginFilter !== 'all') dataset = dataset.filter(ad => ad.origin === activeOriginFilter);
    return dataset.filter(ad => ad.city === selectedCity);
  };

  const sortedFeedAds = getFilteredAndSortedAds();

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24 relative" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', textAlign: lang === 'ur' ? 'right' : 'left' }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {/* Blue Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            <div className="text-7xl animate-bounce">🏭♻️</div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Post Ad Engine Active</p>
          </div>
        </div>
      )}

      {/* Header Block Locked (Deep Blue) */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1.5">
          <span className="text-[11px] font-black tracking-wide bg-white/10 px-3 py-1 rounded-full">📅 {currentDate || "10 Jun 2026"}</span>
          <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full font-black animate-pulse">● LIVE MANDI</span>
        </div>

        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="text-2xl font-black tracking-wider">{t.appName}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else setShowAuth(true); }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm">{isLoggedIn ? t.logoutBtn : t.loginBtn}</button>
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30">{lang === 'en' ? 'اردو' : 'English'}</button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-3 scrollbar-none gap-2">
          <button onClick={handlePostAdTrigger} className="bg-[#0066cc] text-white text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap shadow-sm text-center">
            {t.sellScrap} <span className="block text-[9px] opacity-75">(مال بیچیں)</span>
          </button>
          <button onClick={() => scrollToSection(feedRef)} className="bg-white text-[#1a365d] text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap border text-center">
            {t.buyScrap} <span className="block text-[9px] opacity-60">(اشتہارات دیکھیں)</span>
          </button>
          <button onClick={() => scrollToSection(ratesRef)} className="bg-white text-[#1a365d] text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap border text-center">
            {t.rates} <span className="block text-[9px] opacity-60">(ریٹ لسٹ دیکھیں)</span>
          </button>
          <button onClick={handlePostAdTrigger} className="bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-full whitespace-nowrap shadow-md text-center">
            📢 {t.postAd} <span className="block text-[9px] opacity-90">(فارم کھولیں)</span>
          </button>
        </div>

        <div className="mt-2 bg-white rounded-lg p-3 flex items-center shadow-inner text-slate-700">
          <span className="text-slate-400 mx-2">🔍</span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-transparent outline-none text-sm font-medium text-slate-800" />
        </div>
      </header>

      {/* Main Container Area */}
      <main className="px-4 mt-6">
        
        {/* Toggle Filters for Origin Stream */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div onClick={() => setActiveOriginFilter(activeOriginFilter === 'local' ? 'all' : 'local')} className={`rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer border-2 transition-all ${activeOriginFilter === 'local' ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-100'}`}>
            <div><span className="font-black text-sm text-[#1a365d] block">{t.localScrap}</span><span className="text-[10px] text-slate-400 font-bold block mt-0.5">{t.localScrapDesc}</span></div>
            <span className="text-3xl">🇵🇰</span>
          </div>
          <div onClick={() => setActiveOriginFilter(activeOriginFilter === 'imported' ? 'all' : 'imported')} className={`rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer border-2 transition-all ${activeOriginFilter === 'imported' ? 'bg-green-50 border-green-600' : 'bg-white border-slate-100'}`}>
            <div><span className="font-black text-sm text-[#1a365d] block">{t.importedScrap}</span><span className="text-[10px] text-slate-400 font-bold block mt-0.5">{t.importedScrapDesc}</span></div>
            <span className="text-3xl">🚢</span>
          </div>
        </div>

        {/* Categories Matrix Grid */}
        <div className="mb-4 flex justify-between items-center"><h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.browseTitle}</h2></div>
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {appCategories.map((item, idx) => (
            <div key={idx} onClick={() => { if(item.cat === 'chaaloo') { setShowChaalooModal(true); } else { setActiveMainCatFilter(item.cat); setActiveSubCatFilter('all'); } }} className={`border rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-sm aspect-square cursor-pointer transition-all ${activeMainCatFilter === item.cat ? 'bg-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-700'}`}>
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-black leading-tight block truncate w-full">{lang === 'en' ? item.labelEn : item.labelUr}</span>
            </div>
          ))}
        </div>

        {/* Sub-Categories Popup */}
        {showChaalooModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-2"><h3 className="font-black text-base text-[#1a365d]">{t.chaalooTitle}</h3><button onClick={() => setShowChaalooModal(false)} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">✕</button></div>
              <div className="space-y-2">
                {Object.keys(t.subCats).map((key) => (
                  <button key={key} onClick={() => { setActiveMainCatFilter('chaaloo'); setActiveSubCatFilter(key); setShowChaalooModal(false); }} className={`w-full text-left p-3 rounded-xl border font-bold text-xs ${activeSubCatFilter === key ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-700'}`}>{t.subCats[key]}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FIXED RATES DISPLAY PANEL (City Name Buttons Always on Top) */}
        <div ref={ratesRef} className="pt-4 scroll-mt-4">
          <div className="mb-3"><div className="flex justify-between items-center"><h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.lmeTitle}</h2></div></div>
          <div className="flex overflow-x-auto pb-3 gap-3 scrollbar-none">
            {lmeRates.map((metal) => (
              <div key={metal.id} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 min-w-[140px] shadow-md flex flex-col justify-between border border-slate-700/50">
                <div className="flex justify-between items-center gap-2"><span className="text-xl bg-white/10 p-1 rounded-lg">{metal.icon}</span><span className={`text-[11px] font-black px-1.5 py-0.5 rounded-md ${metal.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{metal.change}</span></div>
                <div className="mt-4"><span className="text-[11px] font-bold text-slate-400 block truncate">{(t.lmeMetals as any)[metal.key]}</span><span className="text-lg font-black text-white block mt-0.5">${metal.price.toLocaleString()}</span></div>
              </div>
            ))}
          </div>

          {/* 📍 City Selectors (Top) */}
          <div className="mb-2 mt-6"><h2 className="text-sm font-black text-slate-500 uppercase tracking-wider">{t.selectCityTitle}</h2></div>
          <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none">
            {Object.keys(scrapRates).map((cityKey) => (
              <button key={cityKey} onClick={() => setSelectedCity(cityKey as any)} className={`px-5 py-2.5 text-xs font-black rounded-xl border transition-all whitespace-nowrap ${selectedCity === cityKey ? 'bg-blue-900 text-white border-blue-900 shadow-md' : 'bg-white text-slate-600 border-slate-200'}`}>📍 {(t.cities as any)[cityKey]}</button>
            ))}
          </div>

          {/* 💰 Live Rates Matrix (Below Buttons) */}
          <div className="mb-2 mt-3"><h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.priceListTitle} ({(t.cities as any)[selectedCity]})</h2></div>
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-2 divide-y divide-slate-100 mb-6">
            {(scrapRates as any)[selectedCity]?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center p-3.5">
                <div className="flex items-center space-x-3 gap-2"><span className="text-2xl bg-slate-100 p-1.5 rounded-lg">{item.icon}</span><span className="font-bold text-slate-700 text-sm">{(t as any)[item.nameKey]}</span></div>
                <div className="text-right"><span className="text-base font-black text-green-600 block">Rs.{item.price}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketplace Feed */}
        <div ref={feedRef} className="pt-4 border-t border-slate-200 scroll-mt-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4">📋 {t.feedTitle}</h2>
          <div className="space-y-3.5 mb-6">
            {sortedFeedAds.map((ad) => (
              <div key={ad.id} onClick={() => setSelectedAd(ad)} className="bg-white rounded-2xl p-4 border border-slate-200 flex justify-between items-center shadow-sm cursor-pointer">
                <div className="flex items-start space-x-3.5 gap-3 max-w-[70%]">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl shrink-0">{ad.icon}</div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug line-clamp-2">{ad.titleEn}</h4>
                    <p className="text-[10px] font-semibold text-slate-400">📍 {(t.cities as any)[ad.city] || ad.city} • <span className="text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded">{ad.weight}</span></p>
                  </div>
                </div>
                <div className="text-right shrink-0"><span className="text-base font-black text-green-600 block">Rs.{ad.price}</span><span className="text-[10px] text-slate-400 block">/{ad.unit}</span></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 👑 PREMIUM SEQUENCED POST AD MODAL POPUP INTERFACE */}
      {showPostAd && isLoggedIn && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[400] flex flex-col overflow-y-auto pb-12">
          <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex items-center justify-between shadow-md">
            <button onClick={() => setShowPostAd(false)} className="text-white bg-white/10 font-bold px-3 py-2 rounded-xl">← Cancel</button>
            <h3 className="text-sm font-black uppercase tracking-wider">📢 Post New Advertisement</h3>
            <div></div>
          </div>
          
          <div className="p-5 max-w-lg mx-auto w-full space-y-5 text-left" dir="ltr">
            
            {/* STEP 1: ITEM NAME */}
            <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-1">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">1. Item Name / Maal Ka Naam</label>
              <input type="text" value={formItemName} onChange={(e) => setFormItemName(e.target.value)} placeholder="e.g., Pure Copper Stripped Wire Grade A" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none font-bold text-slate-800 focus:border-blue-600" />
            </div>

            {/* STEP 2: CATEGORY SELECTOR */}
            <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">2. Select Category / Maal Ki Type</label>
              <select value={formMainCat} onChange={(e) => { setFormMainCat(e.target.value); if(e.target.value !== 'chaaloo') setFormSubCat('scrap'); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none font-bold text-slate-700 focus:border-blue-600">
                <option value="iron">Iron / Loha (لوہا)</option>
                <option value="plastic">Plastic (پلاسٹک)</option>
                <option value="copper">Copper / Tamba (تانبا)</option>
                <option value="aluminum">Aluminum (ایلومینیم)</option>
                <option value="chaaloo">Chaaloo Maal / Useable Machinery (چالو مال)</option>
              </select>

              {/* Conditional Sub-Category Trigger for Chaaloo Maal option */}
              {formMainCat === 'chaaloo' && (
                <div className="mt-2 bg-amber-50/50 border border-amber-200 rounded-xl p-3 space-y-1 animate-fade-in">
                  <label className="block text-[10px] font-black text-amber-800 uppercase">⚡ Specific Chaaloo Sub-Category</label>
                  <select value={formSubCat} onChange={(e) => setFormSubCat(e.target.value)} className="w-full bg-white border border-amber-200 rounded-xl p-2.5 text-xs font-bold text-slate-800">
                    <option value="compressor">Chaaloo Compressor 💨</option>
                    <option value="motor">Chaaloo Motor ⚙️</option>
                    <option value="generator">Chaaloo Generator ⚡</option>
                    <option value="other">Other Useable Miscellaneous Items 📦</option>
                  </select>
                </div>
              )}
            </div>

            {/* STEP 3: PRICE AND WEIGHT WITH DYNAMIC UNIT SELECTOR */}
            <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">3. Price & Weight Demand / ریٹ اور وزن</label>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Rate (Rs.)</span>
                  <input type="number" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="Price Demanded" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-black text-green-600 outline-none" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Select Unit Type</span>
                  <select value={formUnit} onChange={(e) => setFormUnit(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none">
                    <option value="kg">Per Kg (کلو)</option>
                    <option value="ton">Per Ton (ٹن)</option>
                    <option value="mund">Per Mund (من)</option>
                    <option value="piece">Per Piece (عدد)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Total Available Weight / Quantity Lot</span>
                <input type="text" value={formWeight} onChange={(e) => setFormWeight(e.target.value)} placeholder="e.g., 15 Ton, 40 Mund, 350 Kg" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none" />
              </div>
            </div>

            {/* STEP 4: PICTURE UPLOAD BLOCK */}
            <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-1">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">4. Upload Photo / Maal Ki Tasveer</label>
              <div onClick={() => alert("Mobile Camera & Gallery integration will trigger on live server device deployment.")} className="w-full h-28 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:bg-slate-100/50 transition-all">
                <span className="text-3xl">📷</span>
                <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Click to add clear picture</span>
              </div>
            </div>

            {/* STEP 5: ABOUT / DESCRIPTION */}
            <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-1">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">5. About / Maal Ki Tafseelat</label>
              <textarea rows={3} value={formAbout} onChange={(e) => setFormAbout(e.target.value)} placeholder="Write loading location, stock condition, payment terms here..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-700 outline-none resize-none focus:border-blue-600"></textarea>
            </div>

            {/* MASTER PUBLISH ACTION BUTTON */}
            <button type="button" onClick={handlePublishAd} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-sm py-4 rounded-xl shadow-lg transform active:scale-95 transition-all mt-4 uppercase tracking-wider">Publish Advertisement Live 📢</button>
          </div>
        </div>
      )}

      {/* Auth Gate Keeper Layout */}
      {showAuth && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[300] flex flex-col justify-center p-4">
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl border p-6 space-y-4 relative">
            <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 text-xs font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">✕</button>
            <div className="text-center"><h2 className="text-xl font-black text-[#1a365d]">{t.appName} Registration</h2><p className="text-xs text-slate-400 mt-1 font-medium">Enter your number credentials to unlock posting.</p></div>
            <button onClick={() => { setIsLoggedIn(true); setShowAuth(false); setShowPostAd(true); }} className="w-full bg-[#0066cc] text-white font-black text-sm py-3.5 rounded-xl mt-2 shadow">Quick Bypass Login 🔑</button>
          </div>
        </div>
      )}

      {/* Popups detail view */}
      {selectedAd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl relative flex flex-col pb-6 overflow-hidden">
            <div className="bg-[#1a365d] text-white p-4 flex justify-between items-center shadow-md"><span className="text-sm font-black uppercase">📦 Stock Details</span><button onClick={() => setSelectedAd(null)} className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full">✕</button></div>
            <div className="p-5 space-y-4 text-left" dir="ltr">
              <div className="w-full h-32 bg-slate-50 border rounded-xl flex items-center justify-center text-5xl">{selectedAd.icon}</div>
              <h3 className="text-base font-black text-slate-800">{selectedAd.titleEn}</h3>
              <div className="bg-slate-50 border p-4 rounded-xl flex justify-between items-center"><span className="text-xs font-bold text-slate-400">Rate Demand</span><span className="text-xl font-black text-green-600">Rs.{selectedAd.price} <span className="text-xs text-slate-400">/{selectedAd.unit}</span></span></div>
              <div className="bg-slate-50 p-3 rounded-xl border"><span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">About Maal:</span><p className="text-xs font-medium text-slate-600 leading-relaxed">{selectedAd.desc}</p></div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a href="tel:+923000000000" className="bg-[#0066cc] text-white text-center font-black text-xs py-3.5 rounded-xl shadow">Call 📞</a>
                <a href="https://wa.me/923000000000" target="_blank" className="bg-green-600 text-white text-center font-black text-xs py-3.5 rounded-xl shadow">WhatsApp 💬</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Navigation Bar Controls */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button onClick={() => { setShowInbox(false); setShowPostAd(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center text-[#0066cc] font-bold text-[10px] w-14"><span className="text-lg">🏠</span><span className="mt-0.5">{t.navHome}</span></button>
        <button onClick={() => scrollToSection(feedRef)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14"><span className="text-lg">📋</span><span className="mt-0.5">{t.navAds}</span></button>
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button onClick={handlePostAdTrigger} className="w-14 h-14 bg-[#0066cc] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transform active:scale-95 transition-all"><span className="text-2xl font-light">+</span></button>
          <span className="text-[10px] font-black text-[#0066cc] mt-0.5">{t.navSell}</span>
        </div>
        <button onClick={() => alert("Inbox Chat integration active module.")} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14"><span className="text-lg">💬</span><span className="mt-0.5">{t.navChat}</span></button>
        <button onClick={() => scrollToSection(ratesRef)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14"><span className="text-lg">💰</span><span className="mt-0.5">Rates</span></button>
      </nav>

    </div>
  );
}
