'use client';
import { useState, useEffect } from 'react';
import { fetchAds } from './lib/api';
import Header from './components/Header';
import Ticker from './components/Ticker';
import AdCard from './components/AdCard';
import Nav from './components/Nav';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [inputPhone, setInputPhone] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  useEffect(() => {
    // 1. Data load karein
    const loadData = async () => {
      const data = await fetchAds();
      setAds(data);
    };
    loadData();

    // 2. URL check karein
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'login') {
      setCurrentPage('login');
    }
  }, []);

  const handleSendOtp = () => {
    alert("OTP sent to " + inputPhone);
    setShowOtpScreen(true);
  };

  const handleVerifyOtp = () => {
    if (inputOtp === "7861") {
      alert("Login Successful!");
      window.location.href = '/'; // Home par wapis
    } else {
      alert("Invalid Code!");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <Ticker usdRate={278.50} />
      
      {currentPage === 'home' && (
        <div className="p-4 space-y-4">
          {ads.map((ad) => <AdCard key={ad.id} ad={ad} onClick={() => {}} />)}
        </div>
      )}

      {currentPage === 'login' && (
        <div className="p-6 space-y-4">
          {!showOtpScreen ? (
            <>
              <input type="tel" placeholder="Enter Phone" onChange={(e) => setInputPhone(e.target.value)} className="w-full p-3 border rounded-xl" />
              <button onClick={handleSendOtp} className="w-full bg-blue-600 text-white py-3 rounded-xl">Send OTP</button>
            </>
          ) : (
            <>
              <input type="number" placeholder="Enter OTP" onChange={(e) => setInputOtp(e.target.value)} className="w-full p-3 border rounded-xl" />
              <button onClick={handleVerifyOtp} className="w-full bg-green-600 text-white py-3 rounded-xl">Verify & Login</button>
            </>
          )}
        </div>
      )}
      
      <Nav />
    </main>
  );
}
