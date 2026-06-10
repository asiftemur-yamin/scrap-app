'use client';

import { useState, useEffect, useRef } from 'react';

// 👑 LIVE CONNECTED DATABASE KEYS (FIXED BY GEMINI)
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

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  // Live Data States
  const [mandiRates, setMandiRates] = useState<any[]>([]);
  const [pendingAds, setPendingAds] = useState<any[]>([]);
  const [appSettings, setAppSettings] = useState({ app_name: 'SCRAP WORLD', logo_url: '' });

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
      const resSettings = await fetch(`${SUPABASE_URL}/rest/v1/app_settings?id=eq.1&select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataSet = await resSettings.json();
      if (dataSet && dataSet[0]) {
        setAppSettings(dataSet[0]);
        setNewAppName(dataSet[0].app_name);
        setNewLogoUrl(dataSet[0].logo_url || '');
      }

      const resRates = await fetch(`${SUPABASE_URL}/rest/v1/mandi_rates?select=*&order=city.asc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataRates = await resRates.json();
      if(Array.isArray(dataRates)) setMandiRates(dataRates);

      const resAds = await fetch(`${SUPABASE_URL}/rest/v1/user_ads?status=eq.pending&select=*`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const dataAds = await resAds.json();
      if(Array.isArray(dataAds)) setPendingAds(dataAds);

    } catch (e) {
      console.error("Error pulling admin data:", e);
    }
  };

  const handleUpdateRateSave = async (id: number) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/mandi_rates?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ price: editingPriceValue })
      });
      alert("Rate updated successfully!");
      setEditingRateId(null);
      fetchAdminData();
    } catch (e) {
      alert("Error updating rate");
    }
  };

  const handleAdStatusChange = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_ads?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      alert(`Ad state marked as ${status}!`);
      fetchAdminData();
    } catch (e) {
      alert("Error changing ad status");
    }
  };

  const handleSaveIdentity = async () => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/app_settings?id=eq.1`, {
        method: 'PATCH',
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ app_name: newAppName, logo_url: newLogoUrl })
      });
      alert("👑 App Name & Logo Identity updated live on system database!");
      fetchAdminData();
    } catch (e) {
      alert("Error saving settings configuration");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="text-5xl">🔐</div>
          <h2 className="text-xl font-black tracking-wider text-amber-400">SCRAP WORLD SYSTEM</h2>
          <p className="text-xs text-slate-400 font-medium">Enter your secure verification passcode control access keys.</p>
          <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="•••••" className="w-full bg-slate-950 border border-slate-800 text-center font-black tracking-widest text-lg p-3 rounded-xl text-white outline-none focus:border-amber-500" />
          <button onClick={handleLogin} className="w-full bg-amber-500 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-md uppercase tracking-wider">Secure Portal Entry 🚀</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 pb-16" style={{ fontFamily: 'sans-serif', textAlign: 'left' }} dir="ltr">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-[#1a365d] text-white p-5 rounded-2xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-wide">CENTRAL COMMAND PORTAL</h1>
            <p className="text-xs text-slate-300 font-bold mt-0.5">R-H-A-F RECYCLING Main Administration System Dashboard</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 text-xs font-bold px-3 py-1.5 rounded-lg">Lock System</button>
        </div>

        {/* IDENTITY MANAGER */}
        <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider border-b pb-2">👑 App Identity Configuration (Logo & Text)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Application Display Name</span>
              <input type="text" value={newAppName} onChange={(e) => setNewAppName(e.target.value)} className="w-full bg-slate-50 border rounded-xl p-3 font-bold text-sm text-slate-800 outline-none" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Logo Image Web URL Link</span>
              <input type="text" value={newLogoUrl} onChange={(e) => setNewLogoUrl(e.target.value)} placeholder="https://image-link.com/logo.png" className="w-full bg-slate-50 border rounded-xl p-3 font-medium text-xs text-slate-600 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {appSettings.logo_url && <img src={appSettings.logo_url} className="w-12 h-12 rounded-xl object-cover border" />}
            <button onClick={handleSaveIdentity} className="bg-emerald-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow">Save Identity Setup Changes ✓</button>
          </div>
        </div>

        {/* RATES TABLE */}
        <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider border-b pb-2">💰 Broadcast Mandi Rates Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-400 border-b">
                  <th className="p-3">Mandi City</th>
                  <th className="p-3">Material Category Name</th>
                  <th className="p-3 text-right">Live Broadcast Rate (Rs.)</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-700 divide-y">
                {mandiRates.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-3 uppercase font-black text-blue-900">📍 {item.city}</td>
                    <td className="p-3 font-extrabold text-slate-800">🔩 {item.item_name}</td>
                    <td className="p-3 text-right font-black text-green-600 text-sm">
                      {editingRateId === item.id ? (
                        <input type="text" value={editingPriceValue} onChange={(e) => setEditingPriceValue(e.target.value)} className="bg-white border rounded px-2 py-1 w-20 text-right outline-none text-slate-800" />
                      ) : (
                        <span>Rs.{item.price} /kg</span>
                      )}
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

        {/* REQUEST QUEUE */}
        <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider border-b pb-2">📋 Incoming User Advertisement Request Queue</h2>
          {pendingAds.length > 0 ? (
            <div className="space-y-3">
              {pendingAds.map((ad) => (
                <div key={ad.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-blue-800 uppercase tracking-wider bg-blue-50 border px-2 py-0.5 rounded">📍 {ad.city} • {ad.main_cat}</span>
                    <h4 className="font-extrabold text-sm text-slate-800">{ad.title}</h4>
                    <p className="text-xs font-semibold text-slate-500">Lot Weight: <span className="text-slate-900 font-bold">{ad.weight}</span> | Demand Price: <span className="text-green-600 font-black">Rs.{ad.price} /{ad.unit}</span></p>
                    {ad.about && <p className="text-[11px] font-normal text-slate-400 italic mt-1 bg-white p-2 rounded border">"{ad.about}"</p>}
                  </div>
                  <div className="flex gap-2 w-full md:w-auto shrink-0">
                    <button onClick={() => handleAdStatusChange(ad.id, 'approved')} className="flex-1 md:flex-none bg-green-600 text-white font-black text-xs px-4 py-2.5 rounded-lg shadow-sm">Approve Live ✓</button>
                    <button onClick={() => handleAdStatusChange(ad.id, 'rejected')} className="flex-1 md:flex-none bg-red-100 text-red-600 font-black text-xs px-4 py-2.5 rounded-lg">Reject ✕</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 font-black bg-slate-50 border border-dashed rounded-xl">Everything is clean! No incoming verification requests in queue list.</div>
          )}
        </div>

      </div>
    </div>
  );
}
