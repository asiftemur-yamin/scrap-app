'use client';

export default function Ticker({ usdRate }: any) {
  return (
    <div className="bg-slate-900 text-white text-xs font-black py-2 overflow-hidden whitespace-nowrap border-b border-slate-700">
      <style>{`@keyframes scroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } .ticker { animation: scroll 25s linear infinite; }`}</style>
      <div className="ticker inline-block">
        💵 USD/PKR: {usdRate} | 🔩 Loha: $390/T | ⚡ Copper: $8950/T | 🥫 Aluminum: $2420/T
      </div>
    </div>
  );
}
