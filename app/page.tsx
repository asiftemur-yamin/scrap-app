'use client';

import { useState, useEffect, useRef } from 'react';

// 👑 LIVE CONNECTED DATABASE KEYS
const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

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
    rateUnit: "Rs / Kg", navHome: "Home", navAds: "My Ads", navSell: "Sell Now", navChat: "Chat Inbox",
    cities: { gujranwala: "Gujranwala", lahore: "Lahore", karachi: "Karachi", multan: "Multan" },
    localScrap: "Local Scrap", localScrapDesc: "Filter Pakistani local market material",
    importedScrap: "Imported Scrap", importedScrapDesc: "Filter international imported stock",
    feedTitle: "Scrap Marketplace Feed", loginBtn: "Login / Register", logoutBtn: "Logout 👤",
    chaalooTitle: "Chaaloo Maal Sub-Categories ⚡",
    subCats: { all: "Show All Maal", compressor: "Chaaloo Compressor 💨", motor: "Chaaloo Motor ⚙️", generator: "Chaaloo Generator ⚡", other: "Other Useable Items 📦" }
  },
  ur: {
    appName: "اسکریپ ورلڈ", sellScrap: "اسکریپ بیچیں", buyScrap: "اسکریپ خریدیں", rates: "لائیو ریٹس", postAd: "اشتہار لگائیں",
    searchPlaceholder: "لوہا، پلاسٹک، تانبا تلاش کریں...", browseTitle: "اسکریپ کیٹیگریز (فلٹر لگانے کیلئے کلک کریں)",
    priceListTitle: "مارکیٹ کی لائیو ریٹ لسٹ", selectCityTitle: "شہر کا انتخاب کریں", lmeTitle: "ایل ایم ای (LME) لائیو ریٹس",
    rateUnit: "روپے / کلو", navHome: "ہوم", navAds: "اشتہارات", navSell: "ابھی بیچیں", navChat: "چیٹ ان باکس",
    cities: { gujranwala: "گوجرانوالہ", lahore: "لاہور", karachi: "کراچی", multan: "ملتان" },
    originSectionTitle: "اسکریپ کی قسم منتخب کریں", localScrap: "لوکل اسکریپ", localScrapDesc: "لوکل مارکیٹ کا مال دیکھنے کیلئے",
    importedScrap: "امپورٹڈ اسکریپ", importedScrapDesc: "امپورٹڈ کنٹینر کا اسٹاک دیکھنے کیلئے",
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)", loginBtn: "لاگ ان / رجسٹر", logoutBtn: "لاگ آؤٹ 👤",
    chaalooTitle: "چالو مال کی کیٹیگریز ⚡",
    subCats: { all: "سب چالو مال دکھائیں", compressor: "چالو کلیلر 💨", motor: "چالو موٹر ⚙️", generator: "چالو جنریٹر ⚡", other: "دیگر چالو سامان / Other 📦" }
  }
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [lang, setLang] = useState<'en' | 'ur'>('ur');
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  
  const ratesRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const [scrapRates, setScrapRates] = useState<any[]>([]);
  const [allAdsList, setAllAdsList] = useState<any[]>([]);
  const [appSettings, setAppSettings] = useState({ app_name: 'SCRAP WORLD', logo_url: '' });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMainCatFilter, setActiveMainCatFilter] = useState<string>('all');
  const [activeSubCatFilter, setActiveSubCatFilter] = useState<string>('all');
  const [showChaalooModal, setShowChaalooModal] = useState(false);
  const [activeOriginFilter, setActiveOriginFilter] = useState<string>('all');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPostAd, setShowPostAd] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any | null>(null);

  const [formItemName, setFormItemName] = useState('');
  const [formMainCat, setFormMainCat] = useState('iron');
  const [formSubCat, setFormSubCat] = useState('scrap');
  const [formPrice, setFormPrice] = useState('');
  const [formUnit, setFormUnit] = useState('kg');
  const [formAbout, setFormAbout] = useState('');
  const [formWeight, setFormWeight] = useState('');

  const t: any = translations[lang];

  const fetchLiveData = async () => {
    try {
      const resRates = await fetch(`${SUPABASE_URL}/rest/v1/mandi_rates?select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataRates = await resRates.json();
      if(Array.isArray(dataRates)) setScrapRates(dataRates);

      const resAds = await fetch(`${SUPABASE_URL}/rest/v1/user_ads?status=eq.approved&select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataAds = await resAds.json();
      if(Array.isArray(dataAds)) setAllAdsList(dataAds);

      const resSettings = await fetch(`${SUPABASE_URL}/rest/v1/app_settings?id=eq.1&select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataSettings = await resSettings.json();
      if(dataSettings && dataSettings[0]) setAppSettings(dataSettings[0]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    fetchLiveData();
    const timer = setTimeout(() => { setShowSplash(false); }, 1500);
    return () => clearTimeout(timer);
  }, [selectedCity]);

  const handlePostAdTrigger = () => { if (!isLoggedIn) { setShowAuth(true); } else { setShowPostAd(true); } };
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => { elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const handlePublishAd = async () => {
    if (!formItemName || !formPrice) {
      alert("Item ka Naam aur Rate lazmi likhein!");
      return;
    }

    const newAdObj = {
      title: formItemName,
      city: selectedCity,
      main_cat: formMainCat,
      sub_cat: formSubCat,
      price: formPrice,
      unit: formUnit,
      weight: formWeight || "1 Lot",
      about: formAbout,
      status: "pending"
    };

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_ads`, {
        method: 'POST',
        headers: { 
          "apikey": SUPABASE_KEY, 
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAdObj)
      });
      alert("📢 Ad Review ke liye bhej diya gaya hai! Admin ke approve karte hi live ho jayega.");
      setFormItemName(''); setFormPrice(''); setFormAbout(''); setFormWeight('');
      setShowPostAd(false);
    } catch (e) {
      alert("Error.");
    }
  };

  const currentCityRates = scrapRates.filter(r => r.city === selectedCity);

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24 relative" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', textAlign: lang === 'ur' ? 'right' : 'left' }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>

      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            {appSettings.logo_url ? <img src={appSettings.logo_url} className="w-20 h-20 mx-auto rounded-xl object-cover mb-2" /> : <div className="text-7xl animate-bounce">🏭</div>}
            <h1 className="text-4xl font-black text-amber-400">{appSettings.app_name}</h1>
          </div>
        </div>
      )}

      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1.5">
          <span className="text-[11px] font-black bg-white/10 px-3 py-1 rounded-full">📅 {currentDate}</span>
          <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full font-black">● LIVE MANDI</span>
        </div>

        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            {appSettings.logo_url && <img src={appSettings.logo_url} className="w-8 h-8 rounded-lg object-cover" />}
            <div className="text-2xl font-black tracking-wider text-amber-400">{appSettings.app_name}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { if (isLoggedIn) setIsLoggedIn(false); else setShowAuth(true); }} className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full">{isLoggedIn ? t.logoutBtn : t.loginBtn}</button>
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30">{lang === 'en' ? 'اردو' : 'English'}</button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-3 scrollbar-none gap-2">
          <button onClick={handlePostAdTrigger} className="bg-[#0066cc] text-white text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap">{t.sellScrap}</button>
          <button onClick={() => scrollToSection(feedRef)} className="bg-white text-[#1a365d] text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap">{t.buyScrap}</button>
          <button onClick={() => scrollToSection(ratesRef)} className="bg-white text-[#1a365d] text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap">{t.rates}</button>
          <button onClick={handlePostAdTrigger} className="bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-full whitespace-nowrap">📢 {t.postAd}</button>
        </div>
      </header>

      <main className="px-4 mt-6">
        <div ref={ratesRef} className="scroll-mt-4">
          <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none">
            {['gujranwala', 'lahore', 'karachi', 'multan'].map((cityKey) => (
              <button key={cityKey} onClick={() => setSelectedCity(cityKey as any)} className={`px-5 py-2.5 text-xs font-black rounded-xl border whitespace-nowrap ${selectedCity === cityKey ? 'bg-blue-900 text-white' : 'bg-white text-slate-600'}`}>📍 {(t.cities as any)[cityKey]}</button>
            ))}
          </div>

          <div className="mb-2 mt-3"><h2 className="text-base font-extrabold text-slate-800 uppercase">{t.priceListTitle} ({(t.cities as any)[selectedCity]})</h2></div>
          <div className="bg-white rounded-2xl border shadow-sm p-2 divide-y divide-slate-100 mb-6">
            {currentCityRates.length > 0 ? currentCityRates.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center p-3.5">
                <span className="font-bold text-slate-700 text-sm">🔩 {item.item_name}</span>
                <span className="text-base font-black text-green-600">Rs.{item.price} /kg</span>
              </div>
            )) : <div className="p-4 text-center text-xs text-slate-400 font-bold">No live rates updated for this city yet.</div>}
          </div>
        </div>

        <div ref={feedRef} className="pt-4 border-t border-slate-200 scroll-mt-4">
          <h2 className="text-lg font-black text-slate-900 mb-4">📋 {t.feedTitle}</h2>
          <div className="space-y-3.5 mb-6">
            {allAdsList.filter(ad => ad.city === selectedCity).map((ad) => (
              <div key={ad.id} onClick={() => setSelectedAd(ad)} className="bg-white rounded-2xl p-4 border flex justify-between items-center shadow-sm cursor-pointer">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">{ad.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">📍 {(t.cities as any)[ad.city]} • <span className="text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded">{ad.weight}</span></p>
                </div>
                <span className="text-base font-black text-green-600">Rs.{ad.price} <span className="text-[10px] text-slate-400">/{ad.unit}</span></span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showPostAd && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[400] flex flex-col overflow-y-auto pb-12">
          <div className="bg-[#1a365d] text-white p-4 sticky top-0 flex items-center justify-between">
            <button onClick={() => setShowPostAd(false)} className="bg-white/10 font-bold px-3 py-2 rounded-xl">← Back</button>
            <h3 className="text-sm font-black uppercase">📢 Post Advertisement</h3>
            <div></div>
          </div>
          <div className="p-5 max-w-lg mx-auto w-full space-y-4">
            <input type="text" value={formItemName} onChange={(e) => setFormItemName(e.target.value)} placeholder="Item Name / Maal ka Naam" className="w-full bg-white border rounded-xl p-3.5 text-sm font-bold" />
            <select value={formMainCat} onChange={(e) => setFormMainCat(e.target.value)} className="w-full bg-white border rounded-xl p-3.5 text-sm font-bold">
              <option value="iron">Iron / Loha</option>
              <option value="plastic">Plastic</option>
              <option value="copper">Copper / Tamba</option>
              <option value="aluminum">Aluminum</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="Price / Rate" className="w-full bg-white border rounded-xl p-3 text-sm font-bold text-green-600" />
              <select value={formUnit} onChange={(e) => setFormUnit(e.target.value)} className="w-full bg-white border rounded-xl p-3 text-sm font-bold">
                <option value="kg">Per Kg</option>
                <option value="ton">Per Ton</option>
                <option value="mund">Per Mund</option>
              </select>
            </div>
            <input type="text" value={formWeight} onChange={(e) => setFormWeight(e.target.value)} placeholder="Total Available Weight (e.g., 5 Ton)" className="w-full bg-white border rounded-xl p-3 text-xs font-bold" />
            <textarea rows={3} value={formAbout} onChange={(e) => setFormAbout(e.target.value)} placeholder="About Maal / Tafseelat" className="w-full bg-white border rounded-xl p-3 text-xs font-medium"></textarea>
            <button onClick={handlePublishAd} className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-md">Publish Ad Live 📢</button>
          </div>
        </div>
      )}

      {showAuth && (
        <div className="fixed inset-0 bg-[#f2f6fa] z-[300] flex flex-col justify-center p-4">
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-6 space-y-4 text-center">
            <h2 className="text-xl font-black text-[#1a365d]">Account Security Verification</h2>
            <button onClick={() => { setIsLoggedIn(true); setShowAuth(false); setShowPostAd(true); }} className="w-full bg-[#0066cc] text-white font-black py-3.5 rounded-xl shadow">Quick Bypass Login 🔑</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-2 flex justify-around items-center z-50 shadow-lg">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center text-[#0066cc] font-bold text-[10px]"><span className="text-lg">🏠</span><span>Home</span></button>
        <button onClick={handlePostAdTrigger} className="w-12 h-12 bg-[#0066cc] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">+</button>
        <button onClick={() => scrollToSection(ratesRef)} className="flex flex-col items-center text-slate-400 font-medium text-[10px]"><span className="text-lg">💰</span><span>Rates</span></button>
      </nav>
    </div>
  );
}
