'use client';

import { useState, useEffect, useRef } from 'react';

const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTpSg";

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [ads, setAds] = useState<any[]>([]);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('nearest');
  
  // FORM & PROFILE STATES
  const [adTitle, setAdTitle] = useState('');
  const [adPrice, setAdPrice] = useState('');
  const [hideNumber, setHideNumber] = useState(false);

  useEffect(() => {
    fetchAds();
    setTimeout(() => setShowSplash(false), 2000);
  }, []);

  const fetchAds = async () => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/market_ads?select=*`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
    });
    const data = await res.json();
    setAds(data || []);
  };

  // TRACKING LOGIC (VIEW OR CALL CLICK)
  const trackAction = async (adId: string, field: string) => {
    await fetch(`${SUPABASE_URL}/rest/v1/market_ads?id=eq.${adId}`, {
      method: 'PATCH',
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: (selectedAd[field] || 0) + 1 })
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-indigo-500">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" />
      <style>{`
        .urdu-text { font-family: 'Noto Nastaliq Urdu', serif !important; }
      `}</style>

      {/* HEADER */}
      <header className="bg-[#1a365d] text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <h1 className="font-black text-xl">SCRAP WORLD</h1>
        <button onClick={() => setShowHelp(!showHelp)} className="bg-white/20 p-2 rounded-lg text-xs font-black">Help ❓</button>
      </header>

      {/* HELP BOX */}
      {showHelp && (
        <div className="bg-amber-100 p-4 m-4 rounded-xl border border-amber-300 text-xs font-black text-amber-900">
          <p>📧 Email: scrapworld92@gmail.com</p>
          <p className="mt-1">💬 WhatsApp: 0300 8641994</p>
        </div>
      )}

      {currentPage === 'home' && (
        <main className="p-4 space-y-4">
          {/* CATEGORY BAR */}
          <div className="bg-white p-2 rounded-2xl border flex gap-2 overflow-x-auto">
            {['All', 'Imported', 'Local', 'Chaaloo'].map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-3 rounded-xl font-black text-xs whitespace-nowrap ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* ADS LIST */}
          <div className="space-y-4">
            {ads.filter(a => selectedCategory === 'All' || a.category === selectedCategory).map(ad => (
              <div key={ad.id} onClick={() => { setSelectedAd(ad); setCurrentPage('detail'); }} className="bg-white p-4 rounded-2xl border shadow-sm flex gap-4 cursor-pointer">
                <img src={ad.image_url || 'https://via.placeholder.com/100'} className="w-24 h-24 rounded-xl object-cover bg-slate-100" />
                <div className="flex-1">
                  <h3 className="font-black text-sm">{ad.title}</h3>
                  <p className="text-green-600 font-black">Rs.{ad.price}</p>
                  <p className="text-[10px] text-slate-400 font-black">📍 {ad.location_text}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* DETAIL PAGE */}
      {currentPage === 'detail' && selectedAd && (
        <main className="p-4 space-y-4 bg-white min-h-screen">
          <button onClick={() => setCurrentPage('home')} className="bg-slate-200 px-4 py-2 rounded-lg font-black text-xs">← Back</button>
          <img src={selectedAd.image_url} className="w-full h-64 rounded-2xl object-cover" />
          <h2 className="font-black text-2xl">{selectedAd.title}</h2>
          <p className="text-slate-600 font-bold">{selectedAd.description || "Description here"}</p>
          
          <div className="grid grid-cols-2 gap-3 fixed bottom-20 w-full left-0 px-4">
            <button onClick={() => { trackAction(selectedAd.id, 'call_count'); window.location.href = `tel:${selectedAd.user_phone}`; }} className="bg-emerald-600 text-white py-4 rounded-xl font-black shadow-lg">Call Now</button>
            <button onClick={() => { trackAction(selectedAd.id, 'wa_count'); window.location.href = `https://wa.me/92${selectedAd.user_phone.replace(/^0+/, '')}`; }} className="bg-green-500 text-white py-4 rounded-xl font-black shadow-lg">WhatsApp</button>
          </div>
        </main>
      )}

      {/* POST AD */}
      {currentPage === 'page4' && (
        <div className="p-4 space-y-4">
           <h2 className="font-black text-xl">Post Scrap Ad</h2>
           <input className="w-full p-4 border rounded-xl" placeholder="Title" onChange={(e) => setAdTitle(e.target.value)} />
           <div className="flex items-center gap-2 font-black text-xs">
             <input type="checkbox" onChange={(e) => setHideNumber(e.target.checked)} />
             <span>Hide Phone Number from Public</span>
           </div>
           <button onClick={() => alert('Ad Posted!')} className="w-full bg-indigo-600 text-white p-4 rounded-xl font-black">Submit</button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 w-full bg-white border-t p-3 flex justify-around z-50">
        <button onClick={() => setCurrentPage('home')} className="font-black text-xs">🏠 Home</button>
        <button onClick={() => setCurrentPage('chats')} className="font-black text-xs">💬 Chats</button>
        <button onClick={() => setCurrentPage('page4')} className="bg-indigo-600 text-white p-4 rounded-full -mt-8 font-black">+</button>
        <button onClick={() => setCurrentPage('myads')} className="font-black text-xs">📋 My Ads</button>
        <button onClick={() => setCurrentPage('page2')} className="font-black text-xs">☰ Menu</button>
      </nav>
    </div>
  );
}
