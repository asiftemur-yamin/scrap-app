'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header'; // <-- Ye import ho gaya
import Ticker from './components/Ticker'; // <-- Ye import ho gaya
import AdCard from './components/AdCard';
export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showHelp, setShowHelp] = useState(false);
  const [usdRate] = useState(278.50);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Header aur Ticker ab components se aa rahe hain */}
      <Header 
        profileName="Scrap Trader" 
        isLoggedIn={false} 
        setShowHelp={setShowHelp} 
      />
      
      <Ticker usdRate={usdRate} />

      {/* Help Section */}
      {showHelp && (
        <div className="bg-amber-100 p-4 m-4 rounded-xl border border-amber-300 text-xs font-black text-amber-900">
          <p>📧 Email: scrapworld92@gmail.com</p>
          <p>💬 WhatsApp: 0300 8641994</p>
        </div>
      )}

      {/* Yahan baqi pages ka logic waisa hi rahega... */}
      <main className="p-4">
        <p className="text-center">Home Page Content here...</p>
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 w-full bg-white border-t p-3 flex justify-around z-50">
        <button onClick={() => setCurrentPage('home')}>🏠 Home</button>
        <button onClick={() => setCurrentPage('page2')}>☰ Menu</button>
      </nav>
    </div>
  );
}
