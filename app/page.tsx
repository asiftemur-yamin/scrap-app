'use client';
import { useState, useEffect } from 'react';

// 1. DATA
const initialAdsData: any[] = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", city: "gujranwala", price: "125", unit: "kg", weight: "12 Ton", isFeatured: true, origin: "local", icon: "🔩", desc: "Factory clearance raw structural steel iron scrap." },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", city: "gujranwala", price: "1,870", unit: "kg", weight: "450 Kg", isFeatured: false, origin: "imported", icon: "🔌", desc: "High quality stripped electrical copper wire." },
  { id: 3, titleEn: "Bundled Pure Aluminum Beverage Cans", titleUr: "بنڈل ایلومینیم کولڈ ڈرنک کین اسکریپ", city: "lahore", price: "465", unit: "kg", weight: "35 Mund", isFeatured: true, origin: "local", icon: "🥫", desc: "Compressed aluminum drink beverage can bundles." },
  { id: 4, titleEn: "Mixed Crushed Plastic Drums Scrap", titleUr: "مکس کرشڈ پلاسٹک ڈرم اسکریپ اسٹاک", city: "lahore", price: "98", unit: "kg", weight: "3 Ton", isFeatured: false, origin: "local", icon: "🛢️", desc: "Blue and white HDPE industrial crushed plastic." }
];

const initialVerifiedStores: any[] = [
  { id: 501, nameEn: "R-H-A-F Recycling & Smelting Co.", nameUr: "آر ایچ اے ایف ریسائیکلنگ اینڈ اسمیلٹنگ فیکٹری", city: "gujranwala", verified: true, icon: "🏭", badge: "Premium Smelter", catalog: [{ item: "HMS 1 Iron", buy: "124", sell: "128", cycle: "Daily" }] },
  { id: 502, nameEn: "Lahore Eco-Plastic Shredders", nameUr: "لاہور ایکو پلاسٹک شریڈرز پلانٹ", city: "lahore", verified: true, icon: "🏗️", badge: "Bulk Crusher", catalog: [{ item: "HDPE Flakes", buy: "95", sell: "99", cycle: "Weekly" }] }
];

// 2. TRANSLATIONS
const translations: any = {
  en: { 
    appName: "SCRAP WORLD", sellScrap: "Sell Scrap", buyScrap: "Buy Scrap", rates: "Live Rates", postAd: "Post Ad",
    cat1: "Iron", cat2: "Plastic", cat3: "Copper", cat4: "Aluminum", cat9: "Chaaloo Maal",
    b2bTitle: "Verified Factories 👑", inboxTitle: "App Messages", callSeller: "Call", appChatSeller: "Chat",
    searchPlaceholder: "Search scrap...", catalogTitle: "Routine Catalog", buyPrice: "Buy", sellPrice: "Sell",
    payFee: "Pay Fee", verifyActionBtn: "Register Store"
  },
  ur: { 
    appName: "اسکریپ ورلڈ", sellScrap: "اسکریپ بیچیں", buyScrap: "اسکریپ خریدیں", rates: "لائیو ریٹس", postAd: "اشتہار لگائیں",
    cat1: "لوہا", cat2: "پلاسٹک", cat3: "تانبا", cat4: "ایلومینیم", cat9: "چالو مال",
    b2bTitle: "تصدیق شدہ فیکٹریاں 👑", inboxTitle: "پیغامات", callSeller: "کال کریں", appChatSeller: "چیٹ",
    searchPlaceholder: "تلاش کریں...", catalogTitle: "کیٹلاگ", buyPrice: "خرید", sellPrice: "بیچ",
    payFee: "فیس ادا کریں", verifyActionBtn: "اسٹور رجسٹر کریں"
  }
};

const lmeData = [
  { id: "cop", key: "copper", icon: "🔌", price: 9645, change: "+1.4%", up: true },
  { id: "alu", key: "aluminum", icon: "⚪", price: 2520, change: "-0.3%", up: false }
];

