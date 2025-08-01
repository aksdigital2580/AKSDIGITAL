
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Header({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categories = ['All', 'Dance', 'Romantic', 'Sad'];

  return (
    <header className="bg-[#0f0f0f]/95 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#ff005c] to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist']">
            AKS DIGITAL
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <input
                type="text"
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-sm w-64"
              />
            </div>

            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#ff005c] to-[#8c00ff] text-white shadow-lg shadow-[#ff005c]/30'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <Link
              href="/admin"
              className="px-4 py-2 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 whitespace-nowrap"
            >
              Admin Login
            </Link>

            <Link
              href="/upload"
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg font-medium transition-all hover:bg-gray-700/50 whitespace-nowrap"
            >
              Upload Song
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl w-6 h-6 flex items-center justify-center`}></i>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <input
                type="text"
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#ff005c] to-[#8c00ff] text-white shadow-lg shadow-[#ff005c]/30'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/admin"
                className="px-4 py-2 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 text-center whitespace-nowrap"
              >
                Admin Login
              </Link>
              <Link
                href="/upload"
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg font-medium transition-all hover:bg-gray-700/50 text-center whitespace-nowrap"
              >
                Upload Song
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
