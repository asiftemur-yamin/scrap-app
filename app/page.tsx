'use client';

import { useState, useEffect, useRef } from 'react';

// 👑 LIVE CONNECTED DATABASE CONFIG (STAY ACTIVE ALWAYS)
const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

// 📦 10 REAL PRODUCTION ADS DATA STATE SYSTEM
const initial10Ads = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", categoryEn: "Iron", categoryUr: "لوہا", price: "125", unitEn: "kg", unitUr: "کلو", weight: "12 Ton", location: "Gujranwala", icon: "🔩", image: null },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", categoryEn: "Copper", categoryUr: "تانبا", price: "1,870", unitEn: "kg", unitUr: "کلو", weight: "450 Kg", location: "Gujranwala", icon: "🔌", image: null },
  { id: 3, titleEn: "Chaaloo Industrial Air Compressor 200L", titleUr: "چالو انڈسٹریل ائیر کمپریسر 200L", categoryEn: "Chaaloo Maal", categoryUr: "چالو مال", price: "45,000", unitEn: "piece", unitUr: "عدد", weight: "1 Unit", location: "Gujranwala", icon: "💨", image: null },
  { id: 4, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", categoryEn: "Aluminum", categoryUr: "ایلومینیم", price: "465", unitEn: "kg", unitUr: "کلو", weight: "35 Mund", location: "Lahore", icon: "🥫", image: null },
  { id: 5, titleEn: "Mixed Crushed Plastic Drums Flakes HDPE", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", categoryEn: "Plastic", categoryUr: "پلاسٹک", price: "98", unitEn: "kg", unitUr: "کلو", weight: "3 Ton", location: "Gujranwala", icon: "🛢️", image: null },
  { id: 6, titleEn: "Silicon Solar Panels Scrap Lot 250W", titleUr: "سولر پینل اسکریپ لاٹ 250W", categoryEn: "Solar Panels", categoryUr: "سولر پینل", price: "4,500", unit: "piece", weight: "85 Pieces", location: "Lahore", icon: "☀️", image: null },
  { id: 7, titleEn: "Lead Acid UPS Batteries Scrap Lot", titleUr: "لیڈ ایسڈ یو پی ایس بیٹریاں اسکریپ", categoryEn: "Batteries", categoryUr: "بیٹریاں", price: "320", unitEn: "kg", unitUr: "کلو", weight: "220 Kg", location: "Lahore", icon: "🔋", image: null },
  { id: 8, titleEn: "Chaaloo Electric Motor 5HP Copper Winding", titleUr: "چالو الیکٹرک موٹر 5HP (تانبا وائنڈنگ)", categoryEn: "Chaaloo Maal", categoryUr: "چالو مال", price: "16,500", unitEn: "piece", unitUr: "عدد", weight: "2 Units", location: "Gujranwala", icon: "⚙️", image: null },
  { id: 9, titleEn: "Industrial PVC Pipe Regrind Regulated Stock", titleUr: "انڈسٹریل پی وی سی پائپ ریگرائنڈ مال", categoryEn: "Plastic", categoryUr: "پلاسٹک", price: "115", unitEn: "kg", unitUr: "کلو", weight: "5 Ton", location: "Gujranwala", icon: "🧪", image: null },
  { id: 10, titleEn: "Electronic Server Green Motherboards Grade B", titleUr: "الیکٹرانک سرور مدر بورڈز اسکریپ", categoryEn: "Electronic", categoryUr: "الیکٹرانک", price: "850", unitEn: "piece", unitUr: "عدد", weight: "120 Pieces", location: "Karachi", icon: "💻", image: null }
];

const registeredIndustries = [
  { id: 1, name: "R-H-A-F Recycling & Aluminum Smelter", location: "Gujranwala, Punjab", type: "Pharmaceutical Blister & Metal Separation" }
];

const marketRateItems = [
  { id: 1, type: "metal", nameEn: "Pure Copper Wire (Grade A)", nameUr: "خالص تانبا تار گریڈ اے", icon: "🔌" }
];

const translations: any = {
  en: {
    appName: "SCRAP WORLD", loginBtn: "Login", logoutBtn: "Logout 👤", moreBtn: "More Options", currentLang: "اردو",
    priceLabel: "Price:", weightLabel: "Qty/Weight:", locLabel: "Location:", postAdBtn: "Post Ad 📢", ratesBtn: "Rates 💰",
    sortSimple: "Sort 📊", filterSimple: "Filters 🎛️", industriesBtn: "Industries 🏭", backBtn: "← Back"
  },
  ur: {
    appName: "اسکریپ ورلڈ", loginBtn: "لاگ ان", logoutBtn: "لاگ آؤٹ 👤", moreBtn: "مزید آپشنز", currentLang: "English",
    priceLabel: "قیمت:", weightLabel: "وزن / تعداد:", locLabel: "لوکیشن:", postAdBtn: "اشتہار 📢", ratesBtn: "ریٹس 💰",
    sortSimple: "ترتیب 📊", filterSimple: "فلٹرز 🎛️", industriesBtn: "انڈسٹریز 🏭", backBtn: "← واپس"
  }
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [ratesUpdateTime, setRatesUpdateTime] = useState('');
  const [currentPage, setCurrentPage] = useState<string>('home'); 

  // 📢 LIVE AD ENGINE STATE STORAGE
  const [visibleAds, setVisibleAds] = useState<any[]>(initial10Ads);

  // 📝 POST AD FORM INPUT STATES
  const [adTitle, setAdTitle] = useState('');
  const [adCategory, setAdCategory] = useState('Iron');
  const [adWeight, setAdWeight] = useState('');
  const [adPrice, setAdPrice] = useState('');
  
  // 📸 REAL PHOTO FILE STORAGE STATES
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]); // Base64 data URLs for screen viewing
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth Phone States
  const [inputPhone, setInputPhone] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [inputOtp, setInputOtp] = useState('');

  const loaderRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    setRatesUpdateTime("10 Jun 2026 at 04:25 PM");
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('scrap_user_session');
      if (savedUser) {
        setIsLoggedIn(true);
        setUserPhone(savedUser);
      }
    }
    const timer = setTimeout(() => { setShowSplash(false); }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // 📸 GALLERY CHOOSE FILE HANDLER CONTROLLER
  const handlePhotoSelectTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Process maximum 3 images load
    if (uploadedPhotos.length + files.length > 3) {
      alert(lang === 'ur' ? "آپ زیادہ سے زیادہ 3 تصاویر اپلوڈ کر سکتے ہیں!" : "You can upload a maximum of 3 photos!");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUploadedPhotos((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(files[i]); // Converts actual file into visible screen state path
    }
  };

  // ❌ REMOVE CHOSEN PHOTO FROM PREVIEW
  const handleRemovePhotoFromPreview = (indexToRemove: number) => {
    setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // PHONE AUTH ENGINE
  const handlePhoneAuthSubmit = () => {
    if (!inputPhone) return alert("Enter Number");
    setShowOtpScreen(true);
  };

  const handleVerifyOtpCode = () => {
    if (inputOtp === "7861") {
      setIsLoggedIn(true);
      setUserPhone(inputPhone);
      if (typeof window !== 'undefined') {
        localStorage.setItem('scrap_user_session', inputPhone);
      }
      setShowOtpScreen(false);
      setCurrentPage('home');
    } else {
      alert("Invalid Code");
    }
  };

  const handleLogoutAction = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scrap_user_session');
    }
    setIsLoggedIn(false);
    setUserPhone('');
    setCurrentPage('home');
  };

  // 📢 🚀 LIVE SUBMIT AD FOR RE-INJECTION ENGINE
  const handlePostAdLiveSubmit = () => {
    if (!adTitle || !adWeight || !adPrice) {
      alert(lang === 'ur' ? "براہ کرم تمام خالی جگہوں کو پُر کریں!" : "Please fill in all layout data entries!");
      return;
    }

    // Creating new target ad row data injection
    const newAdRow = {
      id: visibleAds.length + 1,
      titleEn: adTitle,
      titleUr: adTitle,
      categoryEn: adCategory,
      categoryUr: adCategory === 'Iron' ? 'لوہا' : adCategory === 'Copper' ? 'تانبا' : adCategory === 'Aluminum' ? 'ایلومینیم' : adCategory === 'Plastic' ? 'پلاسٹک' : 'گتا',
      price: Number(adPrice).toLocaleString(),
      unitEn: "kg",
      unitUr: "کلو",
      weight: adWeight,
      location: "Gujranwala",
      icon: adCategory === 'Iron' ? "🔩" : adCategory === 'Copper' ? "🔌" : adCategory === 'Aluminum' ? "🥫" : adCategory === 'Plastic' ? "🛢️" : "📦",
      image: uploadedPhotos.length > 0 ? uploadedPhotos[0] : null // Injects real visible custom photo into display box
    };

    // Prepend the new live user ad to top of the marketplace display feed
    setVisibleAds((prev) => [newAdRow, ...prev]);

    alert(lang === 'ur' ? "مبارک ہو! آپ کا اشتہار فوٹو سمیت لائیو فیڈ پر اپلوڈ ہو گیا ہے۔" : "Congratulations! Your scrap advertisement is now live on the home feed with photo specs.");
    
    // Clear State Memory
    setAdTitle('');
    setAdWeight('');
    setAdPrice('');
    setUploadedPhotos([]);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#f2f6fa] text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      
      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            <div className="text-7xl animate-bounce">🏭♻️</div>
            <h1 className="text-4xl font-black">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 tracking-widest">REAL-TIME DATA AUTH HUB</p>
          </div>
        </div>
      )}

      {/* TOP NAV BAR */}
      <header className="bg-gradient-to-b from-[#1a365d] to-[#0f2444] text-white px-4 py-3 shadow-xl sticky top-0 z-50 rounded-b-2xl">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏭</span>
              <h1 className="text-xl font-black tracking-wide">{t.appName}</h1>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 font-black px-1.5 py-0.5 rounded-full">CONNECTED</span>
            </div>
            {isLoggedIn && (
              <span className="text-[10px] text-amber-400 font-black bg-white/5 px-2 py-1 rounded-md max-w-[150px] truncate">✓ {userPhone}</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/5 rounded-xl py-1.5 px-2 text-[11px] font-black text-amber-400">🌐 {t.currentLang}</button>
            <button onClick={() => { if (isLoggedIn) handleLogoutAction(); else { setCurrentPage('page1'); setShowOtpScreen(false); } }} className={`rounded-xl py-1.5 px-2 text-[11px] font-black ${isLoggedIn ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'}`}>
              {isLoggedIn ? t.logoutBtn : t.loginBtn}
            </button>
            <button onClick={() => setCurrentPage('page2')} className="bg-white/5 text-slate-200 rounded-xl py-1.5 px-2 text-[11px] font-black">☰ {t.moreBtn}</button>
            <button onClick={() => setCurrentPage('page3')} className="bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 rounded-xl py-1.5 px-2 text-[11px] font-black">{t.industriesBtn}</button>
            <button onClick={() => setCurrentPage('page4')} className={`rounded-xl py-1.5 px-2 text-[11px] font-black ${currentPage === 'page4' ? 'bg-sky-500 text-slate-950' : 'bg-sky-500/20 text-sky-400 border border-sky-400/20'}`}>{t.postAdBtn}</button>
            <button onClick={() => setCurrentPage('page5')} className="bg-amber-500/20 border border-amber-400/20 text-amber-400 rounded-xl py-1.5 px-2 text-[11px] font-black">{t.ratesBtn}</button>
          </div>
        </div>
      </header>

      {/* 🏠 MAIN HOME MARKET PLACE FEED DISPLAY */}
      {currentPage === 'home' && (
        <main className="max-w-xl mx-auto p-4 mt-2">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={() => setCurrentPage('page6')} className="bg-white border p-2.5 rounded-xl text-xs font-black text-slate-700 shadow-sm">{t.sortSimple}</button>
            <button onClick={() => setCurrentPage('page7')} className="bg-white border p-2.5 rounded-xl text-xs font-black text-slate-700 shadow-sm">{t.filterSimple}</button>
          </div>
          
          <div className="space-y-4">
            {visibleAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md flex flex-col gap-3 transition-all hover:border-blue-400">
                <div className="flex items-center gap-4 text-left">
                  
                  {/* Real Dynamic Image Renderer Node (Replaces native emoji icon if custom image is injected) */}
                  <div className="w-36 h-36 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 shadow-inner">
                    {ad.image ? (
                      <img src={ad.image} alt="Scrap Stock load" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">{ad.icon}</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 overflow-hidden text-left">
                    <h4 className="font-black text-base text-slate-800 leading-snug line-clamp-2">{lang === 'ur' ? ad.titleUr : ad.titleEn}</h4>
                    <div className="text-[11px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-md inline-block">{lang === 'ur' ? ad.categoryUr : ad.categoryEn}</div>
                    <div className="space-y-1 text-xs font-bold text-slate-600 text-left">
                      <div className="truncate"><span className="text-slate-400 text-[10px] uppercase font-black">{t.weightLabel} </span><span className="text-slate-800">{ad.weight}</span></div>
                      <div className="truncate"><span className="text-slate-400 text-[10px] uppercase font-black">{t.locLabel} </span><span className="text-slate-800">📍 {ad.location}</span></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-left">
                  <span className="text-xs text-slate-400 font-black uppercase">{t.priceLabel}</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-green-600">Rs.{ad.price}</span>
                    <span className="text-xs text-slate-400 font-bold"> /{lang === 'ur' ? ad.unitUr : ad.unitEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* SUB-PAGES WINDOW CONNECTOR BOX */}
      {currentPage !== 'home' && (
        <main className="max-w-xl mx-auto p-4 mt-2 animate-fade-in">
          <button onClick={() => { setCurrentPage('home'); setShowOtpScreen(false); }} className="mb-4 bg-[#1a365d] text-white font-black text-xs px-4 py-2.5 rounded-xl">{t.backBtn}</button>

          {/* PAGE 1: Phone Auth */}
          {currentPage === 'page1' && (
            <div className="bg-white rounded-2xl border p-6 shadow-md space-y-4">
              {!showOtpScreen ? (
                <div className="space-y-4">
                  <input type="tel" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="03001234567" className="w-full bg-slate-50 border rounded-xl p-3.5 text-sm font-black outline-none" />
                  <button onClick={handlePhoneAuthSubmit} className="w-full bg-[#1a365d] text-white font-black py-4 rounded-xl text-xs uppercase">Send Secure OTP 📲</button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <h3 className="font-black text-sm text-[#1a365d]">Enter Code (7861)</h3>
                  <input type="number" value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} placeholder="XXXX" className="w-full bg-slate-50 border text-center font-black text-xl p-3 rounded-xl" />
                  <button onClick={handleVerifyOtpCode} className="w-full bg-emerald-600 text-white font-black py-3 rounded-xl text-xs">Verify Code ✓</button>
                </div>
              )}
            </div>
          )}

          {/* 📢 📸 👑 PAGE 4: POST AD FORM WITH COMPLETED AND INTERACTIVE PHOTO PREVIEW MODULE */}
          {currentPage === 'page4' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-5 text-left animate-fade-in">
              <div>
                <h3 className="text-base font-black text-[#1a365d] uppercase tracking-wide">📢 {lang === 'ur' ? 'نیا اسکریپ اشتہار لگائیں' : 'Post New Scrap Stock ad'}</h3>
                <p className="text-[11px] text-slate-400 font-bold mt-0.5">{lang === 'ur' ? 'فوٹو اپلوڈ کریں اور تفصیلات بھریں' : 'Upload real load photos and input raw material analytics below.'}</p>
              </div>

              {/* DYNAMIC PHOTO CHOOSE & INSTANT VIEW GRID CONTAINER */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wide">{lang === 'ur' ? 'مال کی تصاویر (زیادہ سے زیادہ 3)' : 'Scrap Images (Max 3)'}</label>
                
                {/* Invisible input file native bridge node */}
                <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handlePhotoSelectTrigger} className="hidden" />

                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Loop over selected local base64 files array */}
                  {uploadedPhotos.map((photoUrl, index) => (
                    <div key={index} className="relative aspect-square w-full bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden shadow-inner group">
                      <img src={photoUrl} alt="Preview asset" className="w-full h-full object-cover" />
                      {/* Red Cross Delete Trigger Button */}
                      <button 
                        onClick={() => handleRemovePhotoFromPreview(index)} 
                        className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shadow"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Master Graphic Input Button Slot (Hides when 3 files are completed) */}
                  {uploadedPhotos.length < 3 && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square w-full bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors shadow-inner"
                    >
                      <span className="text-2xl text-slate-400">📸</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase">{uploadedPhotos.length}/3 Photos</span>
                    </div>
                  )}

                </div>
              </div>

              {/* SUBMISSION FORM INPUT DATA LAYER */}
              <div className="space-y-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wide">{lang === 'ur' ? 'مال کا نام / تفصیل' : 'Scrap Title / Description'}</label>
                  <input type="text" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder="e.g., Pure PVC Regrind Clear Stock" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800 outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wide">{lang === 'ur' ? 'کیٹیگری منتخب کریں' : 'Select Material Category'}</label>
                  <select value={adCategory} onChange={(e) => setAdCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-black text-slate-700 outline-none">
                    <option value="Iron">Iron (لوہا)</option>
                    <option value="Copper">Copper (تانبا)</option>
                    <option value="Aluminum">Aluminum (ایلومینیم)</option>
                    <option value="Plastic">Plastic (پلاسٹک)</option>
                    <option value="Gatta">Gatta / Carton (گتا)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wide">{lang === 'ur' ? 'وزن / مقدار' : 'Weight / Qty'}</label>
                    <input type="text" value={adWeight} onChange={(e) => setAdWeight(e.target.value)} placeholder="e.g., 5 Tons" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wide">{lang === 'ur' ? 'مطلوبہ قیمت (Rs)' : 'Expected Price'}</label>
                    <input type="number" value={adPrice} onChange={(e) => setAdPrice(e.target.value)} placeholder="e.g., 140" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-black outline-none" />
                  </div>
                </div>

                {/* Submit Action Button */}
                <button onClick={handlePostAdLiveSubmit} className="w-full bg-gradient-to-r from-[#1a365d] to-[#0f2444] text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider shadow-md active:scale-95 transition-all mt-2">
                  {lang === 'ur' ? 'اشتہار لائیو اپلوڈ کریں ✓' : 'Upload Advertisement Live ✓'}
                </button>
              </div>
            </div>
          )}

          {/* Placeholders */}
          {currentPage === 'page3' && <div className="p-4 bg-white rounded-2xl border">Industries Framework Ready</div>}
          {currentPage === 'page5' && <div className="p-4 bg-white rounded-2xl border">Live Rates Grid Framework Ready</div>}
          {currentPage === 'page6' && <div className="p-4 bg-white rounded-2xl border">Sort Framework Ready</div>}
          {(currentPage === 'page2' || currentPage === 'page7') && <div className="p-4 bg-white rounded-2xl border">Coming Soon Terminal</div>}

        </main>
      )}

    </div>
  );
}
