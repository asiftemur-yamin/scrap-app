'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // Khareedari Fehrist (Buyer Items Mock Data)
  const [buyerItems] = useState([
    { id: 1, item: 'Scrap Iron (Loha)', rate: 'Rs. 180 / kg', weight: '5 Tons Required', location: 'Gujranwala' },
    { id: 2, item: 'Plastic Waste (PET)', rate: 'Rs. 85 / kg', weight: '2 Tons Required', location: 'Lahore' },
    { id: 3, item: 'Copper Scrap (Tamba)', rate: 'Rs. 2,100 / kg', weight: '800 kg Required', location: 'Sialkot' },
    { id: 4, item: 'Aluminum Blister Pack', rate: 'Rs. 350 / kg', weight: '1.5 Tons Required', location: 'Gujranwala' },
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500">
      
      {/* 1. TOP NAVBAR (LOGO SECTION) */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo Image */}
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center overflow-hidden shadow-md shadow-green-500/20">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain"
                onError={(e) => {
                  // Agar logo upload nahi hua to emoji show hoga
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl absolute">♻️</span>
            </div>
            <span className="text-xl font-black tracking-tight text-green-500">
              SCRAP<span className="text-white">APP</span>
            </span>
          </div>
          
          <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full border border-zinc-700">
            Kot Sadaat, PK
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* 2. FAROKHT LIST BUTTON (SELL SECTION) */}
        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/20 border border-green-500/30 rounded-2xl p-5 text-center space-y-3 shadow-lg">
          <h2 className="text-lg font-bold text-green-400">Apna Scrap Farokht Karna Chahte Hain?</h2>
          <p className="text-zinc-400 text-xs">Neeche diye gaye button par click kar ke apni farokht ki list (Sell Item) shuru karen.</p>
          <button 
            onClick={() => alert('Farokht Form Jald Hi Active Hoga!')} 
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-zinc-950 font-extrabold px-8 py-3 rounded-xl transition-all shadow-md shadow-green-500/20 tracking-wide uppercase text-sm"
          >
            ➕ Farokht List / Sell List
          </button>
        </div>

        {/* 3. BUYER SECTION (KHAREEDARI FEHRIST) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span className="text-green-500">■</span> Khareedari Fehrist (Buyer List)
            </h2>
            <span className="text-xs text-zinc-500">Live Updates</span>
          </div>

          {/* Items Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {buyerItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-all space-y-2 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-zinc-100 text-base">{item.item}</h3>
                  <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-semibold">
                    {item.rate}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
                  <span>Urgent: <strong className="text-zinc-200">{item.weight}</strong></span>
                  <span className="text-zinc-500">📍 {item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-zinc-600 text-xs border-t border-zinc-900 mt-12">
        © 2026 Scrap App Marketplace. All Rights Reserved.
      </footer>
    </div>
  );
}
