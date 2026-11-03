import React from 'react';

export default function Navbar({ activePage, onNavigate, vaultCount, user, onLogout }) {
  const navItems = [
    { id: 'explore', label: 'Directory' },
    { id: 'vault', label: 'My Vault', badge: vaultCount },
    { id: 'stats', label: 'Analytics' },
    { id: 'journal', label: 'Play Journal' },
  ];

  return (
    <header className="border-b border-zinc-800/80 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div
          onClick={() => onNavigate('explore')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-105 transition">
            L
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-zinc-100 leading-none">
              LOREKEEPER
            </h1>
            <span className="text-[11px] text-zinc-500 font-mono">SYS.VER // 2.0</span>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded text-[11px] font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 border-l border-zinc-800 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-zinc-200 leading-none">{user.username}</p>
            <p className="text-[10px] font-mono text-emerald-400 mt-1">● ONLINE</p>
          </div>
          <button
            onClick={onLogout}
            className="text-xs font-mono text-zinc-400 hover:text-rose-400 bg-zinc-900 hover:bg-rose-950/30 border border-zinc-800 hover:border-rose-800/50 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
          >
            EXIT
          </button>
        </div>
      </div>
    </header>
  );
}