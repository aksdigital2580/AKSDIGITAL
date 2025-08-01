
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    audioUrl: '',
    thumbnail: '',
    category: 'Dance' as const,
    submitterName: '',
    submitterEmail: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setFormData({
        title: '',
        artist: '',
        audioUrl: '',
        thumbnail: '',
        category: 'Dance',
        submitterName: '',
        submitterEmail: ''
      });
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] font-['Poppins']">
        <Header 
          searchQuery=""
          onSearchChange={() => {}}
          selectedCategory="All"
          onCategoryChange={() => {}}
        />
        
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4 font-['Urbanist']">
              Submission Received!
            </h1>
            
            <p className="text-gray-400 mb-8">
              Thank you for your song submission. We'll review it and add it to our collection if approved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 text-center whitespace-nowrap"
              >
                Back to Home
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-gray-700 rounded-lg font-semibold text-white transition-all hover:bg-gray-600 whitespace-nowrap"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] font-['Poppins']">
      <Header 
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="All"
        onCategoryChange={() => {}}
      />
      
      <div className="py-20 px-4 min-h-screen">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-upload-2-line text-2xl text-white w-8 h-8 flex items-center justify-center"></i>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist']">
              Submit Your Song
            </h1>
            
            <p className="text-gray-400 text-lg">
              Share your DJ remix or original track with the AKS DIGITAL community
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <form id="song-upload-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                    placeholder="Enter song title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Artist Name *
                  </label>
                  <input
                    type="text"
                    name="artist"
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
                  Google Drive MP3 Link *
                </label>
                <input
                  type="url"
                  name="audioUrl"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({...formData, audioUrl: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="https://drive.google.com/file/d/..."
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Make sure your Google Drive file is set to "Anyone with the link can view"
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Thumbnail Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as 'Dance' | 'Romantic' | 'Sad'})}
                  className="w-full px-4 py-3 pr-8 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white"
                >
                  <option value="Dance">Dance</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Sad">Sad</option>
                </select>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="submitterName"
                      value={formData.submitterName}
                      onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="submitterEmail"
                      value={formData.submitterEmail}
                      onChange={(e) => setFormData({...formData, submitterEmail: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-blue-400 text-xl mt-0.5 w-6 h-6 flex items-center justify-center flex-shrink-0"></i>
                  <div className="text-sm text-blue-300">
                    <p className="font-medium mb-1">Submission Guidelines:</p>
                    <ul className="space-y-1 text-blue-200">
                      <li>• Only submit original content or remixes you have rights to</li>
                      <li>• Audio file must be in MP3 format and high quality</li>
                      <li>• Allow 24-48 hours for review and approval</li>
                      <li>• We reserve the right to reject inappropriate content</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting Your Song...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line w-6 h-6 flex items-center justify-center"></i>
                    Submit Song for Review
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
            >
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
