
'use client';

import { useState } from 'react';
import { Song } from '@/types/song';
import SongManager from './SongManager';
import DashboardStats from './DashboardStats';
import ProfileSettings from './ProfileSettings';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'dashboard' | 'songs' | 'upload' | 'settings';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [songs, setSongs] = useState<Song[]>([]);

  const stats = {
    totalSongs: songs.length,
    totalDownloads: songs.reduce((sum, song) => sum + song.downloads, 0),
    totalViews: songs.reduce((sum, song) => sum + song.views, 0),
    latestUploads: songs.slice(-5).reverse()
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats stats={stats} />;
      case 'songs':
      case 'upload':
        return <SongManager songs={songs} setSongs={setSongs} activeView={activeTab} />;
      case 'settings':
        return <ProfileSettings onLogout={onLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff005c] to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist']">
                AKS DIGITAL Admin
              </h1>
              <div className="hidden md:block w-px h-6 bg-gray-700"></div>
              <div className="hidden md:block text-gray-400 text-sm">
                Welcome back, Admin
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-logout-box-line w-4 h-4 flex items-center justify-center"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 bg-gray-900/30 border-r border-gray-800/50 min-h-screen sticky top-16">
          <div className="p-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-[#ff005c] to-[#8c00ff] text-white shadow-lg shadow-[#ff005c]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <i className="ri-dashboard-line w-5 h-5 flex items-center justify-center"></i>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'upload'
                      ? 'bg-gradient-to-r from-[#ff005c] to-[#8c00ff] text-white shadow-lg shadow-[#ff005c]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <i className="ri-upload-2-line w-5 h-5 flex items-center justify-center"></i>
                  Upload Song
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('songs')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'songs'
                      ? 'bg-gradient-to-r from-[#ff005c] to-[#8c00ff] text-white shadow-lg shadow-[#ff005c]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <i className="ri-music-2-line w-5 h-5 flex items-center justify-center"></i>
                  Manage Songs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-[#ff005c] to-[#8c00ff] text-white shadow-lg shadow-[#ff005c]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <i className="ri-settings-line w-5 h-5 flex items-center justify-center"></i>
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
