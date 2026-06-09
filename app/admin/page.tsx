'use client';

import { useState, useEffect } from 'react';

// Mock Databases for Admin variables manipulation
const initialStats = { totalAds: 124, pendingAds: 5, totalFactories: 18, totalVolumeTon: "450 Ton" };

const initialAdsData = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", mainCat: "iron", price: "125", weight: "12 Ton", status: "approved", seller: "Aslam Trader", phone: "0300-1234567" },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", mainCat: "copper", price: "1,870", weight: "450 Kg", status: "approved", seller: "Kamran Bhai", phone: "0321-7654321" },
  { id: 5, titleEn: "Useable Industrial Electric Motor 5HP (Chaaloo)", titleUr: "صنعتی الیکٹرک موٹر 5HP (چالو مال)", city: "gujranwala", mainCat: "chaaloo", price: "16,500", weight: "2 units", status: "pending", seller: "Zahid Machinery", phone: "0333-1122334" },
  { id: 6, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", mainCat: "plastic", price: "98", weight: "3 Ton", status: "pending", seller: "Lahore Recycling Co", phone: "0300-9988776" }
];

const initialCategories = [
  { cat: 'iron', labelEn: "Iron (Loha)", labelUr: "لوہا", icon: "🔩" },
  { cat: 'plastic', labelEn: "Plastic", labelUr: "پلاسٹک", icon: "🛢️" },
  { cat: 'copper', labelEn: "Copper (Tamba)", labelUr: "تانبا", icon: "🔌" },
  { cat: 'aluminum', labelEn: "Aluminum", labelUr: "ایلومینیم", icon: "🥫" },
  { cat: 'chaaloo', labelEn: "Chaaloo Maal", labelUr: "چالو مال", icon: "⚡" }
];

