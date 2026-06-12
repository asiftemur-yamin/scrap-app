'use client';
import { useState } from 'react';

export default function PostAdPage() {
  const [adTitle, setAdTitle] = useState('');
  const [hideNumber, setHideNumber] = useState(false);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white min-h-screen">
      <h2 className="text-xl font-black mb-6">Post New Ad</h2>
      
      <div className="space-y-4">
        <input 
          placeholder="Ad Title" 
          className="w-full border-2 border-slate-300 rounded-xl p-4 font-black"
          onChange={(e) => setAdTitle(e.target.value)}
        />

        {/* Category: Chaaloo Items */}
        <select className="w-full border-2 border-slate-300 rounded-xl p-4 font-black">
          <option>Chaaloo Items</option>
          <option>Imported Scrap</option>
          <option>Local Scrap</option>
        </select>

        {/* Hide Number Toggle */}
        <div className="flex items-center gap-3 font-black">
          <input 
            type="checkbox" 
            className="w-5 h-5"
            onChange={(e) => setHideNumber(e.target.checked)} 
          />
          <span>Hide Phone Number</span>
        </div>

        <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black">
          Upload Live Ad ✓
        </button>
      </div>
    </div>
  );
}
