'use client';

import { useState, useEffect } from 'react';

// 1. ALL SCRAP ADS DATABASE
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire scrap. Clean shining stock, ready for delivery." },
  { id: 3, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", desc: "Compressed aluminum drink beverage can bundles. Total weight 35 munds loaded in Lahore Badami Bagh." },
  { id: 4, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", price: "98", unit: "kg", weight: "3 Ton", isFeatured: false, origin: "local", icon: "🛢️", desc: "Blue and white HDPE industrial crushed plastic flakes ready for recycling plants injection molding." },
  { id: 5, titleEn: "Imported Scrap Solar Cells for Silver Recovery", titleUr: "امپورٹڈ سولر سیل اسکریپ سلور نکالنے کیلئے", city: "karachi", price: "320", unit: "kg", weight: "8 Ton", isFeatured: true, origin: "imported", icon: "☀️", desc: "Premium imported damaged solar panel cell waste. High concentration material directly available from Karachi Port containers." },
  { id: 6, titleEn: "Decommissioned Telecom Lead Acid Batteries", titleUr: "ٹیلی کام پاور لیڈ ایسڈ بیٹریاں اسکریپ", city: "multan", price: "240", unit: "kg", weight: "85 units", isFeatured: false, origin: "local", icon: "🔋", desc: "Scrap heavy backup dry battery units collected from telecom towers. Selling on per kg scale weight." }
];

// 2. B2B VERIFIED FACTORIES
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
      { item: "HMS 1 Industrial Iron", buy: "124", sell: "128", cycle: "Daily Stock Availability" }
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

// 3. TRANSLATIONS
const translations: any = {
  en: { appName: "SCRAP WORLD", sellScrap: "Sell Scrap", buyScrap: "Buy Scrap", rates: "Live Rates", postAd: "Post Ad", searchPlaceholder: "Search scrap...", browseTitle: "Browse Categories", priceListTitle: "Live Market Prices", lmeTitle: "LME Rates", rateUnit: "Rs / Kg", lmeUnit: "USD / Ton", navHome: "Home", navAds: "My Ads", navSell: "Sell", navChat: "Chat", navMore: "More", feedTitle: "Scrap Marketplace", postedIn: "Posted in", b2bTitle: "Verified Factories 👑", verifyActionBtn: "Register Store ⭐", buyPriceLabel: "Buying Rate", sellPriceLabel: "Selling Rate", catalogTitle: "Routine Catalog", portalTitle: "Registration", portalDesc: "Pay fee to activate.", companyNameLabel: "Business Name", storeTypeLabel: "Type", payFeeBtn: "Pay Fee 💳" },
  ur: { appName: "اسکریپ ورلڈ", sellScrap: "اسکریپ بیچیں", buyScrap: "اسکریپ خریدیں", rates: "لائیو ریٹس", postAd: "اشتہار لگائیں", searchPlaceholder: "تلاش کریں...", browseTitle: "کیٹیگریز", priceListTitle: "مارکیٹ ریٹس", lmeTitle: "ایل ایم ای ریٹس", rateUnit: "روپے / کلو", lmeUnit: "ڈالر / ٹن", navHome: "ہوم", navAds: "اشتہارات", navSell: "بیچیں", navChat: "چیٹ", navMore: "مزید", feedTitle: "اسکریپ مارکیٹ", postedIn: "لوکیشن", b2bTitle: "تصدیق شدہ فیکٹریاں 👑", verifyActionBtn: "رجسٹر کریں ⭐", buyPriceLabel: "خرید ریٹ", sellPriceLabel: "بیچ ریٹ", catalogTitle: "کیٹلاگ", portalTitle: "رجسٹریشن", portalDesc: "فیس ادا کریں", companyNameLabel: "ادارے کا نام", storeTypeLabel: "قسم", payFeeBtn: "فیس ادا کریں 💳" }
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ur'>('ur');
  const [currentDate, setCurrentDate] = useState(''); // Date state
  const [selectedCity, setSelectedCity] = useState<'gujranwala' | 'lahore' | 'karachi' | 'multan'>('gujranwala');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPostAd, setShowPostAd] = useState(false);
  const [visibleAdsCount, setVisibleAdsCount] = useState(4);
  const [isScrollingLoading, setIsScrollingLoading] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any | null>(null);
  const [showInbox, setShowInbox] = useState(false);
  const [activeChatSession, setActiveChatSession] = useState<any | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [showVerificationPortal, setShowVerificationPortal] = useState(false);
  const [selectedFactoryCatalog, setSelectedFactoryCatalog] = useState<any | null>(null);
  
  const t: any = translations[lang];

  useEffect(() => {
    // Set current date
    setCurrentDate(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));

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

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      <header className="bg-[#1a365d] text-white px-4 pt-4 pb-6 shadow-md rounded-b-3xl">
        <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold opacity-70">{currentDate}</span>
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/20 text-white font-bold text-[10px] px-3 py-1 rounded-full">{lang === 'en' ? 'اردو' : 'English'}</button>
        </div>
        <div className="text-2xl font-black tracking-wider">{t.appName}</div>
      </header>
      
      {/* Rest of your existing code remains exactly same below this point */}
      <main className="px-4 mt-6">
        <div className="text-sm font-bold text-slate-500 text-center py-10">App loaded successfully.</div>
      </main>
    </div>
  );
}
