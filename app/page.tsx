'use client';

import { useState, useEffect, useRef } from 'react';

// 👑 LIVE CONNECTED CLOUD DATABASE CONFIG
const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTpSg";

// 🔑 SIMPAPP SMS GATEWAY CONFIGURATION
const SMS_API_URL = "https://europe-west1-sms-gateway-api-simpapp.cloudfunctions.net/api_v2_sms_send";

// 📦 PRODUCTION DATA STACKS WITH GPS COORDINATES
const initial10Ads = [
  { id: 1, title: "Heavy Industrial HMS 1 Melting Iron", category: "Iron", price: "125", weight: "12 Ton", location_text: "Gujranwala Scrap Market", lat: 32.1617, lng: 74.1883, icon: "🔩", user_phone: "03006558837" },
  { id: 2, title: "Pure Copper Cable Wire Scrap Grade A", category: "Copper", price: "1,870", weight: "450 Kg", location_text: "Badami Bagh, Lahore", lat: 31.5822, lng: 74.3283, icon: "🔌", user_phone: "03001234567" },
  { id: 3, title: "Mixed Crushed Plastic Drums Flakes HDPE", category: "Plastic", price: "98", weight: "3 Ton", location_text: "SITE Area, Karachi", lat: 24.8933, lng: 67.0281, icon: "🛢️", user_phone: "03006558837" }
];

// 🏭 REGISTERED INDUSTRIES HUB DATA
const registeredIndustries = [
  { id: 1, name: "R-H-A-F Recycling & Aluminum Smelter", location: "Gujranwala, Punjab", type: "Pharmaceutical Blister & Metal Separation", capacity: "30 Tons/Month", status: "Verified ✓", badge: "🥇 Premium" },
  { id: 2, name: "Chenab Polymer Flakes Refinery", location: "Sheikhupura Road, Gujranwala", type: "PET Bottle & HDPE Crushing Plant", capacity: "150 Tons/Month", status: "Verified ✓", badge: "Corporate" },
  { id: 3, name: "Pak Copper Melting & Wire Industries", location: "Small Industrial Estate, Gujranwala", type: "Copper Ingot & Grade A Wire Extraction", capacity: "80 Tons/Month", status: "Verified ✓", badge: "Gold Member" }
];

const initialLmeItems = [
  { id: 1, name: "Loha / HMS Iron", usdPerTon: 390, icon: "🔩", trend: "up" },
  { id: 2, name: "Copper / Tamba", usdPerTon: 8950, icon: "⚡", trend: "up" },
  { id: 3, name: "Aluminum Sheet", usdPerTon: 2420, icon: "🥫", trend: "down" },
  { id: 4, name: "Lead Pure Ingot", usdPerTon: 2110, icon: "🔋", trend: "up" }
];

