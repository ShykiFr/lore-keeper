import React from 'react';

export default function GameCard({ game, index, isTracked, onToggleTrack }) {
  const releaseYear = game.releaseDate
    ? new Date(game.releaseDate * 1000).getFullYear()
    : '—';

  const steamPercent = Number(game.steamRatingPercent) || 0;
  const metacritic = Number(game.metacriticScore) || 0;

  const getMetacriticStyle = (score) => {
    if (score >= 80) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.12)]';
    }
    if (score >= 65) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    return 'bg-zinc-800/70 text-zinc-400 border-zinc-700';
  };

  return (
    <tr
      className={`border-b border-zinc-800/70 transition-all duration-200 group relative ${
        isTracked
          ? 'bg-indigo-950/15 hover:bg-indigo-950/25'
          : 'hover:bg-gradient-to-r hover:from-indigo-500/[0.06] hover: via-zinc-900/50 hover:to-transparent'
      }`}
    >
      <td className="py-5 pl-5 pr-6 relative">
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
            isTracked
              ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]'
              : 'bg-transparent group-hover:bg-indigo-500/70'
          }`}
        />

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-zinc-600 group-hover:text-indigo-400 transition-colors w-6">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="w-14 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-indigo-500/40 transition shrink-0 shadow-md">
            <img
              src={game.thumb}
              alt={game.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          </div>

          <div className="min-w-0">
            <span
              className="font-semibold text-base text-zinc-100 underline decoration-zinc-700 underline-offset-4 group-hover:decoration-indigo-400 group-hover:text-white transition line-clamp-1"
              title={game.title}
            >
              {game.title}
            </span>
            <span className="text-xs text-zinc-500 mt-0.5 block">
              {game.steamRatingText || 'PC Digital Edition'}
            </span>
          </div>
        </div>
      </td>

      <td className="py-5 px-4 text-right tabular-nums">
        {steamPercent > 0 ? (
          <div className="inline-flex flex-col items-end gap-1.5">
            <span className="text-sm font-medium text-zinc-200">{steamPercent}%</span>
            <div className="w-20 h-1.5 bg-zinc-800/90 rounded-full overflow-hidden p-[1px]">
              <div
                className={`h-full rounded-full ${
                  steamPercent >= 80 ? 'bg-indigo-500' : 'bg-zinc-400'
                }`}
                style={{ width: `${steamPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <span className="text-zinc-600">—</span>
        )}
      </td>

      <td className="py-5 px-4 text-right text-sm text-zinc-400 font-mono tabular-nums">
        {game.steamRatingCount && game.steamRatingCount !== '0'
          ? Number(game.steamRatingCount).toLocaleString()
          : '—'}
      </td>

      <td className="py-5 px-4 text-right tabular-nums">
        {metacritic > 0 ? (
          <span
            className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md border ${getMetacriticStyle(
              metacritic
            )}`}
          >
            {metacritic}
          </span>
        ) : (
          <span className="text-zinc-600">—</span>
        )}
      </td>

      <td className="py-5 px-4 text-right tabular-nums">
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-zinc-200">
            ${game.salePrice || game.normalPrice}
          </span>
          {game.salePrice && game.salePrice !== game.normalPrice && (
            <span className="text-xs text-zinc-500 line-through">
              ${game.normalPrice}
            </span>
          )}
        </div>
      </td>

      <td className="py-5 px-4 text-right tabular-nums">
        {game.dealRating ? (
          <span className="text-sm font-mono text-indigo-300/90 bg-indigo-950/40 border border-indigo-800/40 px-2 py-0.5 rounded">
            {game.dealRating}
          </span>
        ) : (
          <span className="text-zinc-600">—</span>
        )}
      </td>

      <td className="py-5 px-4 text-right text-sm text-zinc-300 font-medium tabular-nums">
        {releaseYear}
      </td>

      <td className="py-5 pl-4 pr-5 text-right">
        <button
          onClick={() => onToggleTrack(game.dealID)}
          title={isTracked ? 'Hapus dari Vault' : 'Tambah ke Vault'}
          className={`w-9 h-9 rounded-lg inline-flex items-center justify-center text-base font-bold transition-all duration-200 cursor-pointer border ${
            isTracked
              ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-indigo-500/60 hover:bg-indigo-600/20'
          }`}
        >
          {isTracked ? '✓' : '+'}
        </button>
      </td>
    </tr>
  );
}