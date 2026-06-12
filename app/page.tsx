'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    // Dummy ads taake build fail na ho
    setAds([
      { id: 1, title: 'Aluminum Scrap', price: '450', location_text: 'Gujranwala' },
      { id: 2, title: 'Copper Wire', price: '8900', location_text: 'Lahore' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header />
      <Ticker usdRate={278.50} />
      <div className="space-y-4 p-4">
        {ads.map((ad) => <AdCard key={ad.id} ad={ad} onClick={() => {}} />)}
      </div>
    </div>
  );
}
