'use client';

import { useState, useEffect, useRef } from 'react';

// SUPABASE & API CONFIG
const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTpSg";
const SMS_API_URL = "https://europe-west1-sms-gateway-api-simpapp.cloudfunctions.net/api_v2_sms_send";

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [profile, setProfile] = useState({ name: 'Guest', phone: '', pic: '' });
  const [showSplash, setShowSplash] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: "Zubair", text: "Rate update?", time: "10:15 AM" }
  ]);
  const [newChatText, setNewChatText] = useState('');

  useEffect(() => {
    fetchAds();
    const saved = localStorage.getItem('user_data');
    if(saved) {
        setIsLoggedIn(true);
        setProfile(JSON.parse(saved));
    }
    setTimeout(() => setShowSplash(false), 1500);
  }, []);

  const fetchAds = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/market_ads?select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const data = await res.json();
      setAds(data || []);
    } catch (e) { console.error("Error loading ads"); }
  };

  const handleAdClick = async (ad: any) => {
    setSelectedAd(ad);
    setCurrentPage('detail');
    // Increment view count
    await fetch(`${SUPABASE_URL}/rest/v1/market_ads?id=eq.${ad.id}`, {
      method: 'PATCH',
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ views_count: (ad.views_count || 0) + 1 })
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 relative selection:bg-indigo-500">
      
      {/* 🚀 FONT ENGINE & MARQUEE CSS */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" />
      <style>{`
        .urdu-text { font-family: 'Noto Nastaliq Urdu', serif; }
        @keyframes scroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .ticker { animation: scroll 20s linear infinite; }
      `}</style>

      {/* HEADER */}
      <header className="bg-[#1a365d] text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <h1 className="font-black text-lg">SCRAP WORLD</h1>
        <div className="flex gap-2">
           <button onClick={() => setShowHelp(!showHelp)} className="bg-white/20 px-3 py-1 rounded-lg text-xs font-black">Help ❓</button>
        </div>
      </header>

      {showHelp && (
        <div className="bg-amber-100 p-4 m-4 rounded-xl border border-amber-300 text-xs font-black text-amber-900">
          <p>📧 Email: scrapworld92@gmail.com</p>
          <p>💬 WhatsApp: 0300 8641994</p>
        </div>
      )}

      {/* LIVE TICKER */}
      <div className="bg-slate-900 text-white text-xs font-black py-2 overflow-hidden whitespace-nowrap">
        <div className="ticker inline-block">
          💵 USD/PKR: 278.50 | 🔩 Loha: $390/T | ⚡ Copper: $8950/T | 🥫 Aluminum: $2420/T
        </div>
      </div>

      {currentPage === 'home' && (
        <main className="p-4 space-y-4">
          {/* CATEGORY BOX */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 grid grid-cols-3 gap-2">
            {['Imported', 'Local', 'Chaaloo'].map(cat => (
              <button key={cat} className="bg-indigo-900 text-white py-3 rounded-xl font-black text-xs shadow-md">{cat}</button>
            ))}
          </div>

          {/* ADS FEED */}
          <div className="grid gap-4">
            {ads.map(ad => (
              <div key={ad.id} onClick={() => handleAdClick(ad)} className="bg-white p-4 rounded-2xl border shadow-sm">
                <div className="flex gap-3">
                  <img src={ad.image_url || 'https://via.placeholder.com/100'} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h3 className="font-black text-sm">{ad.title}</h3>
                    <p className="text-green-600 font-black">Rs.{ad.price}</p>
                    <p className="text-[10px] text-slate-400 font-black">👁️ {ad.views_count || 0} People viewed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* AD DETAIL PAGE */}
      {currentPage === 'detail' && selectedAd && (
        <main className="p-4 space-y-4 bg-white min-h-screen">
          <button onClick={() => setCurrentPage('home')} className="bg-slate-200 px-4 py-2 rounded-lg font-black text-xs">← Back</button>
          <img src={selectedAd.image_url} className="w-full h-64 rounded-2xl object-cover" />
          <h2 className="font-black text-2xl">{selectedAd.title}</h2>
          <p className="text-slate-600 font-bold">{selectedAd.description}</p>
          <p className="text-indigo-600 font-black">📍 Location: {selectedAd.location_text}</p>
          
          <div className="grid grid-cols-2 gap-3 fixed bottom-20 w-full left-0 p-4">
            <a href={`tel:${selectedAd.user_phone}`} className="bg-emerald-600 text-white text-center py-4 rounded-xl font-black shadow-lg">📞 Call</a>
            <a href={`https://wa.me/${selectedAd.user_phone}`} className="bg-green-500 text-white text-center py-4 rounded-xl font-black shadow-lg">💬 WhatsApp</a>
          </div>
        </main>
      )}

      {/* OPTIONS MENU */}
      {currentPage === 'page2' && (
        <div className="p-4 space-y-4">
            <h2 className="font-black text-xl">☰ Menu</h2>
            <div className="bg-white p-4 rounded-xl border font-black space-y-4">
                <div onClick={() => setCurrentPage('profile')} className="border-b pb-2">👤 Profile</div>
                <div onClick={() => setCurrentPage('myads')} className="border-b pb-2">📋 My Ads</div>
                <div onClick={() => setCurrentPage('chats')} className="border-b pb-2">💬 Chats</div>
                <div className="text-indigo-900">🥇 R-H-A-F Industries</div>
            </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 w-full bg-white border-t p-3 flex justify-around z-50">
        <button onClick={() => setCurrentPage('home')} className="font-black text-xs">🏠 Home</button>
        <button onClick={() => setCurrentPage('chats')} className="font-black text-xs">💬 Chats</button>
        <button onClick={() => setCurrentPage('page4')} className="bg-indigo-600 text-white p-4 rounded-full -mt-8 font-black shadow-xl">+</button>
        <button onClick={() => setCurrentPage('myads')} className="font-black text-xs">📋 My Ads</button>
        <button onClick={() => setCurrentPage('page2')} className="font-black text-xs">☰ Menu</button>
      </nav>
    </div>
  );
}
