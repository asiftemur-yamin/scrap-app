'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // 1. Khareedari Fehrist (Buyer List Data)
  const [buyerItems] = useState([
    { id: 1, item: 'Scrap Iron (Loha)', rate: 'Rs. 180 / kg', quantity: '5 Tons' },
    { id: 2, item: 'Copper Scrap (Tamba)', rate: 'Rs. 2,100 / kg', quantity: '800 kg' },
    { id: 3, item: 'Aluminum Pack', rate: 'Rs. 350 / kg', quantity: '1.5 Tons' },
  ]);

  // 2. Farokht Fehrist (Sell List Data)
  const [sellItems] = useState([
    { id: 1, item: 'Old Car Batteries', rate: 'Rs. 4,500 / piece', quantity: '40 Pcs' },
    { id: 2, item: 'Plastic Bottles (PET)', rate: 'Rs. 85 / kg', quantity: '1200 kg' },
    { id: 3, item: 'Electronic Waste Bords', rate: 'Rs. 650 / kg', quantity: '300 kg' },
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500">
      
      {/* --- NAVBAR SECTION (LOGO & LOGIN) --- */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Side */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center overflow-hidden shadow-md shadow-green-500/20">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-xl absolute">♻️</span>
            </div>
            <span className="text-xl font-black tracking-tight text-green-500">
              SCRAP<span className="text-white">APP</span>
            </span>
          </div>
          
          {/* LOGIN BUTTON */}
          <div>
            <button 
              onClick={() => alert('Login Form Jald Hi Active Hoga!')}
              className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            >
              🔒 Login / Register
            </button>
          </div>

        </div>
      </header>

      {/* --- MAIN BODY MARKETPLACE --- */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* QUICK BUTTONS (AAJ KE RATES & POST AD) */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button 
            onClick={() => alert('Aaj ke taza tareen rates ki list jald shuru hogi!')}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm sm:text-base"
          >
            📊 Aaj Ke Rates
          </button>
          
          <button 
            onClick={() => alert('Post Ad ka option jald active hoga!')}
            className="bg-green-500 hover:bg-green-600 text-zinc-950 font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/10 text-sm sm:text-base"
          >
            📢 Post Ad (Ishtahar Lagayein)
          </button>
        </div>

        {/* --- FEHRIST SECTION (GRID LAYOUT) --- */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* COLUMN 1: KHAREEDARI FEHRIST (BUYER) */}
          <div className="space-y-4">
            <div className="border-b border-zinc-800 pb-2 flex justify-between items-center">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
                📥 Khareedari Fehrist (Buyer List)
              </h2>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-medium">Demand</span>
            </div>

            <div className="space-y-2">
              {buyerItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-4 flex justify-between items-center hover:border-zinc-700 transition-all">
                  <div>
                    <h3 className="font-bold text-zinc-200 text-sm">{item.item}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Required: <span className="text-zinc-400 font-medium">{item.quantity}</span></p>
                  </div>
                  <span className="text-xs bg-zinc-800 text-green-400 font-bold px-3 py-1.5 rounded-lg border border-zinc-700/50">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: FAROKHT FEHRIST (SELL) */}
          <div className="space-y-4">
            <div className="border-b border-zinc-800 pb-2 flex justify-between items-center">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                📤 Farokht Fehrist (Sell List)
              </h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">Available</span>
            </div>

            <div className="space-y-2">
              {sellItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-4 flex justify-between items-center hover:border-zinc-700 transition-all">
                  <div>
                    <h3 className="font-bold text-zinc-200 text-sm">{item.item}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Stock: <span className="text-zinc-400 font-medium">{item.quantity}</span></p>
                  </div>
                  <span className="text-xs bg-zinc-800 text-emerald-400 font-bold px-3 py-1.5 rounded-lg border border-zinc-700/50">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-zinc-600 text-xs border-t border-zinc-900 mt-16">
        © 2026 Scrap App Marketplace. All Rights Reserved.
      </footer>
    </div>
  );
}
