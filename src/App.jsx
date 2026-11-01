import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExplorePage from './pages/ExplorePage';

export default function App() {
  const [trackedIds, setTrackedIds] = useState([]);

  const handleToggleTrack = (dealID) => {
    setTrackedIds((prev) =>
      prev.includes(dealID) ? prev.filter((id) => id !== dealID) : [...prev, dealID]
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans antialiased">
      <Navbar trackedCount={trackedIds.length} />
      <ExplorePage trackedIds={trackedIds} onToggleTrack={handleToggleTrack} />
    </div>
  );
}