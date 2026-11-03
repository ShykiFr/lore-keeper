import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExplorePage from './pages/ExplorePage';

const MOCK_USER = { username: 'Lorekeeper01' };

function PlaceholderPage({ title }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 font-mono">Halaman ini belum dibuat.</p>
    </main>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('explore');
  const [trackedIds, setTrackedIds] = useState([]);
  const [user, setUser] = useState(MOCK_USER);

  const handleToggleTrack = (dealID) => {
    setTrackedIds((prev) =>
      prev.includes(dealID) ? prev.filter((id) => id !== dealID) : [...prev, dealID]
    );
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400 font-mono text-sm">Kamu sudah logout (simulasi).</p>
        <button
          onClick={() => {
            setUser(MOCK_USER);
            setActivePage('explore');
          }}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
        >
          Login Lagi
        </button>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'explore':
        return <ExplorePage trackedIds={trackedIds} onToggleTrack={handleToggleTrack} />;
      case 'vault':
        return <PlaceholderPage title="My Vault" />;
      case 'stats':
        return <PlaceholderPage title="Analytics" />;
      case 'journal':
        return <PlaceholderPage title="Play Journal" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans antialiased">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        vaultCount={trackedIds.length}
        user={user}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}