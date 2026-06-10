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
    searchPlaceholder: "لوہا، پلاسٹک، تانبا تلاش کریں...", browseTitle: "اسکریپ کیٹیگریز",
    priceListTitle: "مارکیٹ کی لائیو ریٹ لسٹ", selectCityTitle: "شہر کا انتخاب کریں", lmeTitle: "ایل ایم ای (LME) لائیو ریٹس",
    rateUnit: "روپے / کلو", lmeUnit: "ڈالر / ٹن", navHome: "ہوم", navAds: "اشتہارات", navSell: "ابھی بیچیں", navChat: "چیٹ ان باکس",
    cities: { gujranwala: "گوجرانوالہ", lahore: "لاہور", karachi: "کراچی", multan: "ملتان" },
    lmeMetals: { copper: "تانبا (Copper)", aluminum: "ایلومینیم", zinc: "زنک (Zinc)", lead: "لیڈ (Lead)" },
    originSectionTitle: "اسکریپ کی قسم منتخب کریں", localScrap: "لوکل اسکریپ", localScrapDesc: "لوکل مارکیٹ کا مال دیکھنے کیلئے",
    importedScrap: "امپورٹڈ اسکریپ", importedScrapDesc: "امپورٹڈ کنٹینر کا اسٹاک دیکھنے کیلئے",
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)", localBadge: "مقامی اشتہار (0-15 کلومیٹر)", regionalBadge: "دوسرا ریجن (>80 کلومیٹر)",
    callSeller: "فوری فون کال 📞", whatsappSeller: "واٹس ایپ 💬", appChatSeller: "ایپ چیٹ 💬",
    postedIn: "لوکیشن", weightLabel: "کل وزن", loginBtn: "لاگ ان / رجسٹر", logoutBtn: "لاگ آؤٹ 👤",
    inboxTitle: "آپ کے ان ایپ پیغامات", chatPlaceholder: "یہاں اپنا پیغام لکھیں...", sendChatBtn: "بھیجیں",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور کمرشل یارڈز 👑", verifyActionBtn: "فیکٹری اسٹور رجسٹر کریں ⭐",
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
    { id: "copper", nameKey: "cat3", price: "1,920" },
    { id: "aluminum", nameKey: "cat4", price: "480" },
    { id: "plastic", nameKey: "cat2", price: "105" }
  ],
  multan: [
    { id: "iron", nameKey: "cat1", price: "118" },
    { id: "copper", nameKey: "cat3", price: "1,820" }
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
  const [allAdsList] = useState(initialAdsData);
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
  const [formMainCat, setFormMainCat] = useState('iron');
  const [formSubCat, setFormSubCat] = useState('scrap');
  const [selectedAd, setSelectedAd] = useState<any | null>(null);
  const [showInbox, setShowInbox] = useState(false);
  const [showVerificationPortal, setShowVerificationPortal] = useState(false);
  const [selectedFactoryCatalog, setSelectedFactoryCatalog] = useState<any | null>(null);
  const [lmeRates, setLmeRates] = useState(lmeData);

  const t: any = translations[lang];

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    const timer = setTimeout(() => { setShowSplash(false); }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePostAdTrigger = () => { if (!isLoggedIn) { setShowAuth(true); } else { setShowPostAd(true); } };
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => { elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

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
    <div className="min-h-screen bg-[#f8fafc] pb-24 relative" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', textAlign: lang === 'ur' ? 'right' : 'left' }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {/* Clean Premium White Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center text-slate-900 p-6">
          <div className="text-center space-y-2">
            <div className="text-6xl animate-pulse">🏭</div>
            <h1 className="text-3xl font-black text-[#1e3a8a] tracking-wider">SCRAP WORLD</h1>
            <div className="w-12 h-1 bg-[#1e3a8a] rounded mx-auto mt-2"></div>
          </div>
        </div>
      )}

      {/* 👑 NEW DESIGN: MINIMALIST ICE-WHITE HEADER */}
      <header className="bg-white border-b border-slate-200 px-4 pt-4 pb-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">📅 {currentDate || "10 Jun 2026"}</span>
          <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-md font-bold">● LIVE MARKET</span>
        </div>

        <div className="flex justify-between items-center mb-5 gap-2">
          <div className="text-2xl font-black text-[#1e3a8a] tracking-wide">{t.appName}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else setShowAuth(true); }} className="bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg">{isLoggedIn ? t.logoutBtn : t.loginBtn}</button>
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg">{lang === 'en' ? 'اردو' : 'English'}</button>
          </div>
        </div>

        {/* Clean Line Action Row Buttons */}
        <div className="flex overflow-x-auto pb-1 scrollbar-none gap-2">
          <button onClick={handlePostAdTrigger} className="bg-[#1e3a8a] text-white text-xs font-bold px-5 py-2.5 rounded-xl whitespace-nowrap shadow-sm text-center">
            {t.sellScrap} <span className="block text-[8px] opacity-75 font-normal">(مال بیچیں)</span>
          </button>
          <button onClick={() => scrollToSection(feedRef)} className="bg-white text-slate-700 text-xs font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap border border-slate-200 text-center">
            {t.buyScrap} <span className="block text-[8px] opacity-50 font-normal">(مارکیٹ فیڈ)</span>
          </button>
          <button onClick={() => scrollToSection(ratesRef)} className="bg-white text-slate-700 text-xs font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap border border-slate-200 text-center">
            {t.rates} <span className="block text-[8px] opacity-50 font-normal">(تازہ ریٹ)</span>
          </button>
          <button onClick={handlePostAdTrigger} className="bg-green-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl whitespace-nowrap shadow-sm text-center">
            📢 {t.postAd} <span className="block text-[8px] opacity-75 font-normal">(اشتہار لگائیں)</span>
          </button>
        </div>

        {/* Simple Input Search */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center text-slate-700 shadow-inner">
          <span className="text-slate-400 mx-2">🔍</span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-transparent outline-none text-sm placeholder-slate-400 font-medium" />
        </div>
      </header>

      {/* Main Body Area */}
      <main className="px-4 mt-5">
        
        {/* Simple Toggle Filters for Stream Origin */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div onClick={() => setActiveOriginFilter(activeOriginFilter === 'local' ? 'all' : 'local')} className={`rounded-xl p-3.5 flex items-center justify-between border cursor-pointer transition-all ${activeOriginFilter === 'local' ? 'bg-blue-50 border-blue-400 font-bold' : 'bg-white border-slate-200'}`}>
            <div><span className="text-sm text-slate-800 block font-bold">{t.localScrap}</span><span className="text-[9px] text-slate-400 block mt-0.5">{t.localScrapDesc}</span></div>
            <span className="text-2xl">🇵🇰</span>
          </div>
          <div onClick={() => setActiveOriginFilter(activeOriginFilter === 'imported' ? 'all' : 'imported')} className={`rounded-xl p-3.5 flex items-center justify-between border cursor-pointer transition-all ${activeOriginFilter === 'imported' ? 'bg-green-50 border-green-400 font-bold' : 'bg-white border-slate-200'}`}>
            <div><span className="text-sm text-slate-800 block font-bold">{t.importedScrap}</span><span className="text-[9px] text-slate-400 block mt-0.5">{t.importedScrapDesc}</span></div>
            <span className="text-2xl">🚢</span>
          </div>
        </div>

        {/* Categories Clean System Matrix */}
        <div className="mb-3"><h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.browseTitle}</h2></div>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {appCategories.map((item, idx) => (
            <div key={idx} onClick={() => { if(item.cat === 'chaaloo') { setShowChaalooModal(true); } else { setActiveMainCatFilter(item.cat); setActiveSubCatFilter('all'); } }} className={`border rounded-xl p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${activeMainCatFilter === item.cat ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'bg-white border-slate-200 text-slate-700'}`}>
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold block truncate w-full">{lang === 'en' ? item.labelEn : item.labelUr}</span>
            </div>
          ))}
        </div>

        {/* Sub Categories Popup */}
        {showChaalooModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[200] flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl space-y-3">
              <div className="flex justify-between items-center border-b pb-2"><h3 className="font-bold text-sm text-slate-800">{t.chaalooTitle}</h3><button onClick={() => setShowChaalooModal(false)} className="text-slate-400 text-xs">✕</button></div>
              <div className="space-y-1.5">
                {Object.keys(t.subCats).map((key) => (
                  <button key={key} onClick={() => { setActiveMainCatFilter('chaaloo'); setActiveSubCatFilter(key); setShowChaalooModal(false); }} className={`w-full text-left p-3 rounded-lg border font-semibold text-xs ${activeSubCatFilter === key && activeMainCatFilter === 'chaaloo' ? 'bg-[#1e3a8a] text-white' : 'bg-slate-50 text-slate-700'}`}>{t.subCats[key]}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* B2B Verified Stores */}
        <div className="mb-4 mt-6 border-t border-slate-200 pt-4">
          <div className="mb-2"><h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.b2bTitle}</h2></div>
          <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-none">
            {verifiedFactories.map((store) => (
              <div key={store.id} onClick={() => setSelectedFactoryCatalog(store)} className="bg-white border border-slate-200 rounded-xl p-3.5 min-w-[220px] shadow-xs cursor-pointer flex flex-col justify-between">
                <div className="flex items-center gap-2"><span className="text-2xl bg-slate-50 p-1 rounded-lg border">{store.icon}</span><div><h4 className="font-bold text-xs text-slate-800 line-clamp-1">{lang === 'en' ? store.nameEn : store.nameUr}</h4><span className="text-[9px] text-amber-700 font-bold bg-amber-50 px-1.5 rounded mt-0.5 inline-block">{store.badge}</span></div></div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center"><span className="text-[9px] font-semibold text-slate-400">📍 {(t.cities as any)[store.city] || store.city}</span><span className="text-[10px] font-bold text-[#1e3a8a]">Catalog →</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Rates Module Display */}
        <div ref={ratesRef} className="pt-4 scroll-mt-4">
          <div className="mb-2"><h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.lmeTitle}</h2></div>
          <div className="flex overflow-x-auto pb-2 gap-2.5 scrollbar-none">
            {lmeRates.map((metal) => (
              <div key={metal.id} className="bg-white border border-slate-200 text-slate-800 rounded-xl p-3 min-w-[125px] shadow-xs flex flex-col justify-between">
                <div className="flex justify-between items-center"><span className="text-base bg-slate-50 p-1 rounded border">{metal.icon}</span><span className={`text-[10px] font-bold px-1 rounded ${metal.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{metal.change}</span></div>
                <div className="mt-3"><span className="text-[10px] font-semibold text-slate-400 block truncate">{(t.lmeMetals as any)[metal.key]}</span><span className="text-base font-black text-slate-800 block mt-0.5">${metal.price.toLocaleString()}</span></div>
              </div>
            ))}
          </div>

          <div className="mb-2 mt-5"><h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.priceListTitle} ({(t.cities as any)[selectedCity]})</h2></div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-1 divide-y divide-slate-100 mb-4">
            {(scrapRates as any)[selectedCity]?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center p-3">
                <div className="flex items-center gap-2"><span className="text-xl bg-slate-50 p-1 rounded-lg border">{item.icon}</span><span className="font-bold text-slate-700 text-xs">{(t as any)[item.nameKey]}</span></div>
                <div className="text-right"><span className="text-sm font-black text-green-600 block">Rs.{item.price}</span></div>
              </div>
            ))}
          </div>
          <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-none">
            {Object.keys(scrapRates).map((cityKey) => (
              <button key={cityKey} onClick={() => setSelectedCity(cityKey as any)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${selectedCity === cityKey ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'bg-white text-slate-600 border-slate-200'}`}>📍 {(t.cities as any)[cityKey]}</button>
            ))}
          </div>
        </div>

        {/* Marketplace Simple Clean Feed */}
        <div ref={feedRef} className="pt-4 border-t border-slate-200 scroll-mt-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">📋 {t.feedTitle}</h2>
          <div className="space-y-2.5 mb-6">
            {sortedFeedAds.map((ad) => (
              <div key={ad.id} onClick={() => setSelectedAd(ad)} className="bg-white rounded-xl p-3.5 border border-slate-200 flex justify-between items-center shadow-xs cursor-pointer hover:border-slate-300 transition-all">
                <div className="flex items-start gap-3 max-w-[75%]">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg border flex items-center justify-center text-xl shrink-0">{ad.icon}</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 leading-snug line-clamp-2">{lang === 'en' ? ad.titleEn : ad.titleUr}</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">📍 {(t.cities as any)[ad.city] || ad.city} • <span className="text-slate-500 font-bold bg-slate-100 px-1.5 rounded">{ad.weight}</span></p>
                  </div>
                </div>
                <div className="text-right shrink-0"><span className="text-sm font-black text-green-600 block">Rs.{ad.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Popups Overlays */}
      {selectedAd && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[120] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden pb-5">
            <div className="bg-slate-50 border-b p-3 flex justify-between items-center"><span className="text-xs font-bold text-slate-700 uppercase">📦 Stock Details</span><button onClick={() => setSelectedAd(null)} className="text-slate-400 font-bold text-xs">✕</button></div>
            <div className="p-4 space-y-4 text-left" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div className="w-full h-24 bg-slate-50 border rounded-xl flex items-center justify-center text-4xl">{selectedAd.icon}</div>
              <h3 className="text-sm font-bold text-slate-800">{lang === 'en' ? selectedAd.titleEn : selectedAd.titleUr}</h3>
              <div className="bg-slate-50 border p-3 rounded-lg flex justify-between items-center"><span className="text-xs font-semibold text-slate-400">Demanded Rate</span><span className="text-base font-black text-green-600">Rs.{selectedAd.price}</span></div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                <a href="tel:+923000000000" className="bg-[#1e3a8a] text-white text-center font-bold text-[11px] py-2.5 rounded-lg">Call 📞</a>
                <a href="https://wa.me/923000000000" target="_blank" className="bg-green-600 text-white text-center font-bold text-[11px] py-2.5 rounded-lg">WhatsApp 💬</a>
                <button onClick={() => { setSelectedAd(null); setShowInbox(true); }} className="bg-slate-100 text-slate-700 font-bold text-[11px] py-2.5 rounded-lg">App Chat 💬</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Bottom Sticky Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1.5 flex justify-around items-center z-50 shadow-md">
        <button onClick={() => { setShowInbox(false); setShowPostAd(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center text-[#1e3a8a] font-bold text-[10px] w-14">
          <span className="text-lg">🏠</span><span className="mt-0.5">{t.navHome}</span>
        </button>
        <button onClick={() => scrollToSection(feedRef)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14">
          <span className="text-lg">📋</span><span className="mt-0.5">{t.navAds}</span>
        </button>
        <div className="relative -top-4 flex flex-col items-center justify-center">
          <button onClick={handlePostAdTrigger} className="w-12 h-12 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center shadow-md border-4 border-white transform active:scale-95 transition-all"><span className="text-xl font-light">+</span></button>
          <span className="text-[9px] font-bold text-slate-800 mt-0.5">{t.navSell}</span>
        </div>
        <button onClick={() => setShowInbox(true)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14">
          <span className="text-lg">💬</span><span className="mt-0.5">{t.navChat}</span>
        </button>
        <button onClick={() => scrollToSection(ratesRef)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14">
          <span className="text-lg">💰</span><span className="mt-0.5">Rates</span>
        </button>
      </nav>

    </div>
  );
}
