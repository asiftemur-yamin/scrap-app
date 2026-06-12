'use client';
import { useState } from 'react';

export default function AuthPage() {
  const [phone, setPhone] = useState('');

  return (
    <div className="p-6 max-w-sm mx-auto bg-white min-h-screen">
      <h2 className="text-xl font-black mb-6">Login with Scrap World</h2>
      
      {/* Google Login Placeholder */}
      <button className="w-full bg-slate-800 text-white p-4 rounded-xl font-black mb-6">
        Login with Google
      </button>

      {/* OTP Login Section */}
      <div className="space-y-4">
        <input 
          type="tel"
          placeholder="03001234567" 
          className="w-full border-2 border-slate-300 p-4 rounded-xl font-black"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-black">
          Send OTP
        </button>
      </div>
    </div>
  );
}
