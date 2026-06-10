'use client';

import { useState, useEffect } from 'react';

const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('categories');

  // Database Systems Array States
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbAds, setDbAds] = useState<any[]>([]);

  // Input States
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatUr, setNewCatUr] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🔩');

  const handleLogin = () => {
    if (passcode === '78612') {
      setIsAuthenticated(true);
      fetchLiveSystemData();
    } else {
      alert("⚠️ Ghalat Passcode! Access Denied.");
    }
  };

  const fetchLiveSystemData = async () => {
    try {
      // 1. Fetch Categories Matrix
      const resCats = await fetch(`${SUPABASE_URL}/rest/v1/app_categories?select=*&order=id.asc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataCats = await resCats.json();
      if (Array.isArray(dataCats)) setDbCategories(dataCats);

      // 2. Fetch Active Ads Stream
      const resAds = await fetch(`${SUPABASE_URL}/rest/v1/user_ads?select=*&order=id.desc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataAds = await resAds.json();
      if (Array.isArray(dataAds)) setDbAds(dataAds);

    } catch (e) {
      console.error("System pipeline fault:", e);
    }
  };

  // 👑 ACTION: PUSH LIVE CATEGORY SLOT
  const handlePushCategory = async () => {
    if (!newCatEn || !newCatUr) {
      alert("Meherbani kar ke English aur Urdu dono Name likhein!");
      return;
    }

    const standardId = newCatEn.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newCategoryPayload = {
      cat: standardId,
      labelEn: newCatEn,
      labelUr: newCatUr,
      icon: newCatIcon
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/app_categories`, {
        method: 'POST',
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(newCategoryPayload)
      });

      if (res.ok) {
        alert("🚀 Nayi Category Database Layer par kamyabi se add ho gayi!");
        setNewCatEn(''); setNewCatUr('');
        fetchLiveSystemData();
      } else {
        alert("Fault: Category code already registered in matrix.");
      }
    } catch (e) {
      alert("Database link fault.");
    }
  };

  // 👑 ACTION: REMOVE CATEGORY LAYER
  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Kya aap waqai is category ko system se mitaana chahte hain?")) return;

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/app_categories?id=eq.${id}`, {
        method: 'DELETE',
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      alert("🗑️ Category Layer removed successfully!");
      fetchLiveSystemData();
    } catch (e) {
      alert("Error removing category node.");
    }
  };

  // 👑 ACTION: DELETE LIVE AD SLOTS
  const handleDeleteAd = async (id: number) => {
    if (!confirm("Kya aap is advertisement ko delete karna chahte hain?")) return;

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_ads?id=eq.${id}`, {
        method: 'DELETE',
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      alert("🗑️ Ad deleted live from server stream!");
      fetchLiveSystemData();
    } catch (e) {
      alert("Error clearing ad node.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-white" style={{ fontFamily: 'sans-serif' }}>
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="text-5xl">🔐</div>
          <h2 className="text-xl font-black text-amber-400">COMMAND CENTER ACCESS</h2>
          <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="•••••" className="w-full bg-slate-950 text-center font-black text-lg p-3 rounded-xl text-white outline-none border border-slate-800 focus:border-amber-500" />
          <button onClick={handleLogin} className="w-full bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl">Secure Entry Key 🚀</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex" style={{ fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR BLOCK */}
      <aside className="w-64 bg-[#111c44] text-slate-400 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800 text-center">
            <h1 className="text-amber-400 font-black text-lg tracking-wider">⚡ COMMAND CENTER</h1>
            <span className="text-[10px] font-bold text-slate-500">ASIF TEMUR PANEL</span>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => setActiveTab('categories')} className={`w-full text-left p-3 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'categories' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800 text-slate-300'}`}>🛠️ App Category Manager</button>
            <button onClick={() => setActiveTab('ads')} className={`w-full text-left p-3 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'ads' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800 text-slate-300'}`}>📋 Moderate Ads Stream ({dbAds.length})</button>
          </nav>
        </div>
        <div className="p-4"><button onClick={() => setIsAuthenticated(false)} className="w-full bg-red-950/40 text-red-400 border border-red-900/50 p-2.5 rounded-xl text-xs font-black">Lock & Logout 🔒</button></div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {activeTab === 'categories' ? 'Categories Controls' : 'User Ads Stream Manager'}
              </h2>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1 rounded-full border border-emerald-300">● LIVE DATABASE OK</span>
          </div>

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 bg-white p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-black text-slate-800 uppercase">Create Nayi Scrap Category Slot</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" value={newCatEn} onChange={(e) => setNewCatEn(e.target.value)} placeholder="Category Title (English)" className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none" />
                  <input type="text" value={newCatUr} onChange={(e) => setNewCatUr(e.target.value)} placeholder="Category Title (Urdu)" className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-right outline-none" dir="rtl" />
                  <select value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none">
                    <option value="🔩">🔩 Structural Bolt/Iron</option>
                    <option value="🛢️">🛢️ Plastic Drums Flakes</option>
                    <option value="🔌">🔌 Copper Wire Cable</option>
                    <option value="🥫">🥫 Aluminum Cans Bundle</option>
                    <option value="🔋">🔋 Lead Acid Batteries</option>
                    <option value="☀️">☀️ Solar Silicon Panel</option>
                    <option value="⚡">⚡ Chaaloo Machinery Maal</option>
                    <option value="💻">💻 Electronic Scrap Hardware</option>
                  </select>
                </div>
                <button onClick={handlePushCategory} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md">
                  Push Category Component Database Layer 🚀
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Active Categories Catalog Matrix</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dbCategories.map((item) => (
                    <div key={item.id} className="border border-slate-200 rounded-xl p-3.5 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h5 className="font-black text-xs text-slate-800 leading-tight">{item.labelEn}</h5>
                          <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{item.labelUr}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteCategory(item.id)} className="text-red-500 hover:bg-red-50 text-xs font-bold w-6 h-6 flex items-center justify-center border rounded-full">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Live Active Ads Matrix Store</h3>
              {dbAds.length > 0 ? (
                <div className="space-y-3">
                  {dbAds.map((ad) => (
                    <div key={ad.id} className="bg-slate-50 border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-black text-blue-800 uppercase tracking-wider bg-blue-50 border px-2 py-0.5 rounded">📍 {ad.city} • {ad.mainCat}</span>
                        <h4 className="font-extrabold text-sm text-slate-800 mt-1">{ad.titleEn}</h4>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">Weight: <span className="text-slate-900 font-bold">{ad.weight}</span> | Rate: <span className="text-green-600 font-black">Rs.{ad.price} /{ad.unit}</span></p>
                      </div>
                      <button onClick={() => handleDeleteAd(ad.id)} className="bg-red-100 text-red-600 font-black text-xs px-4 py-2 rounded-xl border border-transparent hover:border-red-300">Delete Ad ✕</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 font-black bg-slate-50 border border-dashed rounded-xl">No active advertisements found.</div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
