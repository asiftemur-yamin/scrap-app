'use client';

export default function AdCard({ ad, onClick }: { ad: any; onClick: () => void }) {
  return (
    <div 
      onClick={onClick} 
      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-4 cursor-pointer hover:shadow-md transition"
    >
      <img 
        src={ad.image_url || 'https://via.placeholder.com/100'} 
        className="w-24 h-24 rounded-xl object-cover bg-slate-100" 
        alt={ad.title}
      />
      <div className="flex-1 space-y-1">
        <h3 className="font-black text-sm text-slate-800 truncate">{ad.title}</h3>
        <p className="text-green-600 font-black text-sm">Rs.{ad.price}</p>
        <p className="text-[10px] text-slate-400 font-black">📍 {ad.location_text}</p>
        <p className="text-[10px] text-indigo-600 font-black">👁️ {ad.views_count || 0} People viewed</p>
      </div>
    </div>
  );
}
