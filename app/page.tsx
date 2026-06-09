'use client';

import { useState, useEffect, useRef } from 'react';

// 1. EXTENDED ADS DATABASE (With Status Alignment for Admin Control)
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", mainCat: "iron", subCat: "scrap", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", status: "approved", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", mainCat: "copper", subCat: "scrap", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", status: "approved", desc: "High quality stripped electrical copper wire scrap. Clean shining stock, ready for delivery." },
  { id: 3, titleEn: "Chaaloo Industrial Air Compressor 200L", titleUr: "چالو انڈسٹریل ائیر کمپریسر 200L", city: "gujranwala", mainCat: "chaaloo", subCat: "compressor", price: "45,000", unit: "piece", weight: "1 unit", isFeatured: true, origin: "local", icon: "💨", status: "approved", desc: "Perfect working condition 3-phase piston air compressor, suitable for recycling plants or workshops." },
  { id: 4, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", mainCat: "aluminum", subCat: "scrap", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", status: "approved", desc: "Compressed aluminum drink beverage can bundles. Total weight 35 munds loaded in Lahore Badami Bagh." },
  { id: 5, titleEn: "Useable Industrial Electric Motor 5HP (Chaaloo)", titleUr: "صنعتی الیکٹرک موٹر 5HP (چالو مال)", city: "gujranwala", mainCat: "chaaloo", subCat: "motor", price: "16,500", unit: "piece", weight: "2 units", isFeatured: true, origin: "local", icon: "⚙️", status: "pending", desc: "Working condition 5HP copper winding motors removed from textile plant clearance." }
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
    postedIn: "Posted in", weightLabel: "Total Weight", typeLabel: "Stock Type", loginBtn: "Login / Register", logoutBtn: "Logout 👤",
    inboxTitle: "Your App Messages", chatPlaceholder: "Type your scrap offer here...", sendChatBtn: "Send",
    b2bTitle: "Verified Factories & Commercial Yards 👑", verifyActionBtn: "Register Factory Store ⭐",
    buyPriceLabel: "Buying Rate", sellPriceLabel: "Selling Rate", catalogTitle: "Routine Catalog & Stock Availability",
    portalTitle: "Factory Verification Registration", portalDesc: "Pay a nominal security verification fee to post your daily bulk routine catalog rates.",
    companyNameLabel: "Official Factory / Business Name", storeTypeLabel: "Select Store/Plant Type", payFeeBtn: "Pay Verification Fee & Activate Store 💳",
    authTitleLogin: "Welcome Back", emailLabel: "Email Address", passLabel: "Password", signIn: "Sign In",
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
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)", localBadge: "مقامی اشتہار (0-15 کلومیٹر)", regionalBadge: "دوسرا ریجن (>80 کلومیٹر)",
    callSeller: "فوری فون کال 📞", whatsappSeller: "واٹس ایپ 💬", appChatSeller: "ایپ چیٹ 💬",
    postedIn: "لوکیشن", weightLabel: "کل وزن", typeLabel: "مال کی قسم", loginBtn: "لاگ ان / رجسٹر", logoutBtn: "لاگ آؤٹ 👤",
    inboxTitle: "آپ کے ان ایپ پیغامات", chatPlaceholder: "یہاں اپنا پیغام لکھیں...", sendChatBtn: "بھیجیں",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور کمرشل یارڈز 👑 (ریٹ دیکھنے کیلئے کلک کریں)", verifyActionBtn: "فیکٹری اسٹور رجسٹر کریں ⭐",
    buyPriceLabel: "خرید ریٹ", sellPriceLabel: "بیچ ریٹ", catalogTitle: "روزمرہ کا کیٹلاگ اور مال کی دستیابی",
    portalTitle: "فیکٹری ویریفیکیشن رجسٹریشن پورٹل", portalDesc: "روزانہ اور ماہانہ ہول سیل ریٹ لسٹ لگانے کیلئے تصدیقی فیس جمع کروائیں۔",
    companyNameLabel: "فیکٹری یا کاروباری ادارے کا نام", storeTypeLabel: "ادارے کی قسم منتخب کریں", payFeeBtn: "ویریفیکیشن فیس ادا کر کے اسٹور چلائیں 💳",
    authTitleLogin: "لاگ ان کریں", emailLabel: "ای میل ایڈریس", passLabel: "پاس ورڈ", signIn: "سائن ان کریں",
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
    { id: "copper", nameKey: "cat3", icon: "🔌", price: "1,880" }
  ]
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [lang, setLang] = useState<'en' | 'ur'>('ur');
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  
  const ratesRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // 👑 DYNAMIC STATES FOR ADMIN PANEL CONTROL
  const [appCategories, setAppCategories] = useState(initialCategories);
  const [allAdsList, setAllAdsList] = useState(initialAdsData);
  const [verifiedFactories, setVerifiedFactories] = useState(initialVerifiedStores);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'ads' | 'categories' | 'factories'>('ads');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Form states for adding dynamic content
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatNameUr, setNewCatNameUr] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📦');

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
    const timer = setTimeout(() => { setShowSplash(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePostAdTrigger = () => { if (!isLoggedIn) { setShowAuth(true); } else { setShowPostAd(true); } };
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => { elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  // 👑 ADMIN METHOD ENGINE
  const handleVerifyPasscode = () => {
    if (adminPasscode === '78612') { // Locked Secret Passcode
      setIsAdminAuthenticated(true);
    } else {
      alert("Ghalt Passcode Hai! Aap Admin Nahi Hain.");
    }
  };

  const handleAdStatusChange = (id: number, newStatus: string) => {
    setAllAdsList(prev => prev.map(ad => ad.id === id ? { ...ad, status: newStatus } : ad));
  };

  const handleAddNewCategory = () => {
    if (!newCatNameEn || !newCatNameUr) return;
    const newCatKey = `cat_key_${Date.now()}`;
    setAppCategories([...appCategories, { cat: newCatKey, labelEn: newCatNameEn, labelUr: newCatNameUr, icon: newCatIcon }]);
    setNewCatNameEn(''); setNewCatNameUr('');
    alert("Nayi Category Success se Add ho gayi!");
  };

  const handleRemoveCategory = (catKey: string) => {
    setAppCategories(prev => prev.filter(c => c.cat !== catKey));
  };

  // Filter ads engine (filters out pending ads from normal users view)
  const getFilteredAndSortedAds = (): any[] => {
    let dataset = allAdsList.filter(ad => ad.status === 'approved'); // Admin Approved Ads Only

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

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            <div className="text-7xl animate-bounce">🏭♻️</div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 tracking-widest">CONTROL ROOM SYSTEM ACTIVE</p>
          </div>
        </div>
      )}

      {/* App Header */}
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1.5">
          <span className="text-[11px] font-black tracking-wide bg-white/10 px-3 py-1 rounded-full">📅 {currentDate || "09 Jun 2026"}</span>
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
          <button onClick={handlePostAdTrigger} className="bg-[#0066cc] text-white text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shadow-sm">{t.sellScrap}</button>
          <button onClick={() => scrollToSection(feedRef)} className="bg-white text-[#1a365d] text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border">{t.buyScrap}</button>
          <button onClick={() => scrollToSection(ratesRef)} className="bg-white text-[#1a365d] text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap border">{t.rates}</button>
        </div>

        <div className="mt-2 bg-white rounded-lg p-3 flex items-center shadow-inner text-slate-700">
          <span className="text-slate-400 mx-2">🔍</span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-transparent outline-none text-sm font-medium text-slate-800" />
        </div>
      </header>

      {/* Main Container Area */}
      <main className="px-4 mt-6">
        
        {/* Categories Matrix Grid Loaded From Dynamic Admin States */}
        <div className="mb-4 flex justify-between items-center"><h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wide">{t.browseTitle}</h2></div>
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {appCategories.map((item, idx) => (
            <div key={idx} onClick={() => { if(item.cat === 'chaaloo') { setShowChaalooModal(true); } else { setActiveMainCatFilter(item.cat); } }} className={`border rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-sm aspect-square cursor-pointer transition-all ${activeMainCatFilter === item.cat ? 'bg-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-700'}`}>
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

        {/* Marketplace Feed */}
        <div ref={feedRef} className="pt-4 border-t border-slate-200">
          <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4">📋 {t.feedTitle}</h2>
          <div className="space-y-3.5 mb-6">
            {sortedFeedAds.map((ad) => (
              <div key={ad.id} onClick={() => setSelectedAd(ad)} className="bg-white rounded-2xl p-4 border border-slate-200 flex justify-between items-center shadow-sm cursor-pointer">
                <div className="flex items-start space-x-3.5 gap-3">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">{ad.icon}</div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug">{lang === 'en' ? ad.titleEn : ad.titleUr}</h4>
                    <p className="text-[10px] font-semibold text-slate-400">📍 {ad.city} • <span className="text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded">{ad.weight}</span></p>
                  </div>
                </div>
                <div className="text-right shrink-0"><span className="text-base font-black text-green-600 block">Rs.{ad.price}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* LME and local price placeholders section references mapping */}
        <div ref={ratesRef} className="h-2"></div>
      </main>

      {/* 👑 MORE SLIDE OVER MENU (Hidden Entry point for admin room) */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[250] flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3"><h3 className="font-black text-base text-[#1a365d]">App Extra Options</h3><button onClick={() => setShowMoreMenu(false)} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">✕</button></div>
            <button onClick={() => { setShowMoreMenu(false); setShowAdminDashboard(true); }} className="w-full bg-red-50 text-red-700 border border-red-200 rounded-2xl p-4 flex items-center justify-between font-black text-sm">
              <span>🛠️ Admin Dashboard / Control Room</span>
              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">Secure</span>
            </button>
          </div>
        </div>
      )}

      {/* 🛠️ SECURE FULL-SCREEN ADMIN CONTROL ROOM DASHBOARD LAYER */}
      {showAdminDashboard && (
        <div className="fixed inset-0 bg-[#f8fafc] z-[500] flex flex-col overflow-y-auto">
          <div className="bg-slate-900 text-white p-4 sticky top-0 flex justify-between items-center shadow-md">
            <h3 className="text-sm font-black tracking-wider uppercase text-amber-400">👑 SCRAP WORLD CENTRAL CONTROL PANEL</h3>
            <button onClick={() => { setShowAdminDashboard(false); setIsAdminAuthenticated(false); }} className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full">Exit Panel ✕</button>
          </div>

          {!isAdminAuthenticated ? (
            /* Passcode Verification Box gate keeper layout */
            <div className="flex-1 flex items-center justify-center p-6 bg-slate-900">
              <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
                <span className="text-5xl block animate-pulse">🔐</span>
                <h4 className="text-white font-black text-base">Enter Master Security Code</h4>
                <p className="text-xs text-slate-400 font-medium">Type your confidential 5-digit security code to gain database control variables access mapping deployment.</p>
                <input type="password" value={adminPasscode} onChange={(e) => setAdminPasscode(e.target.value)} placeholder="•••••" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 text-center text-lg font-black tracking-widest outline-none" />
                <button onClick={handleVerifyPasscode} className="w-full bg-amber-500 text-slate-900 font-black text-xs py-3.5 rounded-xl uppercase tracking-wider">Unlock Secure System 🚀</button>
              </div>
            </div>
          ) : (
            /* True Authenticated Admin View Area Panel */
            <div className="p-4 space-y-6 max-w-3xl mx-auto w-full text-slate-800" dir="ltr">
              
              {/* Top Selector Navigation Tabs for admin engine */}
              <div className="grid grid-cols-3 gap-2 bg-slate-200 p-1.5 rounded-xl font-black text-xs text-center">
                <button onClick={() => setAdminActiveTab('ads')} className={`py-2.5 rounded-lg ${adminActiveTab === 'ads' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>Moderate Ads ({allAdsList.length})</button>
                <button onClick={() => setAdminActiveTab('categories')} className={`py-2.5 rounded-lg ${adminActiveTab === 'categories' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>Categories Tool ({appCategories.length})</button>
                <button onClick={() => setAdminActiveTab('factories')} className={`py-2.5 rounded-lg ${adminActiveTab === 'factories' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>Factories ({verifiedFactories.length})</button>
              </div>

              {/* TAB 1: MODERATE ADS INTERFACE (Accept / Reject) */}
              {adminActiveTab === 'ads' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-500 uppercase">Live Marketplace Ad Pool Control</h4>
                  <div className="space-y-3">
                    {allAdsList.map(ad => (
                      <div key={ad.id} className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <div className="flex gap-3">
                          <span className="text-3xl bg-slate-100 p-2 rounded-xl block shrink-0">{ad.icon}</span>
                          <div>
                            <h5 className="font-extrabold text-sm text-slate-900">{ad.titleEn}</h5>
                            <p className="text-[11px] font-bold text-slate-400">Rate: <span className="text-green-600">Rs.{ad.price}</span> • City: <span className="capitalize">{ad.city}</span></p>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-block mt-1 uppercase ${ad.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{ad.status}</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 self-end md:self-center">
                          {ad.status !== 'approved' && <button onClick={() => handleAdStatusChange(ad.id, 'approved')} className="bg-emerald-600 text-white text-[10px] font-black px-3 py-2 rounded-lg">Approve / Live ✓</button>}
                          <button onClick={() => handleAdStatusChange(ad.id, 'rejected')} className="bg-red-600 text-white text-[10px] font-black px-3 py-2 rounded-lg">Reject / Delete ✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CATEGORIES CONTROL TOOL (Add / Delete) */}
              {adminActiveTab === 'categories' && (
                <div className="space-y-4">
                  {/* Category Insertion Module Form block row component */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                    <h5 className="font-black text-xs text-slate-900 uppercase">Add New Scrap Category Variable</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={newCatNameEn} onChange={(e) => setNewCatNameEn(e.target.value)} placeholder="Category Name (English)" className="bg-slate-50 border rounded-xl p-3 text-xs font-bold outline-none" />
                      <input type="text" value={newCatNameUr} onChange={(e) => setNewCatNameUr(e.target.value)} placeholder="Category Name (Urdu)" className="bg-slate-50 border rounded-xl p-3 text-xs font-bold outline-none text-right" />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <select value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} className="bg-slate-50 border rounded-xl p-3 text-xs font-bold text-slate-700 outline-none">
                        <option value="🔩">🔩 Bolt/Iron</option><option value="⚙️">⚙️ Cog/Machine</option><option value="🏭">🏭 Factory</option><option value="📦">📦 Box/Mix</option>
                      </select>
                      <button onClick={handleAddNewCategory} className="bg-indigo-600 text-white text-xs font-black px-5 py-3 rounded-xl shadow">Push Category To Live App Row 🚀</button>
                    </div>
                  </div>

                  {/* Existing dynamic categories list stream grid view block */}
                  <h4 className="text-sm font-black text-slate-500 uppercase mt-6">Current Operational Categories Database</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {appCategories.map(cat => (
                      <div key={cat.cat} className="bg-white border rounded-xl p-3 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-2"><span className="text-xl">{cat.icon}</span><span className="text-xs font-black text-slate-700">{cat.labelEn}</span></div>
                        <button onClick={() => handleRemoveCategory(cat.cat)} className="text-red-500 font-black text-xs px-2 hover:bg-red-50 rounded">✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: VERIFIED FACTORIES AND COMMERICAL STORES CONTROL LAYER */}
              {adminActiveTab === 'factories' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-500 uppercase">Verified Plant Smelters Accounts Control</h4>
                  <div className="space-y-2">
                    {verifiedFactories.map(store => (
                      <div key={store.id} className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center">
                        <div className="flex items-center gap-3"><span className="text-3xl bg-slate-50 border p-1 rounded-xl">{store.icon}</span><div><h5 className="font-extrabold text-sm text-slate-900">{store.nameEn}</h5><span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black">{store.badge}</span></div></div>
                        <button onClick={() => { alert("Store Blocked From Live Deployment Catalog Streams Successfully!"); }} className="bg-slate-900 text-white text-[10px] font-black px-3 py-2 rounded-lg">Block Storage 🔒</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Sticky Bottom Navigation Bar Controls */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button onClick={() => { setShowInbox(false); setShowAdminDashboard(false); setActiveMainCatFilter('all'); setActiveSubCatFilter('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center text-[#0066cc] font-bold text-[10px] w-14"><span className="text-lg">🏠</span><span className="mt-0.5">{t.navHome}</span></button>
        <button onClick={() => scrollToSection(feedRef)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14"><span className="text-lg">📋</span><span className="mt-0.5">{t.navAds}</span></button>
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button onClick={handlePostAdTrigger} className="w-14 h-14 bg-[#0066cc] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transform active:scale-95 transition-all"><span className="text-2xl font-light">+</span></button>
          <span className="text-[10px] font-black text-[#0066cc] mt-0.5">{t.navSell}</span>
        </div>
        <button onClick={() => setShowInbox(true)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14"><span className="text-lg">💬</span><span className="mt-0.5">{t.navChat}</span></button>
        <button onClick={() => setShowMoreMenu(true)} className="flex flex-col items-center text-slate-400 font-medium text-[10px] w-14"><span className="text-lg">⣿</span><span className="mt-0.5">More</span></button>
      </nav>

    </div>
  );
}
