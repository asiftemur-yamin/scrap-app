'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';
import Nav from './components/Nav';

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
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header setShowHelp={setShowHelp} />
      <Ticker usdRate={278.50} />
      
      <div className="p-4 space-y-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} onClick={() => console.log('Clicked')} />
        ))}
      </div>
      
      <Nav />
    </main>
  );
}
