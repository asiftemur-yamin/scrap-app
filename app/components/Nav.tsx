'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t p-3 flex justify-around z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Link href="/" className="text-xs font-black text-slate-600">🏠 Home</Link>
      <Link href="/my-ads" className="text-xs font-black text-slate-600">📦 My Ads</Link>
      <Link href="/post-ad" className="text-xs font-black text-indigo-600 border border-indigo-600 px-3 py-1 rounded-full">+ Post</Link>
      <Link href="/auth" className="text-xs font-black text-slate-600">👤 Login</Link>
    </nav>
  );
}
