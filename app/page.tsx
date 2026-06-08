'use client';

import { useState } from 'react';

export default function Home() {
  // 1. Khareedari Fehrist (Buyer List Data)
  const [buyerItems] = useState([
    { id: 1, item: 'Scrap Iron (Loha)', rate: 'Rs. 180 / kg', quantity: '5 Tons', city: 'Gujranwala' },
    { id: 2, item: 'Copper Scrap (Tamba)', rate: 'Rs. 2,100 / kg', quantity: '800 kg', city: 'Lahore' },
    { id: 3, item: 'Aluminum Pack', rate: 'Rs. 350 / kg', quantity: '1.5 Tons', city: 'Sialkot' },
  ]);

  // 2. Farokht Fehrist (Sell List Data)
  const [sellItems] = useState([
    { id: 1, item: 'Old Car Batteries', rate: 'Rs. 4,500 / pc', quantity: '40 Pcs', city: 'Gujranwala' },
    { id: 2, item: 'Plastic Bottles (PET)', rate: 'Rs. 85 / kg', quantity: '1200 kg', city: 'Faisalabad' },
    { id: 3, item: 'Electronic Waste Boards', rate: 'Rs. 650 / kg', quantity: '300 kg', city: 'Lahore' },
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- PREMIUM NAVBAR --- */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-50 px-4 py-3.5 shadow-sm shadow-slate-100/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20">
              <svg className="w-5 h-5 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-.5 1l3.5 3.5L23.5 9" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              SCRAP<span className="text-emerald-600 font-extrabold">APP</span>
            </span>
          </div>
          
          {/* Login Button */}
          <div>
            <button 
              onClick={() => alert('Login Feature Coming Soon!')}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Login / Register
            </button>
          </div>

        </div>
      </header>

      {/* --- MAIN DASHBOARD --- */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* PREMIUM QUICK BUTTONS */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {/* Aaj Ke Rates Button */}
          <button 
            onClick={() => alert('Aaj ke taza rates jald shuru honge!')}
            className="bg-white hover:bg-amber-50/30 border border-slate-200 text-amber-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm hover:border-amber-200 group"
          >
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m9-.5V11a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m5.5-1.5V14a3 3 0 00-3-3H12a3 3 0 00-3 3v6" />
              </svg>
            </span>
            Aaj Ke Rates
          </button>
          
          {/* Post Ad Button */}
          <button 
            onClick={() => alert('Post Ad feature active ho raha hai!')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md shadow-emerald-600/10 hover:shadow-lg"
          >
            <span className="p-2 rounded-xl bg-white/10 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            Post Ad (Ishtahar)
          </button>
        </div>

        {/* --- DUAL FEHRIST GRID --- */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* COLUMN 1: KHAREEDARI FEHRIST (BUYER) */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-md bg-blue-500 shadow-sm shadow-blue-500/40"></span>
                Khareedari Fehrist (Buyer List)
              </h2>
              <span className="text-[11px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold border border-blue-100">Demand</span>
            </div>

            <div className="space-y-3">
              {buyerItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex justify-between items-center hover:border-blue-300 hover:shadow-md hover:shadow-slate-100/80 transition-all group">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{item.item}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>Req: <strong className="text-slate-600 font-semibold">{item.quantity}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">📍 {item.city}</span>
                    </div>
                  </div>
                  <span className="text-sm bg-slate-50 text-emerald-600 font-black px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: FAROKHT FEHRIST (SELL) */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500 shadow-sm shadow-emerald-500/40"></span>
                Farokht Fehrist (Sell List)
              </h2>
              <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-bold border border-emerald-100">Available</span>
            </div>

            <div className="space-y-3">
              {sellItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex justify-between items-center hover:border-emerald-300 hover:shadow-md hover:shadow-slate-100/80 transition-all group">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-600 transition-colors">{item.item}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>Stock: <strong className="text-slate-600 font-semibold">{item.quantity}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">📍 {item.city}</span>
                    </div>
                  </div>
                  <span className="text-sm bg-slate-50 text-emerald-600 font-black px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="text-center py-10 text-slate-400 text-xs border-t border-slate-200/60 bg-white mt-20">
        © 2026 Scrap App Corporation. Made for Professional Recyclers.
      </footer>
    </div>
  );
}
