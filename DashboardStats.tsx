
'use client';

import { Song } from '@/lib/types';

interface DashboardStatsProps {
  stats: {
    totalSongs: number;
    totalDownloads: number;
    totalViews: number;
    latestUploads: Song[];
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg flex items-center justify-center">
          <i className="ri-dashboard-line text-white w-6 h-6 flex items-center justify-center"></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-['Urbanist']">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome to your AKS DIGITAL admin panel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center">
              <i className="ri-music-2-fill text-blue-400 text-xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <span className="text-xs text-blue-400 font-medium">TOTAL</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalSongs}</div>
          <div className="text-sm text-blue-300">Songs Uploaded</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600/30 rounded-xl flex items-center justify-center">
              <i className="ri-download-fill text-green-400 text-xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <span className="text-xs text-green-400 font-medium">TOTAL</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalDownloads.toLocaleString()}</div>
          <div className="text-sm text-green-300">Downloads</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600/30 rounded-xl flex items-center justify-center">
              <i className="ri-eye-fill text-purple-400 text-xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <span className="text-xs text-purple-400 font-medium">TOTAL</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalViews.toLocaleString()}</div>
          <div className="text-sm text-purple-300">Views</div>
        </div>

        <div className="bg-gradient-to-br from-[#ff005c]/20 to-[#8c00ff]/20 border border-[#ff005c]/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#ff005c]/30 rounded-xl flex items-center justify-center">
              <i className="ri-trending-up-fill text-[#ff005c] text-xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <span className="text-xs text-[#ff005c] font-medium">AVG</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats.totalSongs > 0 ? Math.round(stats.totalViews / stats.totalSongs) : 0}
          </div>
          <div className="text-sm text-[#ff005c]">Views per Song</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
            </div>
            <h3 className="text-lg font-semibold text-white">Recent Uploads</h3>
          </div>

          {stats.latestUploads.length === 0 ? (
            <div className="text-center py-8">
              <i className="ri-music-2-line text-4xl text-gray-600 mb-3 w-12 h-12 flex items-center justify-center mx-auto"></i>
              <p className="text-gray-400">No songs uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.latestUploads.map((song) => (
                <div key={song.id} className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-lg">
                  <img 
                    src={song.thumbnail} 
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover object-top"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{song.title}</h4>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{song.uploadDate.toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">{song.views} views</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg flex items-center justify-center">
              <i className="ri-bar-chart-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-xl text-left transition-all hover:scale-105">
              <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-upload-2-line text-blue-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <div className="text-white font-medium mb-1">Upload Song</div>
              <div className="text-xs text-blue-300">Add new track</div>
            </button>

            <button className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-xl text-left transition-all hover:scale-105">
              <div className="w-8 h-8 bg-green-600/30 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-settings-line text-green-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <div className="text-white font-medium mb-1">Settings</div>
              <div className="text-xs text-green-300">Configure account</div>
            </button>

            <button className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-xl text-left transition-all hover:scale-105">
              <div className="w-8 h-8 bg-purple-600/30 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-music-2-line text-purple-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <div className="text-white font-medium mb-1">Manage Songs</div>
              <div className="text-xs text-purple-300">Edit or delete</div>
            </button>

            <button className="p-4 bg-gradient-to-br from-[#ff005c]/20 to-[#8c00ff]/20 border border-[#ff005c]/30 rounded-xl text-left transition-all hover:scale-105">
              <div className="w-8 h-8 bg-[#ff005c]/30 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-home-line text-[#ff005c] w-5 h-5 flex items-center justify-center"></i>
              </div>
              <div className="text-white font-medium mb-1">View Site</div>
              <div className="text-xs text-[#ff005c]">Go to homepage</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