const initialScrapRates: any = {
  gujranwala: [
    { id: "iron", name: "Iron / Loha", price: "120" },
    { id: "copper", name: "Copper / Tamba", price: "1850" },
    { id: "aluminum", name: "Aluminum", price: "450" },
    { id: "plastic", name: "Plastic", price: "95" }
  ],
  lahore: [
    { id: "iron", name: "Iron / Loha", price: "124" },
    { id: "copper", name: "Copper / Tamba", price: "1880" }
  ]
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeSidebar, setActiveSidebar] = useState<'overview' | 'ads' | 'rates' | 'categories'>('overview');
  
  // Dashboard Core Dynamic States
  const [adsList, setAdsList] = useState(initialAdsData);
  const [categories, setCategories] = useState(initialCategories);
  const [currentRates, setCurrentRates] = useState(initialScrapRates);
  const [selectedCityForRates, setSelectedCityForRates] = useState('gujranwala');
  const [adFilterTab, setAdFilterTab] = useState<'all' | 'pending' | 'approved'>('all');

  // Form States for Additions
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatUr, setNewCatUr] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🔩');

  const handleLogin = () => {
    if (passcode === '78612') {
      setIsAuthenticated(true);
    } else {
      alert("Ghalt Passcode! Koshish na karein.");
    }
  };

  // Status Modifiers
  const updateAdStatus = (id: number, nextStatus: string) => {
    setAdsList(prev => prev.map(ad => ad.id === id ? { ...ad, status: nextStatus } : ad));
  };

  const deleteAd = (id: number) => {
    setAdsList(prev => prev.filter(ad => ad.id !== id));
  };

  const handleAddCategory = () => {
    if(!newCatEn || !newCatUr) return;
    setCategories([...categories, { cat: `dynamic_${Date.now()}`, labelEn: newCatEn, labelUr: newCatUr, icon: newCatIcon }]);
    setNewCatEn(''); setNewCatUr('');
    alert("Nayi Category Dashboard aur App par add ho gayi!");
  };

  const handleRateChange = (id: string, newPrice: string) => {
    setCurrentRates((prev: any) => ({
      ...prev,
      [selectedCityForRates]: prev[selectedCityForRates].map((r: any) => r.id === id ? { ...r, price: newPrice } : r)
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4" style={{ fontFamily: 'sans-serif' }}>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="text-6xl">🔒</div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">SCRAP WORLD</h1>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-widest">Central Command Portal</p>
          </div>
          <div className="space-y-2">
            <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} placeholder="Enter 5-Digit Master Key" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 text-center text-xl font-black tracking-widest outline-none focus:border-amber-500 transition-all" />
          </div>
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs py-4 rounded-xl uppercase tracking-wider shadow-lg transform active:scale-95 transition-all">Secure Login 🚀</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800" style={{ fontFamily: 'sans-serif' }}>
      
      {/* 1. LEFT FIXED DESKTOP SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 shrink-0 shadow-xl">
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-4 text-center">
            <h2 className="text-amber-400 font-black text-lg tracking-wider">⚡ COMMAND CENTER</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Asif Temur Panel</p>
          </div>
          <nav className="space-y-1.5">
            <button onClick={() => setActiveSidebar('overview')} className={`w-full text-left p-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all ${activeSidebar === 'overview' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800'}`}>📊 Main Analytics Overview</button>
            <button onClick={() => setActiveSidebar('ads')} className={`w-full text-left p-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all ${activeSidebar === 'ads' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800'}`}>📋 Moderate Ads Stream</button>
            <button onClick={() => setActiveSidebar('rates')} className={`w-full text-left p-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all ${activeSidebar === 'rates' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800'}`}>💰 Mandi Live Rates Engine</button>
            <button onClick={() => setActiveSidebar('categories')} className={`w-full text-left p-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all ${activeSidebar === 'categories' ? 'bg-amber-500 text-slate-950' : 'hover:bg-slate-800'}`}>🔩 App Category Manager</button>
          </nav>
        </div>
        <div className="pt-4 border-t border-slate-800">
          <button onClick={() => setIsAuthenticated(false)} className="w-full bg-red-600/20 text-red-400 border border-red-500/30 font-black text-xs py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all">Lock & Logout 🔒</button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT DISPLAY AREA */}
      <main className="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-8">
        
        {/* Header Ribbon */}
        <header className="flex justify-between items-center border-b pb-4 border-slate-300">
          <div>
            <h1 className="text-2xl font-black text-slate-900 capitalize">{activeSidebar} Controls</h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Live System Control Dashboard Node</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full animate-pulse">● DATABASE CONNECTED</span>
          </div>
        </header>

        {/* TAB CONTENT: OVERVIEW */}
        {activeSidebar === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Total Ads Posted</span><span className="text-3xl font-black block mt-1 text-slate-900">{adsList.length}</span></div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Pending Approvals</span><span className="text-3xl font-black block mt-1 text-amber-600">{adsList.filter(a=>a.status==='pending').length}</span></div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Active Categories</span><span className="text-3xl font-black block mt-1 text-indigo-600">{categories.length}</span></div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Est. Market Weight</span><span className="text-3xl font-black block mt-1 text-emerald-600">{initialStats.totalVolumeTon}</span></div>
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
              <h3 className="font-black text-base">Quick Action Feed Summary</h3>
              <p className="text-xs text-slate-500">Aap ke control panel par is waqt <b>{adsList.filter(a=>a.status==='pending').length} ads</b> approval ke muntazir hain. Mandi rates live chal rahe hain.</p>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ADS MODERATION */}
        {activeSidebar === 'ads' && (
          <div className="space-y-4">
            <div className="flex gap-2 border-b pb-2 border-slate-200">
              <button onClick={() => setAdFilterTab('all')} className={`px-4 py-1.5 rounded-lg text-xs font-black ${adFilterTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-200'}`}>All Ads Pool ({adsList.length})</button>
              <button onClick={() => setAdFilterTab('pending')} className={`px-4 py-1.5 rounded-lg text-xs font-black ${adFilterTab === 'pending' ? 'bg-amber-500 text-slate-950' : 'bg-slate-200'}`}>Pending Approvals ({adsList.filter(a=>a.status==='pending').length})</button>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider">
                    <th className="p-4">Item Details</th>
                    <th className="p-4">Seller Contact</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Price / Weight</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions Dashboard</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium">
                  {adsList
                    .filter(ad => adFilterTab === 'all' ? true : ad.status === adFilterTab)
                    .map(ad => (
                      <tr key={ad.id} className="hover:bg-slate-50/80">
                        <td className="p-4">
                          <div className="font-extrabold text-sm text-slate-900">{ad.titleEn}</div>
                          <div className="text-slate-400 text-[11px] mt-0.5">{ad.titleUr}</div>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-slate-700 block">{ad.seller}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{ad.phone}</span>
                        </td>
                        <td className="p-4 uppercase font-bold text-slate-600">{ad.city}</td>
                        <td className="p-4">
                          <span className="text-green-600 font-black text-sm block">Rs.{ad.price}</span>
                          <span className="text-slate-400 font-bold text-[10px] bg-slate-100 px-1 rounded">{ad.weight}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full font-black text-[9px] uppercase ${ad.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{ad.status}</span>
                        </td>
                        <td className="p-4 text-right space-x-1 space-x-reverse">
                          {ad.status === 'pending' && <button onClick={() => updateAdStatus(ad.id, 'approved')} className="bg-emerald-600 text-white font-black px-2.5 py-1.5 rounded-lg text-[10px] shadow-sm">Approve ✓</button>}
                          <button onClick={() => deleteAd(ad.id)} className="bg-red-100 text-red-700 font-black px-2.5 py-1.5 rounded-lg text-[10px]">Delete ✕</button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: LIVE RATES ENGINE */}
        {activeSidebar === 'rates' && (
          <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Mandi Price Live Variable Matrix</h3>
                <p className="text-xs text-slate-400 font-medium">Yahan badla hua rate foran user app ki home screen par live ho jayega.</p>
              </div>
              <div className="flex gap-2">
                {Object.keys(currentRates).map(city => (
                  <button key={city} onClick={() => setSelectedCityForRates(city)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${selectedCityForRates === city ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>📍 {city}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentRates[selectedCityForRates]?.map((rateItem: any) => (
                <div key={rateItem.id} className="border p-4 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wide">{rateItem.name}</span>
                  <div className="flex items-center bg-white border rounded-xl overflow-hidden shadow-inner px-3">
                    <span className="text-xs text-slate-400 font-bold mr-2">Rs.</span>
                    <input type="text" value={rateItem.price} onChange={(e) => handleRateChange(rateItem.id, e.target.value)} className="w-24 p-2 text-right font-black text-sm outline-none text-green-600" />
                    <span className="text-[10px] text-slate-400 font-bold ml-1">/Kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: CATEGORY MANAGER */}
        {activeSidebar === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-dashed rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-black text-base">Create Nayi Scrap Category Slot</h3>
              <div className="grid grid-cols-3 gap-3">
                <input type="text" value={newCatEn} onChange={(e) => setNewCatEn(e.target.value)} placeholder="Category Title (English)" className="bg-slate-50 border rounded-xl p-3 text-xs font-bold outline-none" />
                <input type="text" value={newCatUr} onChange={(e) => setNewCatUr(e.target.value)} placeholder="Category Title (Urdu)" className="bg-slate-50 border rounded-xl p-3 text-xs font-bold outline-none text-right" />
                <select value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} className="bg-slate-50 border rounded-xl p-3 text-xs font-bold text-slate-700 outline-none">
                  <option value="🔩">🔩 Structural Bolt/Iron</option>
                  <option value="🛢️">🛢️ Plastic Drum / Flakes</option>
                  <option value="🔌">🔌 Copper Wire / Electronics</option>
                  <option value="☀️">☀️ Solar Silicon Cells</option>
                </select>
              </div>
              <button onClick={handleAddCategory} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-6 py-3 rounded-xl shadow-md transition-all">Push Category Component Database Layer 🚀</button>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Active Categories Catalog Matrix</h4>
              <div className="grid grid-cols-4 gap-3">
                {categories.map((cat, i) => (
                  <div key={i} className="bg-slate-50 border rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <span className="text-xs font-black text-slate-800 block leading-none">{cat.labelEn}</span>
                        <span className="text-[10px] text-slate-400 font-bold block mt-1">{cat.labelUr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
