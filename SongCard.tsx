
'use client';

import { useState } from 'react';
import { Song } from '@/lib/types';

interface SongCardProps {
  song: Song;
  onPlay: () => void;
}

export default function SongCard({ song, onPlay }: SongCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleDownload = () => {
    window.open(song.downloadUrl, '_blank');
  };

  const handleShare = (platform: string) => {
    const text = `Check out "${song.title}" by ${song.artist} on AKS DIGITAL!`;
    const url = window.location.href;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(text + ' ' + url);
      alert('Link copied! You can now share it on Instagram.');
    }
    setShowShareMenu(false);
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ff005c]/20 hover:border-[#ff005c]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={song.thumbnail} 
          alt={song.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:bg-black/70"
            >
              <i className="ri-share-line text-white w-5 h-5 flex items-center justify-center"></i>
            </button>
            
            {showShareMenu && (
              <div className="absolute top-12 right-0 bg-gray-900/95 backdrop-blur-lg rounded-lg p-2 space-y-2 z-10 border border-gray-700/50">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700/50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-whatsapp-line text-green-500 w-4 h-4 flex items-center justify-center"></i>
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700/50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-instagram-line text-pink-500 w-4 h-4 flex items-center justify-center"></i>
                  Instagram
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full text-xs font-medium">
            {song.category}
          </span>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={onPlay}
            className="w-16 h-16 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center shadow-2xl shadow-[#ff005c]/50 transition-all hover:scale-110"
          >
            <i className="ri-play-fill text-2xl ml-1 w-8 h-8 flex items-center justify-center"></i>
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 font-[\'Urbanist\'] line-clamp-2">
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 font-[\'Poppins\']">
          {song.artist}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
            {song.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
            {song.downloads.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPlay}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="ri-play-line w-4 h-4 flex items-center justify-center"></i>
            Play
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg font-medium transition-all hover:bg-gray-700/50 flex items-center justify-center"
          >
            <i className="ri-download-2-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
