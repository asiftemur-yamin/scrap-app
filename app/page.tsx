'use client';
import { useState } from 'react';

// Simplified Database
const ads = [
  { id: 1, title: "HMS 1 Iron", price: "125", weight: "12 Ton", icon: "🔩" },
  { id: 2, title: "Useable Motor (Chaaloo)", price: "15,000", weight: "1 unit", icon: "⚙️" }
];

export default function Home() {
  const [lang, setLang] = useState('en');

  return (
    <div className="min-h-screen bg-slate-50 p-4" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      <header className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-black">SCRAP WORLD</h1>
        <button 
          onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
          className="mt-2 bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-bold"
        >
          {lang === 'en' ? 'اردو' : 'English'}
        </button>
      </header>

      <main className="mt-6 space-y-4">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white p-4 rounded-2xl shadow border flex justify-between items-center">
            <div>
              <p className="text-2xl">{ad.icon}</p>
              <h2 className="font-bold text-sm">{ad.title}</h2>
            </div>
            <p className="font-black text-green-600">Rs.{ad.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
