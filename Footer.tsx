
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-[#ff005c] to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist'] mb-4 inline-block">
              AKS DIGITAL
            </Link>
            <p className="text-gray-400 mb-6 max-w-md font-['Poppins']">
              Your ultimate destination for DJ remixes and electronic music. Stream and download premium quality tracks by DJ Luna Janjali.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#ff005c] hover:text-white transition-all">
                <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#8c00ff] hover:text-white transition-all">
                <i className="ri-instagram-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#ff005c] hover:text-white transition-all">
                <i className="ri-youtube-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#8c00ff] hover:text-white transition-all">
                <i className="ri-soundcloud-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 font-['Urbanist']">Quick Links</h3>
            <ul className="space-y-3 font-['Poppins']">
              <li><Link href="/" className="text-gray-400 hover:text-[#ff005c] transition-colors">Home</Link></li>
              <li><Link href="/upload" className="text-gray-400 hover:text-[#ff005c] transition-colors">Upload Song</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-[#ff005c] transition-colors">Admin Panel</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ff005c] transition-colors">About DJ Luna</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 font-['Urbanist']">Categories</h3>
            <ul className="space-y-3 font-['Poppins']">
              <li><a href="#" className="text-gray-400 hover:text-[#8c00ff] transition-colors">Dance Remixes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#8c00ff] transition-colors">Romantic Songs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#8c00ff] transition-colors">Sad Melodies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#8c00ff] transition-colors">Latest Releases</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-['Poppins']">
            © 2024 AKS DIGITAL. All rights reserved. Created by DJ Luna Janjali.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
