'use client';

import { useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showHelp, setShowHelp] = useState(false);
  const [ads] = useState([]); // Aap ka purana ads data yahan rahe ga

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Header Component */}
      <Header setShowHelp={setShowHelp} />
      
      {/* 2. Ticker Component */}
      <Ticker usdRate={278.50} />

      {/* 3. Help Box */}
      {showHelp && (
        <div className="bg-amber-100 p-4 m-4 rounded-xl border border-amber-300 text-xs font-black text-amber-900">
          <p>📧 Email: scrapworld92@gmail.com</p>
          <p>💬 WhatsApp: 0300 8641994</p>
        </div>
      )}

      {/* 4. Ad Cards Loop */}
      <div className="space-y-4 p-4">
        {ads.map((ad: any) => (
          <AdCard key={ad.id} ad={ad} onClick={() => console.log("Ad clicked")} />
        ))}
      </div>
