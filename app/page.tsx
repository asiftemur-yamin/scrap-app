'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 3 second ka timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 1. Splash Screen UI (Pehle 3 second ke liye)
  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          
          {/* Logo Icon */}
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse">
            <span className="text-5xl">♻️</span>
          </div>

          {/* App Name */}
          <h1 className="text-3xl font-extrabold tracking-widest text-green-500">
            SCRAP APP
          </h1>
          
          {/* Loading Bar */}
          <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-green-500 animate-pulse origin-left"></div>
          </div>
          
          <p className="text-zinc-500 text-xs tracking-wide uppercase">Loading Marketplace...</p>
        </div>
      </div>
    );
  }

  // 2. Main App UI (3 second ke baad khud khulay gi)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-md text-center space-y-4">
        <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-medium border border-green-500/20">
          Live Status: Active
        </span>
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Scrap App Dashboard</h1>
        <p className="text-zinc-400 text-sm">
          Aap ki splash screen kamyabi say chal rahi hai. Ab aap yahan apna khareed-o-farookh ka asli maal design kar saktay hain!
        </p>
      </div>
    </div>
  );
}
