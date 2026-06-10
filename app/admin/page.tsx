'use client';

import { useState, useEffect } from 'react';

const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTPsg";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('rates'); // rates, ads, categories

  // Live Data States
  const [mandiRates, setMandiRates] = useState<any[]>([]);
  const [pendingAds, setPendingAds] = useState<any[]>([]);
  const [appSettings, setAppSettings] = useState({ app_name: 'SCRAP WORLD', logo_url: '' });
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  // Input fields for Adding Category
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatUr, setNewCatUr] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📦');

  // Input states for modifications
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [newAppName, setNewAppName] = useState('');
  const [editingRateId, setEditingRateId] = useState<number | null>(null);
  const [editingPriceValue, setEditingPriceValue] = useState('');

  const handleLogin = () => {
    if (passcode === '78612') {
      setIsAuthenticated(true);
      fetchAdminData();
    } else {
      alert("⚠️ Ghalat Passcode! Access Denied.");
    }
  };

  const fetchAdminData = async () => {
    try {
      // 1. Fetch System Settings
      const resSettings = await fetch(`${SUPABASE_URL}/rest/v1/app_settings?id=eq.1&select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataSet = await resSettings.json();
      if (dataSet && dataSet[0]) {
        setAppSettings(dataSet[0]);
        setNewAppName(dataSet[0].app_name);
        setNewLogoUrl(dataSet[0].logo_url || '');
      }

      // 2. Fetch All Mandi Rates
      const resRates = await fetch(`${SUPABASE_URL}/rest/v1/mandi_rates?select=*&order=city.asc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataRates = await resRates.json();
      if(Array.isArray(dataRates)) setMandiRates(dataRates);

      // 3. Fetch Pending User Ads
      const resAds = await fetch(`${SUPABASE_URL}/rest/v1/user_ads?status=eq.pending&select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataAds = await resAds.json();
      if(Array.isArray(dataAds)) setPendingAds(dataAds);

      // 4. Fetch Live Database Categories
      const resCats = await fetch(`${SUPABASE_URL}/rest/v1/app_categories?select=*&order=id.asc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataCats = await resCats.json();
      if(Array.isArray(dataCats)) setDbCategories(dataCats);

    } catch (e) {
      console.error("Error pulling admin data:", e);
    }
  };

  // 👑 ADD NEW CATEGORY COMPONENT FUNCTION
  const handleAddCategory = async () => {
    if (!newCatEn || !newCatUr) {
      alert("Meherbani kar ke English aur Urdu dono titles likhein!");
      return;
    }

    const uniqueId = newCatEn.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newCategoryObj = {
      cat_id: uniqueId,
      label_en: newCatEn,
      label_ur: newCatUr,
      icon: newCatIcon
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/app_categories`, {
        method: 'POST',
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(newCategoryObj)
      });

      if (response.ok) {
        alert("🚀 Nayi Category Database Layer par kamyabi se add ho gayi!");
        setNewCatEn(''); setNewCatUr('');
        fetchAdminData();
      } else {
        alert("Category already exists or Database error.");
      }
    } catch (e) {
      alert("Error adding component data slot.");
    }
  };

  // 👑 DELETE CATEGORY COMPONENT FUNCTION
  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Kya aap waqai yeh category system se hamesha ke liye delete karna chahte hain?")) return;

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/app_categories?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      });
      alert("🗑️ Category milti-layer database se remove kar di gayi!");
      fetchAdminData();
    } catch (e) {
      alert("Error removing component layer.");
    }
  };

  const handleUpdateRateSave = async (id: number) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/mandi_rates?id=eq.${id}`, {
        method: 'PATCH',
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ price: editingPriceValue })
      });
      alert("Rate updated!"); setEditingRateId(null); fetchAdminData();
    } catch (e) { alert("Error"); }
  };

  const handleAdStatusChange = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_ads?id=eq.${id}`, {
        method: 'PATCH',
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      alert(`Ad state marked as ${status}!`); fetchAdminData();
    } catch (e) { alert("Error"); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="text-5xl">🔐</div>
          <h2 className="text-xl font-black text-amber-400">SCRAP WORLD SYSTEM</h2>
          <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="•••••" className="w-full bg-slate-950 text-center font-black text-lg p-3 rounded-xl text-white outline-none" />
          <button onClick={handleLogin} className="w-full bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl">Secure Portal Entry 🚀</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex" style={{ fontFamily: 'sans-serif' }}>
      
      {/* LEFT FIXED PANEL NAVIGATION (Matching your exact screenshot design layout) */}
      <aside className="w-64 bg-[#111c44] text-slate-400 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800 text-center">
            <h1 className="text-amber-400 font-black text-lg tracking-wider">⚡ COMMAND CENTER</h1>
            <span className="text-[10px] font-bold text-slate-500">ASIF TEMUR PANEL</span>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => setActiveTab('rates')} className={`w-full text-left p-3 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'rates' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800 text-slate-300'}`}>💰 Mandi Live Rates Engine</button>
            <button onClick={() => setActiveTab('ads')} className={`w-full text-left p-3 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'ads' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800 text-slate-300'}`}>📋 Moderate Ads Stream ({pendingAds.length})</button>
            <button onClick={() => setActiveTab('categories')} className={`w-full text-left p-3 rounded-xl text-xs font-black flex items-center gap-2 ${activeTab === 'categories' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800 text-slate-300'}`}>🛠️ App Category Manager</button>
          </nav>
        </div>
        <div className="p-4"><button onClick={() => setIsAuthenticated(false)} className="w-full bg-red-950/40 text-red-400 border border-red-900/50 p-2.5 rounded-xl text-xs font-black">Lock & Logout 🔒</button></div>
      </aside>

      {/* RIGHT MAIN NODE AREA CONTROLS */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {activeTab === 'rates' ? 'Mandi Rates Controls' : activeTab === 'ads' ? 'Advertisement Stream Moderation' : 'Categories Controls'}
              </h2>
              <p className="text-xs text-slate-400 font-bold tracking-wide">LIVE SYSTEM CONTROL DASHBOARD NODE</p>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1 rounded-full border border-emerald-300">● DATABASE CONNECTED</span>
          </div>

          {/* TAB 1: CATEGORIES MANAGER (ADD / DELETE REAL ACTIONS ACTIVE) */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* CREATE BOX DESIGN SLOT */}
              <div className="border-2 border-dashed border-slate-300 bg-white p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-black text-slate-800 uppercase">Create Nayi Scrap Category Slot</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" value={newCatEn} onChange={(e) => setNewCatEn(e.target.value)} placeholder="Category Title (English)" className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-blue-600" />
                  <input type="text" value={newCatUr} onChange={(e) => setNewCatUr(e.target.value)} placeholder="Category Title (Urdu)" className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-right outline-none focus:border-blue-600" dir="rtl" />
                  <select value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none">
                    <option value="🔩">🔩 Structural Bolt/Iron</option>
                    <option value="🛢️">🛢️ Plastic Drums Flakes</option>
                    <option value="🔌">🔌 Copper Wire Cable</option>
                    <option value="🥫">🥫 Aluminum Cans Bundle</option>
                    <option value="🔋">🔋 Lead Acid Batteries</option>
                    <option value="☀️">☀️ Solar Silicon Panel</option>
                    <option value="⚡">⚡ Chaaloo Machinery Maal</option>
                    <option value="📦">📦 Other Scrap Items</option>
                  </select>
                </div>
                <button onClick={handleAddCategory} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all">
                  Push Category Component Database Layer 🚀
                </button>
              </div>

              {/* MATRIX DISPLAY BLOCK */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Active Categories Catalog Matrix</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dbCategories.map((item) => (
                    <div key={item.id} className="border border-slate-200 rounded-xl p-3.5 flex items-center justify-between bg-slate-50/50 group relative hover:border-red-400 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h5 className="font-black text-xs text-slate-800 leading-tight">{item.label_en}</h5>
                          <span className="text-[10px] font-bold text-slate-400 block mt-0.5" dir="rtl">{item.label_ur}</span>
                        </div>
                      </div>
                      {/* Live Delete Action Trigger Button Component */}
                      <button onClick={() => handleDeleteCategory(item.id)} className="text-red-500 hover:bg-red-50 text-xs font-bold p-1 rounded-full w-6 h-6 flex items-center justify-center border border-transparent hover:border-red-200" title="Delete Layer Component">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE RATES ENGINE MANAGEMENT */}
          {activeTab === 'rates' && (
            <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-400 border-b">
                      <th className="p-3">Mandi City</th>
                      <th className="p-3">Material Category</th>
                      <th className="p-3 text-right">Live Rate (Rs.)</th>
                      <th className="p-3浏览 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold text-slate-700 divide-y">
                    {mandiRates.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="p-3 uppercase font-black text-blue-900">📍 {item.city}</td>
                        <td className="p-3 font-extrabold text-slate-800">🔩 {item.item_name}</td>
                        <td className="p-3 text-right font-black text-green-600 text-sm">
                          {editingRateId === item.id ? (
                            <input type="text" value={editingPriceValue} onChange={(e) => setEditingPriceValue(e.target.value)} className="bg-white border rounded px-2 py-1 w-20 text-right text-slate-800" />
                          ) : (<span>Rs.{item.price} /kg</span>)}
                        </td>
                        <td className="p-3 text-center">
                          {editingRateId === item.id ? (
                            <div className="flex justify-center gap-1">
                              <button onClick={() => handleUpdateRateSave(item.id)} className="bg-green-600 text-white px-2 py-1 rounded text-[10px]">Save</button>
                              <button onClick={() => setEditingRateId(null)} className="bg-slate-300 text-slate-700 px-2 py-1 rounded text-[10px]">✕</button>
                            </div>
                          ) : (
                            <button onClick={() => { setEditingRateId(item.id); setEditingPriceValue(item.price); }} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-[10px] font-black">Edit Rate ✏️</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: USER ADS MODERATION BROADCAST */}
          {activeTab === 'ads' && (
            <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
              {pendingAds.length > 0 ? (
                <div className="space-y-3">
                  {pendingAds.map((ad) => (
                    <div key={ad.id} className="bg-slate-50 border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-blue-800 uppercase tracking-wider bg-blue-50 border px-2 py-0.5 rounded">📍 {ad.city} • {ad.main_cat}</span>
                        <h4 className="font-extrabold text-sm text-slate-800">{ad.title}</h4>
                        <p className="text-xs font-semibold text-slate-500">Weight: <span className="text-slate-900 font-bold">{ad.weight}</span> | Demand: <span className="text-green-600 font-black">Rs.{ad.price} /{ad.unit}</span></p>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto shrink-0">
                        <button onClick={() => handleAdStatusChange(ad.id, 'approved')} className="bg-green-600 text-white font-black text-xs px-4 py-2.5 rounded-lg shadow-sm">Approve Live ✓</button>
                        <button onClick={() => handleAdStatusChange(ad.id, 'rejected')} className="bg-red-100 text-red-600 font-black text-xs px-4 py-2.5 rounded-lg">Reject ✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 font-black bg-slate-50 border border-dashed rounded-xl">No incoming verification requests in queue list.</div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
