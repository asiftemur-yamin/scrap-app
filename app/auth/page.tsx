'use client';
import { useState } from 'react';

export default function AuthPage() {
  const [inputPhone, setInputPhone] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center max-w-sm mx-auto">
      <h2 className="text-2xl font-black mb-6">Login / Register</h2>
      {!showOtpScreen ? (
        <div className="space-y-4">
          <input 
            type="tel" 
            value={inputPhone} 
            onChange={(e) => setInputPhone(e.target.value)} 
            placeholder="03001234567" 
            className="w-full border-2 border-slate-300 rounded-xl p-4 font-black" 
          />
          <button 
            onClick={() => setShowOtpScreen(true)} 
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input placeholder="Enter OTP" className="w-full border-2 border-slate-300 rounded-xl p-4 font-black text-center" />
          <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black">Verify</button>
        </div>
      )}
    </div>
  );
}
