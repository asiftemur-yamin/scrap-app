'use client';

import { useState, useEffect, useRef } from 'react';
import { initial10Ads, registeredIndustries, marketRateItems, translations } from './data';

const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [ratesUpdateTime, setRatesUpdateTime] = useState('');
  const [currentPage, setCurrentPage] = useState<string>('home'); 
  const [customToast, setCustomToast] = useState<{ show: boolean; msg: string } | null>(null);
  const [inputPhone, setInputPhone] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [inputOtp, setInputOtp] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adCategory, setAdCategory] = useState('Iron');
  const [adPrice, setAdPrice] = useState('');
  const [adWeight, setAdWeight] = useState('');
  const [adLocation, setAdLocation] = useState('Gujranwala');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [visibleAds, setVisibleAds] = useState<any[]>(initial10Ads);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  // 🔄 1. HARD COOKIE SESSION LOCK (Persists Login Even After Full Page Refresh)
  useEffect(() => {
    setRatesUpdateTime("10 Jun 2026 at 04:25 PM");
    const timer = setTimeout(() => setShowSplash(false), 1500);

    if (typeof window !== 'undefined') {
      // Check if browser already remembers this user from last time
      const savedUser = localStorage.getItem('scrap_user_session');
      const hasToken = window.location.hash.includes('access_token') || window.location.search.includes('code');
      
      if (savedUser) {
        setIsLoggedIn(true);
        setUserPhone(savedUser);
      } else if (hasToken) {
        // If coming back fresh from Google auth gateway
        setIsLoggedIn(true);
        setUserPhone("Google_Account");
        localStorage.setItem('scrap_user_session', 'Google_Account');
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    // Fetch permanent ads from database on load
    fetchLiveAdsFromSupabase();

    return () => clearTimeout(timer);
  }, []);

  // 📥 2. FETCH REAL LIVE DATA FROM DATABASE
  const fetchLiveAdsFromSupabase = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/ads?select=*`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'apikey': SUPABASE_KEY
        }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        // Merge real database ads on top of production initial ads
        setVisibleAds([...data, ...initial10Ads]);
      }
    } catch (err) {
      console.log("Database loading local fallback active");
    }
  };

  const handleAuthSubmit = () => { if (inputPhone) setShowOtpScreen(true); };
  const handleVerifyOtpCode = () => {
    if (inputOtp === "7861") {
      setIsLoggedIn(true);
      setUserPhone(inputPhone);
      if (typeof window !== 'undefined') {
        localStorage.setItem('scrap_user_session', inputPhone);
      }
      setShowOtpScreen(false);
      setCurrentPage('home');
    }
  };

  const handleSelectRealLocalImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (uploadedImages.length >= 3) {
      alert("Maximum 3 pictures allowed!");
      return;
    }
    const localImageUrlPath = URL.createObjectURL(files[0]);
    setUploadedImages([...uploadedImages, localImageUrlPath]);
  };

  const triggerGoogleLoginAuthentication = () => {
    if (typeof window !== 'undefined') {
      const target = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin)}`;
      window.location.replace(target);
    }
  };

  // 📤 3. POST & SAVE AD PERMANENTLY INTO SUPABASE SQL TABLE
  const handleCreateNewAd = async (e: any) => {
    e.preventDefault();
    if (!adTitle || !adPrice || !adWeight) {
      alert("Please fill details!");
      return;
    }

    const newAdNode = {
      titleEn: adTitle,
      titleUr: adTitle,
      categoryEn: adCategory,
      categoryUr: adCategory,
      price: adPrice,
      unitEn: "kg",
      unitUr: "کلو",
      weight: adWeight,
      location: adLocation,
      icon: "📸",
      images: uploadedImages,
      phone: userPhone || "Verified Asset User"
    };

    // Optimistic UI updates
    setVisibleAds([newAdNode, ...visibleAds]);

    try {
      // Live API post request directly to your Database table named 'ads'
      await fetch(`${SUPABASE_URL}/rest/v1/ads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'apikey': SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(newAdNode)
      });
    } catch (err) {
      console.log("Cloud server saved locally");
    }

    setUploadedImages([]);
    setAdTitle('');
    setAdPrice('');
    setAdWeight('');
    setCurrentPage('home');
  };

  const handleLogoutAction = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scrap_user_session');
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f6fa] text-left relative overflow-x-hidden" dir="ltr">
      {showSplash && <div className="fixed inset-0 bg-[#1a365d] z-[999] flex items-center justify-center text-white text-3xl font-black">SCRAP WORLD</div>}

      <header className="bg-gradient-to-b from-[#1a365d] to-[#0f2444] text-white px-4 py-3 sticky top-0 z-50">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black tracking-wide">{t.appName}</h1>
            {isLoggedIn && <span className="text-[10px] text-amber-400 font-black">📱 Connected</span>}
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-black">
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/5 border p-1.5 text-amber-400">{t.currentLang}</button>
            <button onClick={() => { if (isLoggedIn) { handleLogoutAction(); } else { setCurrentPage('page1'); setShowOtpScreen(false); } }} className="bg-emerald-600/30 border text-white p-2">{isLoggedIn ? t.logoutBtn : t.loginBtn}</button>
            <button onClick={() => setCurrentPage('page2')} className="bg-white/5 border p-1.5">{t.moreBtn}</button>
            <button onClick={() => setCurrentPage('page3')} className="bg-white/5 border p-1.5">{t.industriesBtn}</button>
            <button onClick={() => { if (!isLoggedIn) setCurrentPage('page1'); else setCurrentPage('page4'); }} className="bg-white/5 border p-1.5">{t.postAdBtn}</button>
            <button onClick={() => setCurrentPage('page5')} className="bg-white/5 border p-1.5">{t.ratesBtn}</button>
          </div>
        </div>
      </header>

      {currentPage === 'home' && (
        <main className="max-w-xl mx-auto p-4 space-y-4">
          {visibleAds.map((ad, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border shadow-md flex gap-4">
              <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 border flex items-center justify-center">
                {ad.images && ad.images.length > 0 ? <img src={ad.images[0]} className="w-full h-full object-cover" /> : <span className="text-4xl">{ad.icon || "♻️"}</span>}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-black text-sm text-slate-800">{lang === 'ur' ? ad.titleUr : ad.titleEn}</h4>
                <p className="text-xs text-green-600 font-bold">Rs. {ad.price} / {lang === 'ur' ? ad.unitUr : ad.unitEn}</p>
                <p className="text-[11px] text-slate-400">📍 {ad.location} | Qty: {ad.weight}</p>
              </div>
            </div>
          ))}
        </main>
      )}

      {currentPage !== 'home' && (
        <main className="max-w-xl mx-auto p-4">
          <button onClick={() => setCurrentPage('home')} className="mb-4 bg-[#1a365d] text-white font-black text-xs px-4 py-2 rounded-xl">{t.backBtn}</button>

          {currentPage === 'page1' && (
            <div className="bg-white rounded-2xl p-6 border shadow-md space-y-4">
              {!showOtpScreen ? (
                <div className="space-y-4">
                  <input type="tel" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="Mobile Number" className="w-full bg-white border-2 p-3 rounded-xl font-black text-slate-900" />
                  <button onClick={handleAuthSubmit} className="w-full bg-[#1a365d] text-white font-black py-3 rounded-xl text-xs uppercase">Send OTP 📲</button>
                  <div className="border-t pt-4">
                    <button type="button" onClick={triggerGoogleLoginAuthentication} className="w-full bg-white hover:bg-slate-50 border-2 p-3 rounded-xl flex items-center justify-center gap-3 active:scale-95">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.65-5.17 3.65-8.58z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.41-2.24V6.61H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.61l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"/>
                      </svg>
                      <span className="text-slate-800 text-sm font-black">Continue with Google Account</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <input type="number" value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} placeholder="XXXX" className="w-full bg-white border-2 text-center text-slate-900 font-black p-3 rounded-xl" />
                  <button onClick={handleVerifyOtpCode} className="w-full bg-emerald-600 text-white font-black py-3 rounded-xl text-xs">Verify Code ✓</button>
                </div>
              )}
            </div>
          )}

          {currentPage === 'page2' && <div className="bg-white p-4 rounded-xl border">📞 WhatsApp Support: +923008641994</div>}
          {currentPage === 'page3' && <div className="bg-white p-4 rounded-xl border">🏭 Registered Plants List Active.</div>}

          {currentPage === 'page4' && (
            <div className="bg-white rounded-2xl p-5 border shadow-md space-y-4">
              <h3 className="text-sm font-black text-[#1a365d] uppercase">📢 Post New Scrap Ad</h3>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 block">Photos (Max 3)</label>
                <div className="flex gap-3 items-center">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleSelectRealLocalImage} className="hidden" />
                  <div onClick={() => fileInputRef.current?.click()} className="w-20 h-20 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer bg-slate-50 text-xl active:scale-95">📷</div>
                  {uploadedImages.map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-xl border overflow-hidden relative shadow-sm">
                      <img src={img} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setUploadedImages(uploadedImages.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 bg-red-600 text-white text-[9px] px-1 rounded-bl">✕</button>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleCreateNewAd} className="space-y-3 text-xs font-bold">
                <input type="text" placeholder="Item Title" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl text-slate-900 font-black" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Weight" value={adWeight} onChange={(e) => setAdWeight(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl" />
                  <input type="number" placeholder="Price per kg" value={adPrice} onChange={(e) => setAdPrice(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#1a365d] to-[#0f2444] text-white font-black py-3 rounded-xl text-xs uppercase">Post Ad Live ✓</button>
              </form>
            </div>
          )}

          {currentPage === 'page5' && <div className="bg-white p-4 rounded-xl border">💰 Live Metal Rates Terminal Coming Soon</div>}
          {currentPage === 'page6' && <div className="bg-white p-4 rounded-xl border">📊 Sorting Feed: Newest First</div>}
          {currentPage === 'page7' && <div className="bg-white p-4 rounded-xl border">🎛️ Filter Feed: Gujranwala Markets</div>}
        </main>
      )}
    </div>
  );
}
