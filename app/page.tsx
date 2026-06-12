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
    // 1. Load Ads
    const loadData = async () => {
      const data = await fetchAds();
      setAds(data);
    };
    loadData();

    // 2. URL Check for Login
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'login') {
      setCurrentPage('login');
    }
  }, []);

  const handleSendOtp = () => {
    // SMS API Trigger point
    console.log("Sending OTP to:", inputPhone);
    setShowOtpScreen(true);
  };

  const handleVerifyOtp = () => {
    if (inputOtp === "7861") {
      alert("Login Successful!");
      window.location.href = '/';
    } else {
      alert("Invalid Code!");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <Ticker usdRate={278.50} />
      
      {/* Home Feed View */}
      {currentPage === 'home' && (
        <div className="p-4 space-y-4">
          {ads.map((ad) => <AdCard key={ad.id} ad={ad} onClick={() => {}} />)}
        </div>
      )}

      {/* Login / OTP View */}
      {currentPage === 'login' && (
        <div className="p-6 space-y-4">
          {!showOtpScreen ? (
            <div className="space-y-4">
              <h2 className="font-black text-xl">Login</h2>
              <input 
                type="tel" 
                placeholder="Enter Phone" 
                onChange={(e) => setInputPhone(e.target.value)} 
                className="w-full p-4 border rounded-xl" 
              />
              <button onClick={handleSendOtp} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold">
                Send OTP
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="font-black text-xl">Verify Code</h2>
              <input 
                type="number" 
                placeholder="Enter OTP (7861)" 
                onChange={(e) => setInputOtp(e.target.value)} 
                className="w-full p-4 border rounded-xl" 
              />
              <button onClick={handleVerifyOtp} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">
                Verify & Login
              </button>
            </div>
          )}
        </div>
      )}
      
      <Nav />
    </main>
  );
}
