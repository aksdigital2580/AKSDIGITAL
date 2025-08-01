
'use client';

import { Song } from '@/lib/types';
import SongCard from './SongCard';

interface SongGridProps {
  songs: Song[];
  onSongPlay: (song: Song) => void;
}

export default function SongGrid({ songs, onSongPlay }: SongGridProps) {
  return (
    <section className="py-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist']">
            Latest DJ Remixes
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-['Poppins']">
            Discover the hottest DJ remixes and dance tracks. Stream online or download for free.
          </p>
        </div>

        {songs.length === 0 ? (
          <div className="text-center py-20">
            <i className="ri-music-2-line text-6xl text-gray-600 mb-6 w-16 h-16 flex items-center justify-center mx-auto"></i>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No songs found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} onPlay={() => onSongPlay(song)} />
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#ff005c]/40 flex items-center gap-2 mx-auto whitespace-nowrap">
            <i className="ri-add-circle-line w-6 h-6 flex items-center justify-center"></i>
            Load More Songs
          </button>
        </div>
      </div>
    </section>
  );
}