export default function Home() {
  const [lang, setLang] = useState('ur');
  const [visibleCount, setVisibleCount] = useState(4);
  const [showInbox, setShowInbox] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ id: 1, text: "Assalam o Alaikum, rate kya hai?", isMe: false }]);
  const [msg, setMsg] = useState('');
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [showVerificationPortal, setShowVerificationPortal] = useState(false);
  const [lmeRates, setLmeRates] = useState(lmeData);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => { if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) setVisibleCount(p => p + 2); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      <header className="bg-blue-900 text-white p-6 shadow-xl text-center">
        <h1 className="text-2xl font-black">{t.appName}</h1>
        <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="mt-2 text-xs bg-white text-blue-900 px-4 py-1 rounded-full font-bold">{lang === 'en' ? 'اردو' : 'English'}</button>
      </header>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-2 p-4">
        {[ {name: t.cat1, icon: "🔩"}, {name: t.cat2, icon: "🛢️"}, {name: t.cat3, icon: "🔌"}, {name: t.cat9, icon: "⚡"} ].map((c, i) => (
          <div key={i} className="bg-white p-3 rounded-xl border text-center shadow-sm">
            <span className="text-xl">{c.icon}</span>
            <p className="text-[10px] font-bold mt-1">{c.name}</p>
          </div>
        ))}
      </div>

      {/* Verified Factories */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-black">{t.b2bTitle}</h2>
            <button onClick={() => setShowVerificationPortal(true)} className="text-[10px] bg-amber-500 text-white px-2 py-1 rounded-lg font-bold">{t.verifyActionBtn}</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {initialVerifiedStores.map(s => (
            <div key={s.id} onClick={() => setSelectedStore(s)} className="bg-amber-100 p-4 rounded-xl min-w-[150px] border border-amber-300">
              <p className="text-2xl">{s.icon}</p>
              <p className="font-bold text-xs mt-1">{lang === 'en' ? s.nameEn : s.nameUr}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ads Feed */}
      <div className="px-4 space-y-3">
        {initialAdsData.slice(0, visibleCount).map((ad) => (
          <div key={ad.id} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-black text-sm">{lang === 'en' ? ad.titleEn : ad.titleUr}</h3>
              <p className="text-xs text-slate-400">📦 {ad.weight}</p>
            </div>
            <p className="font-black text-green-600">Rs.{ad.price}</p>
          </div>
        ))}
      </div>

      {/* Chat System */}
      {showInbox && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <button onClick={() => setShowInbox(false)} className="mb-4 font-bold">✕ Close</button>
          <div className="space-y-3 h-[70vh] overflow-y-auto">
            {chatMessages.map(m => <div key={m.id} className={`p-3 rounded-lg ${m.isMe ? 'bg-blue-600 text-white self-end text-left' : 'bg-slate-200 text-left'}`}>{m.text}</div>)}
          </div>
          <div className="flex gap-2 mt-4">
            <input className="border p-2 w-full rounded" value={msg} onChange={e => setMsg(e.target.value)} />
            <button onClick={() => setChatMessages([...chatMessages, { id: Date.now(), text: msg, isMe: true }])} className="bg-blue-900 text-white p-2 rounded">Send</button>
          </div>
        </div>
      )}

      {/* Factory Detail Modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black/50 z-50 p-4 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
                <h2 className="font-black">{lang === 'en' ? selectedStore.nameEn : selectedStore.nameUr}</h2>
                <div className="mt-4 space-y-2">
                    {selectedStore.catalog.map((c: any, i: number) => (
                        <div key={i} className="flex justify-between border-b pb-1">
                            <span className="text-xs">{c.item}</span>
                            <span className="font-bold text-green-600">Rs.{c.buy}</span>
                        </div>
                    ))}
                </div>
                <button onClick={() => setSelectedStore(null)} className="mt-6 w-full bg-slate-900 text-white py-2 rounded-xl">Close</button>
            </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-green-600 text-white p-4 rounded-full shadow-lg">📢</button>
        <button onClick={() => setShowInbox(true)} className="bg-indigo-600 text-white p-4 rounded-full shadow-lg">💬</button>
      </div>
    </div>
  );
}
