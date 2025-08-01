
'use client';

import { useState, useRef, useEffect } from 'react';
import { Song } from '@/lib/types';

interface NowPlayingBarProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

export default function NowPlayingBar({ song, isPlaying, onPlayPause, onClose }: NowPlayingBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-lg border-t border-gray-700/50 p-4 z-50">
      <audio ref={audioRef} src={song.audioUrl} />

      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img 
              src={song.thumbnail} 
              alt={song.title}
              className="w-14 h-14 rounded-lg object-cover object-top"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-semibold truncate">{song.title}</h4>
              <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button
              onClick={onPlayPause}
              className="w-10 h-10 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-lg w-5 h-5 flex items-center justify-center ${!isPlaying ? 'ml-0.5' : ''}`}></i>
            </button>

            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs text-gray-400 min-w-[35px}">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-gray-400 min-w-[35px)">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <i className="ri-volume-down-line text-gray-400 w-4 h-4 flex items-center justify-center"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
            >
              <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #ff005c, #8c00ff);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #ff005c, #8c00ff);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
