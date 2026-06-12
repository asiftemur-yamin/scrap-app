'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    setAds([
      { id: 1, title: 'Aluminum Scrap', price: '450', location_text: 'Gujranwala', image_url: '' },
      { id: 2, title: 'Copper Wire', price: '8900', location_text: 'Lahore', image_url: '' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header setShowHelp={setShowHelp} />
      <Ticker usdRate={278.50} />
      
      {showHelp && (
        <div className="bg-amber-100 p-4 m-4 rounded-xl border border-amber-300 text-xs font-black text-amber-900">
          <p>📧 Email: scrapworld92@gmail.com</p>
          <p>💬 WhatsApp: 0300 8641994</p>
        </div>
      )}

      <div className="space-y-4 p-4">
        {ads.map((ad: any) => (
          <AdCard key={ad.id} ad={ad} onClick={() => console.log("Ad clicked")} />
        ))}
      </div>
    </div>
  );
}