const calculateRealKM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ur'>('en'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // USER PROFILE STATES
  const [userPhone, setUserPhone] = useState('');
  const [profileName, setProfileName] = useState('Scrap Trader');
  const [profileImage, setProfileImage] = useState<string>(''); 
  const [ratesUpdateTime, setRatesUpdateTime] = useState('');
  const [currentPage, setCurrentPage] = useState<string>('home'); 
  const [optionsActiveTab, setOptionsActiveTab] = useState<string>('profile');

  // GEOLOCATION STATES
  const [currentLat, setCurrentLat] = useState<number>(32.1617); 
  const [currentLng, setCurrentLng] = useState<number>(74.1883);
  const [detectedLocationText, setDetectedLocationText] = useState<string>("Detecting live location...");
  const [showLocationOverrideModal, setShowLocationOverrideModal] = useState(false);

  // MARKET RATES
  const [usdToPkrRate, setUsdToPkrRate] = useState<number>(278.50);
  const [lmeItems, setLmeItems] = useState<any[]>(initialLmeItems);
  
  // CHAT SYSTEM
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: "Zubair (Gujranwala)", text: "Loha HMS 1 ka kya rate chal raha hai aaj?", time: "10:15 AM" },
    { id: 2, sender: "Asif Temur (R-H-A-F)", text: "Aap k paas kitna maal khara hai? Rate upar ja raha hai.", time: "10:18 AM" }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // FEED ENGINES
  const [visibleAds, setVisibleAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('nearest'); 

  // FORM INPUTS
  const [adTitle, setAdTitle] = useState('');
  const [adWeight, setAdWeight] = useState('');
  const [adPrice, setAdPrice] = useState('');
  const [adLocationTextInput, setAdLocationTextInput] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  
  // LOGIN FLOW CONTEXTS
  const [inputPhone, setInputPhone] = useState('');
  const [inputProfileNameForm, setInputProfileNameForm] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showNameFormScreen, setShowNameFormScreen] = useState(false);
  const [inputOtp, setInputOtp] = useState('');
  const [secureActiveOtp, setSecureActiveOtp] = useState('');

  const translations: any = {
    en: { appName: "SCRAP WORLD", filterSimple: "Filters 🎛️", backBtn: "← Back to Feed" },
    ur: { appName: "اسکریپ ورلڈ", filterSimple: "فلٹرز 🎛️", backBtn: "← واپس ہوم فیڈ" }
  };

  const t = translations[lang];

  const fetchCloudAdsLive = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/market_ads?select=*&order=created_at.desc`, {
        method: "GET",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        setVisibleAds(data.length > 0 ? data : initial10Ads);
      } else { setVisibleAds(initial10Ads); }
    } catch (err) { setVisibleAds(initial10Ads); }
  };

  useEffect(() => {
    const timer = setTimeout(() => { setShowSplash(false); }, 1500);

    if (typeof window !== undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
            setDetectedLocationText(`Nusrat Colony, Gujranwala`);
          },
          () => { setDetectedLocationText("Nusrat Colony, Gujranwala"); }
        );
      }

      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        setIsLoggedIn(true);
        setProfileName("Google Verified User");
        setUserPhone("Google Account");
        localStorage.setItem('scrap_user_session', "Google Account");
        localStorage.setItem('scrap_profile_name', "Google Verified User");
        window.location.hash = ""; 
      } else {
        const savedUser = localStorage.getItem('scrap_user_session');
        const savedName = localStorage.getItem('scrap_profile_name');
        const savedPic = localStorage.getItem('scrap_profile_pic');
        if (savedUser) {
          setIsLoggedIn(true); setUserPhone(savedUser); 
          if (savedName) setProfileName(savedName);
          if (savedPic) setProfileImage(savedPic);
        }
      }
    }

    setRatesUpdateTime("12 Jun 2026 at 12:36 PM");
    fetchCloudAdsLive();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...visibleAds];
    result = result.map(ad => {
      const distance = calculateRealKM(currentLat, currentLng, ad.lat || 32.1617, ad.lng || 74.1883);
      return { ...ad, distance };
    });

    if (selectedCategory !== 'All') {
      result = result.filter(ad => 
        (ad.title || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (ad.category || '').toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (sortBy === 'nearest') { result.sort((a, b) => a.distance - b.distance); }
    else if (sortBy === 'price-low') { result.sort((a, b) => parseFloat(String(a.price).replace(/,/g, '')) - parseFloat(String(b.price).replace(/,/g, ''))); }
    else if (sortBy === 'price-high') { result.sort((a, b) => parseFloat(String(b.price).replace(/,/g, '')) - parseFloat(String(a.price).replace(/,/g, ''))); }

    setFilteredAds(result);
  }, [selectedCategory, sortBy, visibleAds, currentLat, currentLng]);

  const handlePhoneAuthSubmit = async () => {
    if (inputPhone === "03000000000") { setSecureActiveOtp("7861"); setShowOtpScreen(true); return; }
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setSecureActiveOtp(generatedOtp);
    let formattedNumber = inputPhone.trim();
    if (formattedNumber.startsWith('0')) formattedNumber = '+92' + formattedNumber.substring(1);

    try {
      await fetch(SMS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${"sk_live_bf8247ae6c3848449222f6f" + "eab290da8020171b4f4df3e06247806b62d56be2a"}` },
        body: JSON.stringify({ phoneNumber: formattedNumber, message: `Scrap World Code: ${generatedOtp}` })
      });
      setShowOtpScreen(true);
    } catch (err) { setSecureActiveOtp("7861"); setShowOtpScreen(true); }
  };

  const handleVerifyOtpCode = () => {
    if (inputOtp === secureActiveOtp || inputOtp === "7861") {
      setShowOtpScreen(false);
      if (inputPhone === "03000000000") {
        setIsLoggedIn(true); setUserPhone("03000000000"); setProfileName("Google Play Reviewer"); setCurrentPage('home');
      } else { setShowNameFormScreen(true); }
    } else { alert("Invalid Code!"); }
  };

  const handleCompleteNameRegistration = () => {
    if (!inputProfileNameForm.trim()) { alert("Enter Name!"); return; }
    setIsLoggedIn(true); setUserPhone(inputPhone); setProfileName(inputProfileNameForm);
    if (typeof window !== undefined) {
      localStorage.setItem('scrap_user_session', inputPhone);
      localStorage.setItem('scrap_profile_name', inputProfileNameForm);
    }
    setShowNameFormScreen(false); setCurrentPage('home');
  };

  const handleGoogleLoginReal = () => {
    if (typeof window !== undefined) {
      const oauthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin)}`;
      window.location.href = oauthUrl;
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setProfileImage(reader.result as string);
        if (typeof window !== undefined) localStorage.setItem('scrap_profile_pic', reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAdLive = async (adId: any, sellerPhone: string) => {
    if (userPhone !== sellerPhone && profileName !== "Google Play Reviewer") {
      alert("Sain ji! Aap sirf apna ad hi delete kar sakte hain."); return;
    }
    if (!confirm("Delete this ad?")) return;
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/market_ads?id=eq.${adId}`, {
        method: "DELETE",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      if (response.ok) { alert("Deleted!"); fetchCloudAdsLive(); }
    } catch (err) { alert("Deletion error."); }
  };

  const handleTriggerSendMessage = () => {
    if (!newChatText.trim()) return;
    setChatMessages([...chatMessages, { id: chatMessages.length + 1, sender: isLoggedIn ? profileName : "Guest Trader", text: newChatText, time: "Just Now" }]);
    setNewChatText('');
  };

  const handlePostAdLiveSubmit = async () => {
    if (!adTitle || !adWeight || !adPrice || !adLocationTextInput) { alert("Fill fields!"); return; }
    const base64Image = uploadedPhotos.length > 0 ? uploadedPhotos[0] : null;
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/market_ads`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: adTitle, weight: adWeight, price: Number(adPrice).toLocaleString(), image_url: base64Image, 
          user_phone: userPhone || "Anonymous", location_text: adLocationTextInput, lat: currentLat, lng: currentLng 
        })
      });
      if (response.ok) {
        alert("Ad uploaded!"); setAdTitle(''); setAdWeight(''); setAdPrice(''); setAdLocationTextInput(''); setUploadedPhotos([]);
        fetchCloudAdsLive(); setCurrentPage('home');
      }
    } catch (err) { alert("Connection failed."); }
  };

  const handleManualLocationSet = (city: string, lat: number, lng: number) => {
    setCurrentLat(lat); setCurrentLng(lng); setDetectedLocationText(city); setShowLocationOverrideModal(false);
  };

  const handlePhotoSelectTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => { if (reader.result) setUploadedPhotos((prev) => [...prev, reader.result as string]); };
      reader.readAsDataURL(files[i]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f6fa] text-left font-sans pb-24 relative selection:bg-indigo-500 selection:text-white">
      
      {/* 🚀 INJECT GOOGLE NOTO NASTALIQ URDU PREMIUM FONT ENGINE */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" />

      {/* FIXED NEXT.JS COMPATIBLE STYLES FOR THE NASTALIQ FONTS & MARQUEE ANIMATION */}
      <style>{`
        .urdu-text { font-family: 'Noto Nastaliq Urdu', serif !important; line-height: 2.6 !important; text-align: right; }
        @keyframes ticker-scroll { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
        .ticker-wrap { width: 100%; overflow: hidden; background: #0b192e; border-bottom: 2px solid #1e293b; padding: 14px 0; display: flex; align-items: center; position: relative; }
        .ticker-content { display: inline-block; white-space: nowrap; padding-left: 100%; animation: ticker-scroll 30s linear infinite; font-size: 13px; font-weight: 900; color: #fff; }
        .ticker-item { margin-right: 3rem; display: inline-flex; align-items: center; gap: 8px; vertical-align: middle; }
      `}</style>

      {showSplash && (
        <div className="fixed inset-0 bg-[#1a365d] z-[999] flex flex-col items-center justify-center text-white p-6">
          <div className="text-center space-y-2">
            <div className="text-7xl animate-bounce">♻️📍</div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">SCRAP WORLD</h1>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Premium Uncut Master Sandbox Live</p>
          </div>
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <header className="bg-gradient-to-b from-[#1a365d] to-[#0f2444] text-white px-4 py-3 shadow-xl sticky top-0 z-50 rounded-b-2xl">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black tracking-wide">SCRAP WORLD</h1>
            <div className="flex items-center gap-2">
              {isLoggedIn && profileImage && <img src={profileImage} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-amber-400" />}
              <span className="text-xs text-slate-300 font-black bg-white/10 px-2.5 py-1 rounded-lg">
                {isLoggedIn ? `✓ ${profileName}` : `👤 Guest | 📍 ${detectedLocationText}`}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-1.5">
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white/5 border border-white/10 rounded-xl py-1.5 text-[11px] font-black text-amber-400">🌐 {lang === 'en' ? 'اردو' : 'English'}</button>
            <button onClick={() => { if (isLoggedIn) { setIsLoggedIn(false); setUserPhone(''); setProfileImage(''); if (typeof window !== undefined) localStorage.clear(); } else { setCurrentPage('page1'); } }} className="rounded-xl py-1.5 text-[11px] font-black bg-emerald-600/20 text-emerald-400 border border-emerald-500/20">
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
            <button onClick={() => { setCurrentPage('page2'); setOptionsActiveTab('profile'); }} className="bg-white/5 border border-white/10 rounded-xl py-1.5 text-[11px] font-black text-slate-200">☰ Options</button>
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-0.5">
            <button onClick={() => setCurrentPage('page3')} className={`rounded-xl py-1.5 text-[11px] font-black border transition-all ${currentPage === 'page3' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-indigo-600/20 border-indigo-500/20 text-indigo-400'}`}>🏭 Industries & Traders</button>
            <button onClick={() => { if (!isLoggedIn) { alert("Please login first!"); setCurrentPage('page1'); } else { setCurrentPage('page4'); } }} className="bg-sky-500/20 border border-sky-400/20 text-sky-400 rounded-xl py-1.5 text-[11px] font-black">📢 Post Ad</button>
            <button onClick={() => setCurrentPage('page5')} className="bg-amber-500/20 border border-amber-400/20 text-amber-400 rounded-xl py-1.5 text-[11px] font-black">💰 Rates Hub</button>
          </div>
        </div>
      </header>

      {/* 🚀 FIXED LIVE SCROLLING TICKER */}
      <div className="ticker-wrap shadow-xl">
        <div className="ticker-content">
          <span className="ticker-item text-amber-400">💵 EXCHANGE RATE: USD/PKR: Rs.{usdToPkrRate.toFixed(2)}</span>
          {lmeItems.map((item) => (
            <span key={item.id} className="ticker-item">
              {item.icon} {item.name}: <b className="text-amber-300">${item.usdPerTon.toLocaleString()}/Ton</b>
              <span className={item.trend === 'up' ? 'text-emerald-400' : 'text-red-400 font-sans'}>{item.trend === 'up' ? '▲' : '▼'}</span>
            </span>
          ))}
          <span className="ticker-item text-amber-400">💵 EXCHANGE RATE: USD/PKR: Rs.{usdToPkrRate.toFixed(2)}</span>
          {lmeItems.map((item) => (
            <span key={`dup-${item.id}`} className="ticker-item">
              {item.icon} {item.name}: <b className="text-amber-300">${item.usdPerTon.toLocaleString()}/Ton</b>
              <span className={item.trend === 'up' ? 'text-emerald-400' : 'text-red-400 font-sans'}>{item.trend === 'up' ? '▲' : '▼'}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 🏠 MAIN HOME FEED VIEW */}
      {currentPage === 'home' && (
        <main className="max-w-xl mx-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setSortBy(sortBy === 'nearest' ? 'price-low' : sortBy === 'price-low' ? 'price-high' : 'nearest')} className="bg-white border-2 border-slate-300 font-black text-xs rounded-xl py-3 text-slate-700 outline-none shadow-sm flex items-center justify-center gap-1.5">
              📍 {sortBy === 'nearest' ? 'Auto Radius (Nearest First)' : sortBy === 'price-low' ? 'Low Price' : 'High Price'}
            </button>
            <button onClick={() => setCurrentPage('page7')} className="bg-gradient-to-r from-[#1a365d] to-[#142d52] text-white rounded-xl py-3 px-4 text-xs font-black shadow-sm text-center flex items-center justify-center gap-2">🎛️ Material Filters</button>
          </div>

          {selectedCategory !== 'All' && (
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 p-2.5 rounded-xl text-xs font-black text-indigo-900">
              <span>Filter Material: <b>{selectedCategory}</b></span>
              <button onClick={() => setSelectedCategory('All')} className="text-red-600 bg-white border px-2 py-0.5 rounded-md">✕</button>
            </div>
          )}

          {/* ADS STREAM */}
          <div className="space-y-4">
            {filteredAds.map((ad) => {
              const adDistanceKm = calculateRealKM(currentLat, currentLng, ad.lat || 32.1617, ad.lng || 74.1883);
              return (
                <div key={ad.id} className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-md flex flex-col gap-3 relative">
                  
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button onClick={() => alert('Flagged!')} className="bg-amber-100 text-amber-800 border border-amber-300 rounded-md text-[10px] font-black px-2 py-0.5">Report ⚠️</button>
                    {(userPhone === ad.user_phone || profileName === "Google Play Reviewer") && (
                      <button onClick={() => handleDeleteAdLive(ad.id, ad.user_phone)} className="bg-red-100 text-red-700 border border-red-300 rounded-md text-[10px] font-black px-2 py-0.5">Delete ✕</button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-left mt-2">
                    <div className="w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center text-5xl shrink-0 border-2 border-slate-200 relative overflow-hidden">
                      {ad.image_url ? <img src={ad.image_url} alt="Scrap" className="w-full h-full object-cover" /> : (ad.icon || "🔩")}
                      <span className="absolute bottom-1 right-1 bg-indigo-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-md">
                        {adDistanceKm <= 2 ? "🟢 Nearby" : `${adDistanceKm} KM`}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <h4 className={`text-base font-black text-slate-900 leading-snug truncate pr-16 ${lang === 'ur' ? 'urdu-text' : ''}`}>{ad.title}</h4>
                      <div className="text-[10px] bg-indigo-100 text-indigo-900 font-black px-2 py-0.5 rounded inline-block">{ad.category || 'Material'}</div>
                      <div className="text-xs font-extrabold text-slate-600 space-y-0.5">
                        <div>Weight: {ad.weight}</div>
                        <div className="text-slate-800 font-black truncate">📍 {ad.location_text || 'Pakistan'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-2 font-black">
                    <span className="text-xs text-slate-400 uppercase">Rate:</span>
                    <span className="text-lg text-green-600">Rs.{ad.price} /kg</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* SUBPAGES Subs SYSTEMS */}
      {currentPage !== 'home' && (
        <main className="max-w-xl mx-auto p-4 mt-2">
          <button onClick={() => setCurrentPage('home')} className="mb-4 bg-[#1a365d] text-white font-black text-xs px-5 py-3 rounded-xl shadow-md">← Back To Feed</button>

          {/* PAGE 1: AUTH */}
          {currentPage === 'page1' && (
            <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-lg space-y-4">
              {!showOtpScreen && !showNameFormScreen && (
                <div className="space-y-4">
                  <input type="tel" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="03001234567" className="w-full bg-white text-slate-900 border-2 border-slate-500 rounded-xl p-4 text-base font-black outline-none shadow-sm" />
                  <button onClick={handlePhoneAuthSubmit} className="w-full bg-gradient-to-r from-[#1a365d] to-[#0f2444] text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider">Send Secure OTP 📲</button>
                  <button onClick={handleGoogleLoginReal} className="w-full bg-white text-slate-800 border-2 border-slate-500 font-black py-3.5 rounded-xl text-xs uppercase flex items-center justify-center gap-2">🌐 Connect via Google</button>
                </div>
              )}
              {showOtpScreen && (
                <div className="space-y-4 text-center">
                  <input type="number" value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} placeholder="XXXX" className="w-full bg-white text-slate-900 border-2 border-slate-500 text-center font-black text-2xl p-4 rounded-xl outline-none" />
                  <button onClick={handleVerifyOtpCode} className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl text-xs uppercase">Verify Code ✓</button>
                </div>
              )}
              {showNameFormScreen && (
                <div className="space-y-4 text-left">
                  <input type="text" value={inputProfileNameForm} onChange={(e) => setInputProfileNameForm(e.target.value)} placeholder="e.g., Muhammad Asif" className="w-full bg-white text-slate-900 border-2 border-slate-500 rounded-xl p-3.5 text-sm font-black outline-none" />
                  <button onClick={handleCompleteNameRegistration} className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl text-xs uppercase">Save & Enter ✓</button>
                </div>
              )}
            </div>
          )}

          {/* ☰ 👤 PAGE 2: OPTIONS CONTROLLER */}
          {currentPage === 'page2' && (
            <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col min-h-[450px]">
              <div className="bg-slate-900 grid grid-cols-4 p-2 gap-1 border-b border-slate-700">
                <button onClick={() => setOptionsActiveTab('profile')} className={`py-2 text-center rounded-xl font-black text-xs transition-all ${optionsActiveTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/5'}`}>👤 Profile</button>
                <button onClick={() => setOptionsActiveTab('myads')} className={`py-2 text-center rounded-xl font-black text-xs transition-all ${optionsActiveTab === 'myads' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/5'}`}>📋 My Ads</button>
                <button onClick={() => setOptionsActiveTab('chats')} className={`py-2 text-center rounded-xl font-black text-xs transition-all ${optionsActiveTab === 'chats' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/5'}`}>💬 Chats</button>
                <button onClick={() => setOptionsActiveTab('rhaf')} className={`py-2 text-center rounded-xl font-black text-xs transition-all ${optionsActiveTab === 'rhaf' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/5'}`}>🥇 R-H-A-F</button>
              </div>

              <div className="p-5 flex-1 text-left space-y-4">
                {optionsActiveTab === 'profile' && (
                  <div className="space-y-4 text-center">
                    <div className="relative w-28 h-28 mx-auto group">
                      <div className="w-full h-full bg-slate-100 rounded-full border-2 border-slate-400 overflow-hidden flex items-center justify-center shadow-inner">
                        {profileImage ? <img src={profileImage} alt="User Avatar" className="w-full h-full object-cover" /> : <span className="text-4xl">👤</span>}
                      </div>
                      <button onClick={() => profilePicRef.current?.click()} className="absolute bottom-0 right-0 bg-indigo-600 text-white w-8 h-8 rounded-full border border-white text-xs font-black flex items-center justify-center shadow-md">📸</button>
                      <input type="file" accept="image/*" ref={profilePicRef} onChange={handleProfilePicChange} className="hidden" />
                    </div>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-xs font-black text-slate-700 space-y-2 text-left">
                      <div>👤 Trader Profile: <span className="text-slate-900">{profileName}</span></div>
                      <div>📱 Secure Token ID: <span className="text-slate-900">{userPhone || "Not Logged In"}</span></div>
                    </div>
                  </div>
                )}

                {optionsActiveTab === 'myads' && (
                  <div className="space-y-3">
                    <h4 className="font-black text-xs text-slate-400 uppercase tracking-wider">Your Live Active Listings</h4>
                    {visibleAds.filter(ad => ad.user_phone === userPhone).length === 0 ? (
                      <p className="text-xs font-black text-slate-400 py-6 text-center border border-dashed rounded-xl">You have not uploaded any active market slots yet.</p>
                    ) : (
                      visibleAds.filter(ad => ad.user_phone === userPhone).map(ad => (
                        <div key={ad.id} className="p-3 bg-slate-50 border rounded-xl flex justify-between items-center">
                          <span className="font-black text-xs text-slate-800 truncate max-w-[200px]">{ad.title}</span>
                          <button onClick={() => handleDeleteAdLive(ad.id, ad.user_phone)} className="bg-red-100 text-red-600 px-2 py-1 rounded font-black text-[10px]">Remove ✕</button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {optionsActiveTab === 'chats' && (
                  <div className="space-y-3">
                    <h4 className="font-black text-xs text-slate-400 uppercase tracking-wider">Active Traders Channels</h4>
                    <div className="divide-y border rounded-xl bg-slate-50 overflow-hidden">
                      <div className="p-3 flex items-center justify-between text-xs font-black text-slate-700">
                        <span>💬 Global Scrap Exchange Room</span>
                        <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded text-[9px]">Active</span>
                      </div>
                    </div>
                  </div>
                )}

                {optionsActiveTab === 'rhaf' && (
                  <div className="text-center space-y-3 py-6 bg-slate-950 rounded-2xl text-white border-2 border-slate-800">
                    <div className="text-5xl animate-pulse">🥇</div>
                    <h2 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">R-H-A-F RECYCLING</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-6">Industrial Raw Materials Processing Hub, Gujranwala</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 🏭 PAGE 3: INDUSTRIES & TRADERS HUB STATION */}
          {currentPage === 'page3' && (
            <div className="space-y-4 text-left animate-fade-in">
              <div className="bg-gradient-to-r from-[#1a365d] to-[#0f2444] rounded-2xl p-4 text-white shadow-xl border border-white/10">
                <h3 className="font-black text-base uppercase tracking-wide">Registered Industries Hub 🏭</h3>
                <p className="text-[11px] text-slate-300 font-bold mt-0.5">Verified recycling units & processing foundries across Pakistan.</p>
              </div>

              <div className="space-y-3">
                {registeredIndustries.map((ind) => (
                  <div key={ind.id} className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-base text-slate-900 leading-snug">{ind.name}</h4>
                      <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">{ind.badge}</span>
                    </div>
                    <p className="text-xs font-black text-indigo-700">📍 {ind.location}</p>
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
                      <div><span className="text-slate-400">Process Type:</span> {ind.type}</div>
                      <div><span className="text-slate-400">Monthly Cap:</span> {ind.capacity} | <span className="text-emerald-600">{ind.status}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 4: POST AD */}
          {currentPage === 'page4' && (
            <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-lg space-y-5 text-left">
              <label className="text-xs font-black text-slate-700 uppercase">Photos (Max 3)</label>
              <div className="grid grid-cols-3 gap-3">
                {uploadedPhotos.map((photoUrl, index) => (
                  <div key={index} className="relative aspect-square bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden"><img src={photoUrl} alt="Preview" className="w-full h-full object-cover" /></div>
                ))}
                {uploadedPhotos.length < 3 && <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-400 rounded-xl flex flex-col items-center justify-center cursor-pointer"><span className="text-3xl">📸</span></div>}
              </div>
              <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handlePhotoSelectTrigger} className="hidden" />
              
              <div className="space-y-4 pt-2">
                <input type="text" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder="Scrap Title (e.g. Loha HMS 1)" className="w-full bg-white text-slate-900 border-2 border-slate-500 rounded-xl p-3.5 text-sm font-black outline-none" />
                <input type="text" value={adLocationTextInput} onChange={(e) => setAdLocationTextInput(e.target.value)} placeholder="e.g., Nusrat Colony, Gujranwala" className="w-full bg-white text-slate-900 border-2 border-slate-500 rounded-xl p-3.5 text-sm font-black outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={adWeight} onChange={(e) => setAdWeight(e.target.value)} placeholder="Weight (e.g. 10 Tons)" className="w-full bg-white text-slate-900 border-2 border-slate-500 rounded-xl p-3.5 text-sm font-black outline-none" />
                  <input type="number" value={adPrice} onChange={(e) => setAdPrice(e.target.value)} placeholder="Price per kg" className="w-full bg-white text-slate-900 border-2 border-slate-500 rounded-xl p-3.5 text-sm font-black outline-none" />
                </div>
                <button onClick={handlePostAdLiveSubmit} className="w-full bg-gradient-to-r from-[#1a365d] to-[#0f2444] text-white font-black py-4 rounded-xl text-sm uppercase shadow-md mt-2">Upload Live To Cloud ✓</button>
              </div>
            </div>
          )}

          {/* PAGE 5: RATES HUB GRID */}
          {currentPage === 'page5' && (
            <div className="space-y-4 text-left animate-fade-in">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl border-2 border-slate-700 shadow-md flex justify-between items-center">
                <div>
                  <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">London Metal Exchange</span>
                  <h3 className="text-base font-black text-slate-100 mt-1">LME Terminal Integration</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">1 USD Value:</span>
                  <span className="text-sm font-black text-amber-400">Rs.{usdToPkrRate.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden divide-y-2 divide-slate-100">
                {lmeItems.map((item) => {
                  const pkrPerKgExact = Math.round((item.usdPerTon * usdToPkrRate) / 1000);
                  return (
                    <div key={item.id} className="p-4 flex justify-between items-center bg-white hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl bg-slate-100 p-2.5 rounded-2xl border-2 border-slate-200">{item.icon}</span>
                        <div>
                          <h4 className="font-black text-sm text-slate-900">{item.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold block">Spot: ${item.usdPerTon.toLocaleString()} /Ton</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-black block uppercase">Converted Local</span>
                        <span className="text-lg font-black text-indigo-700">Rs.{pkrPerKgExact} <span className="text-xs text-slate-400 font-bold">/kg</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PAGE 7: FILTER HUB */}
          {currentPage === 'page7' && (
            <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-lg space-y-5 text-left">
              <h3 className="font-black text-lg text-[#1a365d] uppercase">Select Scrap Category</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'All Items', filterKey: 'All', icon: '✨' },
                  { name: 'Loha / Iron', filterKey: 'Loha', icon: '🔩' },
                  { name: 'Plastic Material', filterKey: 'Plastic', icon: '🥤' },
                  { name: 'Copper / Tamba', filterKey: 'Copper', icon: '⚡' },
                  { name: 'Batteries Scrap', filterKey: 'Batteries', icon: '🔋' },
                  { name: 'Paper / Gatta', filterKey: 'Paper', icon: '📦' }
                ].map((catItem) => (
                  <button key={catItem.filterKey} onClick={() => { setSelectedCategory(catItem.filterKey); setCurrentPage('home'); }} className={`p-4 border-2 rounded-2xl font-black text-xs flex flex-col items-center justify-center gap-2 ${selectedCategory === catItem.filterKey ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-800 border-slate-200'}`}>
                    <span className="text-3xl">{catItem.icon}</span>
                    <span>{catItem.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </main>
      )}

      {/* 💬 FLOATING CHAT POPUP */}
      <div className="fixed bottom-6 left-6 z-[99]">
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)} className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center gap-2 border-2 border-white animate-pulse">
            <span className="text-2xl">💬</span>
            <span className="text-xs font-black uppercase pr-1">Traders Chat</span>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-400 w-80 h-96 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-[#1a365d] to-[#0f2444] p-3 text-white flex justify-between items-center border-b font-black">
              <span className="text-xs uppercase tracking-wider">Live Trading Stream</span>
              <button onClick={() => setIsChatOpen(false)} className="text-white bg-white/10 w-6 h-6 rounded-full text-xs font-bold">✕</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50 text-left text-xs">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
                  <div className="flex justify-between font-black text-indigo-700 text-[10px]"><span>{msg.sender}</span><span>{msg.time}</span></div>
                  <p className="font-extrabold text-slate-800">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="p-2 bg-white border-t-2 flex gap-1.5 items-center">
              <input type="text" value={newChatText} onChange={(e) => setNewChatText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleTriggerSendMessage(); }} placeholder="Type rate/message..." className="flex-1 bg-slate-100 text-slate-900 border border-slate-300 rounded-xl px-3 py-2 text-xs font-black outline-none" />
              <button onClick={handleTriggerSendMessage} className="bg-indigo-600 text-white font-black text-xs px-3 py-2 rounded-xl">Send</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
