import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

export default function ExplorePage({ trackedIds, onToggleTrack }) {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20'
      );

      if (!response.ok) {
        throw new Error(`Gagal memuat data game (Status: ${response.status}).`);
      }

      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message || 'Terjadi gangguan jaringan saat menghubungi server API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 relative">
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-5 border-b border-zinc-800/80 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Game Archive
          </h2>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
          <div>
            SHOWING: <span className="text-zinc-100 font-bold">{games.length}</span> TITLES
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-28 border border-zinc-800/80 rounded-xl bg-zinc-900/20 backdrop-blur-sm">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-zinc-200 font-medium text-base">Menyinkronkan katalog game...</p>
          <p className="text-zinc-500 text-xs mt-1">Mengambil data terbaru dari server API</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="border border-rose-900/60 bg-rose-950/20 rounded-xl p-10 text-center max-w-md mx-auto my-12">
          <h3 className="text-lg font-semibold text-rose-200 mb-2">Gagal Memuat Data</h3>
          <p className="text-sm text-rose-300/80 mb-6">{error}</p>
          <button
            onClick={fetchGames}
            className="bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {!isLoading && !error && games.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-zinc-800/80 bg-[#0d0d11]/90 shadow-2xl shadow-black/80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs uppercase tracking-wider font-mono">
                <th className="py-4 pl-5 pr-6 font-medium">Game Title</th>
                <th className="py-4 px-4 text-right font-medium">Steam Rating</th>
                <th className="py-4 px-4 text-right font-medium">
                  <span className="underline decoration-dotted decoration-zinc-600 underline-offset-4">
                    Reviews
                  </span>
                </th>
                <th className="py-4 px-4 text-right font-medium">Metacritic</th>
                <th className="py-4 px-4 text-right font-medium">Price</th>
                <th className="py-4 px-4 text-right font-medium">
                  <span className="underline decoration-dotted decoration-zinc-600 underline-offset-4">
                    Deal Score
                  </span>
                </th>
                <th className="py-4 px-4 text-right font-medium">↓ Released</th>
                <th className="py-4 pl-4 pr-5 text-right font-medium w-16">Vault</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <GameCard
                  key={game.dealID}
                  index={index}
                  game={game}
                  isTracked={trackedIds.includes(game.dealID)}
                  onToggleTrack={onToggleTrack}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}