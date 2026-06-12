'use client';
import { useState, useEffect } from 'react';

export default function MyAdsPage() {
  const [myAds, setMyAds] = useState<any[]>([]);

  // Yahan hum ads fetch karenge jo sirf current user ne lagaye hon
  return (
    <div className="p-6 max-w-sm mx-auto bg-slate-50 min-h-screen">
      <h2 className="text-xl font-black mb-6">My Posted Ads</h2>
      
      <div className="space-y-4">
        {myAds.length === 0 ? (
          <p className="text-center font-black text-slate-400 mt-10">Koi ad abhi tak nahi lagaya.</p>
        ) : (
          myAds.map((ad: any) => (
            <div key={ad.id} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-black">{ad.title}</h3>
                <p className="text-xs text-indigo-600 font-black">Clicks: {ad.click_count || 0}</p>
              </div>
              <button className="text-red-500 font-black text-xs">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
