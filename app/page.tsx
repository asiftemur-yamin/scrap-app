'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);

  // Yeh wohi purana logic hai jo ads ko fetch karta tha
  useEffect(() => {
    const fetchAds = async () => {
      // Yahan aapka API ya Firestore ka call aayega
      // const data = await getDocs(collection(db, "ads"));
      // setAds(data);
    };
    fetchAds();
  }, []);

  return (
    <div className="pb-24">
      <Header />
      <Ticker usdRate={278.50} />
      <div className="p-4 space-y-4">
        {ads.map(ad => <AdCard key={ad.id} ad={ad} onClick={() => {}} />)}
      </div>
    </div>
  );
}
