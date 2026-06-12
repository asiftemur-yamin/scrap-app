'use client';
import { useState, useEffect } from 'react';
import { fetchAds, getGoogleLoginUrl } from './lib/api';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';
import Nav from './components/Nav';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAds();
      setAds(data);
    };
    loadData();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl(window.location.origin);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <Ticker usdRate={278.50} />
      
      {/* Login View */}
      {currentPage === 'login' ? (
        <div className="p-6 text-center space-y-4">
          <button onClick={handleGoogleLogin} className="w-full bg-white border-2 border-slate-300 py-3 rounded-xl font-black">
            🌐 Login with Google
          </button>
          <button onClick={() => setCurrentPage('home')} className="text-sm font-black underline">Back</button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} onClick={() => {}} />
          ))}
        </div>
      )}
      
      <Nav />
    </main>
  );
}
