import React from 'react';

export default function FilterToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  placeholder = 'Cari judul game...',
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 bg-zinc-900/40 border border-zinc-800/80 p-3 rounded-xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg pl-3.5 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-zinc-500 uppercase">Sort By:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-200 focus:outline-none cursor-pointer"
        >
          <option value="default">Default (Deal Rank)</option>
          <option value="metacritic">Metacritic Tertinggi</option>
          <option value="steam">Steam Rating Tertinggi</option>
          <option value="price-asc">Harga Termurah</option>
          <option value="title">Nama (A - Z)</option>
        </select>
      </div>
    </div>
  );
}