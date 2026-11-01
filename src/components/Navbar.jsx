import React from 'react';

export default function Navbar({ trackedCount }) {
  return (
    <header className="border-b border-zinc-800/80 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            L
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-zinc-100 leading-none">
              LOREKEEPER
            </h1>
            <span className="text-[11px] text-zinc-500 font-mono">SYS.VER // 1.0</span>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <span className="text-zinc-100 font-medium cursor-pointer border-b-2 border-indigo-500 py-1">
            Directory
          </span>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300">
            <span>VAULT</span>
            <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded font-bold">
              {trackedCount}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}