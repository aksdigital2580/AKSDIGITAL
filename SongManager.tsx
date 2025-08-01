
'use client';

import { useState } from 'react';
import { Song } from '@/lib/types';

interface SongManagerProps {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  activeView: 'songs' | 'upload';
}

export default function SongManager({ songs, setSongs, activeView }: SongManagerProps) {
  const [formData, setFormData] = useState({
    title: '',
    artist: 'DJ Luna Janjali',
    audioUrl: '',
    downloadUrl: '',
    thumbnail: '',
    category: 'Dance' as const
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess('');

    const newSong: Song = {
      id: editingSong?.id || Date.now().toString(),
      title: formData.title,
      artist: formData.artist,
      audioUrl: formData.audioUrl,
      downloadUrl: formData.downloadUrl || formData.audioUrl,
      thumbnail: formData.thumbnail || `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28formData.title%20%20%20%20%20%20%20formData.category%20%20%20%20music%20DJ%20remix%20neon%20lights%29%7D&width=400&height=400&seq=${Date.now()}&orientation=squarish`,
      category: formData.category,
      uploadDate: new Date(),
      downloads: editingSong?.downloads || 0,
      views: editingSong?.views || 0
    };

    setTimeout(() => {
      if (editingSong) {
        setSongs(songs.map(song => song.id === editingSong.id ? newSong : song));
        setEditingSong(null);
        setSuccess('Song updated successfully!');
      } else {
        setSongs([newSong, ...songs]);
        setSuccess('Song uploaded successfully!');
      }
      
      setFormData({
        title: '',
        artist: 'DJ Luna Janjali',
        audioUrl: '',
        downloadUrl: '',
        thumbnail: '',
        category: 'Dance'
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setFormData({
      title: song.title,
      artist: song.artist,
      audioUrl: song.audioUrl,
      downloadUrl: song.downloadUrl,
      thumbnail: song.thumbnail,
      category: song.category
    });
  };

  const handleDelete = (songId: string) => {
    if (confirm('Are you sure you want to delete this song?')) {
      setSongs(songs.filter(song => song.id !== songId));
    }
  };

  const cancelEdit = () => {
    setEditingSong(null);
    setFormData({
      title: '',
      artist: 'DJ Luna Janjali',
      audioUrl: '',
      downloadUrl: '',
      thumbnail: '',
      category: 'Dance'
    });
  };

  if (activeView === 'upload') {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg flex items-center justify-center">
            <i className="ri-upload-2-line text-white w-6 h-6 flex items-center justify-center"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-['Urbanist']">
              {editingSong ? 'Edit Song' : 'Upload New Song'}
            </h1>
            <p className="text-gray-400">Add a new track to your collection</p>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Song Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter song title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={formData.artist}
                  onChange={(e) => setFormData({...formData, artist: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter artist name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Google Drive Audio Link *
              </label>
              <input
                type="url"
                value={formData.audioUrl}
                onChange={(e) => setFormData({...formData, audioUrl: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="https://drive.google.com/file/d/..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Download Link (Optional)
              </label>
              <input
                type="url"
                value={formData.downloadUrl}
                onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="Leave empty to use audio link"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Thumbnail URL (Optional)
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="Auto-generated if left empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as 'Dance' | 'Romantic' | 'Sad'})}
                className="w-full px-4 py-3 pr-8 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white"
              >
                <option value="Dance">Dance</option>
                <option value="Romantic">Romantic</option>
                <option value="Sad">Sad</option>
              </select>
            </div>

            {success && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm">
                {success}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {editingSong ? 'Updating...' : 'Uploading...'}
                  </>
                ) : (
                  <>
                    <i className={`${editingSong ? 'ri-save-line' : 'ri-upload-2-line'} w-5 h-5 flex items-center justify-center`}></i>
                    {editingSong ? 'Update Song' : 'Upload Song'}
                  </>
                )}
              </button>
              
              {editingSong && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-gray-700 rounded-lg font-semibold text-white transition-all hover:bg-gray-600 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg flex items-center justify-center">
            <i className="ri-music-2-line text-white w-6 h-6 flex items-center justify-center"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-['Urbanist']">Manage Songs</h1>
            <p className="text-gray-400">Edit or delete your uploaded tracks</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          Total Songs: <span className="text-white font-medium">{songs.length}</span>
        </div>
      </div>

      {songs.length === 0 ? (
        <div className="text-center py-20">
          <i className="ri-music-2-line text-6xl text-gray-600 mb-6 w-16 h-16 flex items-center justify-center mx-auto"></i>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No songs uploaded yet</h3>
          <p className="text-gray-500 mb-6">Start by uploading your first track</p>
          <button className="px-6 py-3 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 whitespace-nowrap">
            Upload Your First Song
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {songs.map((song) => (
            <div key={song.id} className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 transition-all hover:border-gray-600/50">
              <div className="flex items-center gap-6">
                <img 
                  src={song.thumbnail} 
                  alt={song.title}
                  className="w-20 h-20 rounded-lg object-cover object-top"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate mb-1">{song.title}</h3>
                  <p className="text-gray-400 mb-2">{song.artist}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                      {song.uploadDate.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                      {song.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
                      {song.downloads.toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      song.category === 'Dance' ? 'bg-blue-500/20 text-blue-400' :
                      song.category === 'Romantic' ? 'bg-pink-500/20 text-pink-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {song.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(song)}
                    className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
