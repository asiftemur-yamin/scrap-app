'use client';
import { useState, useEffect } from 'react';
import { fetchAds } from './lib/api';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';
import Nav from './components/Nav';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAds();
      setAds(data);
    };
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header setShowHelp={setShowHelp} />
      <Ticker usdRate={278.50} />
      
      <div className="p-4 space-y-4">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} onClick={() => console.log('Clicked', ad.id)} />
          ))
        ) : (
          <p className="text-center text-slate-500 font-black pt-10">Loading scrap market...</p>
        )}
      </div>
      
      <Nav />
    </main>
  );
}
