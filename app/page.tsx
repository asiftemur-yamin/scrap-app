'use client';

import { useState, useEffect } from 'react';

// 1. ALL SCRAP ADS DATABASE (With Chaaloo Maal Category)
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap available immediately near Khiali Gate." },
  { id: 2, titleEn: "Useable 5HP Electric Motor (Chaaloo)", titleUr: "استعمال کے قابل 5HP الیکٹرک موٹر (چالو مال)", city: "gujranwala", price: "15,000", unit: "piece", weight: "1 unit", isFeatured: false, origin: "local", icon: "⚙️", desc: "Perfect condition electric motor, recently serviced and ready for use in industrial machine." },
  { id: 3, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire scrap. Clean shining stock." },
  { id: 4, titleEn: "Useable Steel Flanges & Valves (Chaaloo)", titleUr: "اسٹیل فلینجز اور والوز (چالو مال)", city: "lahore", price: "2,500", unit: "piece", weight: "various", isFeatured: true, origin: "local", icon: "🚰", desc: "Heavy duty steel valves in working condition. Ideal for piping systems." },
  { id: 5, titleEn: "Imported Scrap Solar Cells for Silver Recovery", titleUr: "امپورٹڈ سولر سیل اسکریپ سلور نکالنے کیلئے", city: "karachi", price: "320", unit: "kg", weight: "8 Ton", isFeatured: true, origin: "imported", icon: "☀️", desc: "Premium imported damaged solar panel cell waste." },
  { id: 6, titleEn: "Useable Industrial Bearings (Chaaloo)", titleUr: "صنعتی بیئرنگز (چالو مال)", city: "multan", price: "800", unit: "piece", weight: "10 units", isFeatured: false, origin: "local", icon: "🔧", desc: "Heavy duty industrial machine bearings in good working order." }
];

// 2. Translation Dictionary
const translations: any = {
  en: {
    appName: "SCRAP WORLD",
    categories: { cat1: "Iron (Loha)", cat2: "Plastic", cat3: "Copper (Tamba)", cat4: "Aluminum", cat5: "Batteries", cat6: "Solar Panels", cat7: "Mix Scrap", cat8: "Electronic", cat9: "Chaaloo Maal (Useable)" },
    feedTitle: "Scrap Marketplace Feed",
    b2bTitle: "Verified Factories & Commercial Yards 👑",
    // ... baki sab wahi hai
  },
  ur: {
    appName: "اسکریپ ورلڈ",
    categories: { cat1: "لوہا (Iron)", cat2: "پلاسٹک (Plastic)", cat3: "تانبا (Copper)", cat4: "ایلومینیم", cat5: "بیٹریاں", cat6: "سولر پینل", cat7: "مکس اسکریپ", cat8: "الیکٹرانک", cat9: "چالو مال (Useable)" },
    feedTitle: "اسکریپ مارکیٹ فیڈ (اشتہارات)",
    b2bTitle: "تصدیق شدہ فیکٹریاں اور بڑے کمرشل یارڈز 👑",
    // ... baki sab wahi hai
  }
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const t: any = translations[lang];
  const [selectedAd, setSelectedAd] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-[#f2f6fa] pb-24" style={{ fontFamily: '-apple-system, sans-serif' }}>
      
      {/* Categories Grid (With Chaaloo Maal) */}
      <div className="grid grid-cols-4 gap-2.5 p-4 mb-6">
        {[
          { label: t.categories.cat1, icon: "🔩" }, { label: t.categories.cat2, icon: "🛢️" },
          { label: t.categories.cat3, icon: "🔌" }, { label: t.categories.cat4, icon: "🥫" },
          { label: t.categories.cat5, icon: "🔋" }, { label: t.categories.cat6, icon: "☀️" },
          { label: t.categories.cat7, icon: "📦" }, { label: t.categories.cat9, icon: "⚡" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm aspect-square">
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="text-[10px] font-bold text-slate-700 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Feed Rendering Logic (Code same as before) */}
      {/* ... */}
      
    </div>
  );
}
