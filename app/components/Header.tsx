'use client';

export default function Header({ profileName, detectedLocationText, isLoggedIn, setShowHelp }: any) {
  return (
    <header className="bg-[#1a365d] text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <h1 className="font-black text-xl tracking-tight">SCRAP WORLD</h1>
      <div className="flex gap-2">
        <button onClick={() => setShowHelp((prev: boolean) => !prev)} className="bg-white/20 px-3 py-1.5 rounded-lg text-xs font-black">Help ❓</button>
      </div>
    </header>
  );
}
