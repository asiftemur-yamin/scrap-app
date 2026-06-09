'use client';

import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState('en');
  
  const ads = [
    { id: 1, title: "Heavy Industrial HMS 1", price: "125", unit: "kg", icon: "🔩" },
    { id: 2, title: "Pure Copper Cable Wire", price: "1,870", unit: "kg", icon: "🔌" },
    { id: 3, title: "Useable 5HP Electric Motor", price: "15,000", unit: "piece", icon: "⚙️" },
    { id: 4, title: "Solar Panels Grade A", price: "320", unit: "kg", icon: "☀️" }
  ];

  const categories = [
    { name: "Iron (Loha)", icon: "🔩" },
    { name: "Copper (Tamba)", icon: "🔌" },
    { name: "Chaaloo Maal", icon: "⚙️" },
    { name: "Solar Panels", icon: "☀️" },
    { name: "Plastic", icon: "🛢️" },
    { name: "Batteries", icon: "🔋" },
    { name: "Electronics", icon: "💻" },
    { name: "Mix Scrap", icon: "📦" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black">SCRAP WORLD</h1>
          <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="bg-white text-blue-900 px-3 py-1 rounded-full font-bold text-xs">
            {lang === 'en' ? 'اردو' : 'English'}
          </button>
        </div>
      </header>

      {/* Categories */}
      <div className="p-4">
        <h2 className="font-bold text-gray-700 mb-4">{lang === 'en' ? 'Browse Categories' : 'کیٹیگریز'}</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-3 rounded-xl shadow-sm text-center border">
              <span className="text-2xl">{cat.icon}</span>
              <p className="text-[10px] font-bold mt-2">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="p-4">
        <h2 className="font-bold text-gray-700 mb-4">{lang === 'en' ? 'Latest Scrap Ads' : 'تازہ ترین اشتہارات'}</h2>
        <div className="space-y-3">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ad.icon}</span>
                <p className="font-bold text-sm">{ad.title}</p>
              </div>
              <p className="font-black text-green-600">Rs.{ad.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
