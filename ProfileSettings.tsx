
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProfileSettingsProps {
  onLogout: () => void;
}

export default function ProfileSettings({ onLogout }: ProfileSettingsProps) {
  const [email, setEmail] = useState('krushnamohanta217@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Email updated successfully!');
    }, 1000);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (currentPassword !== 'Aksdigital9692@2025') {
      setError('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg flex items-center justify-center">
          <i className="ri-settings-line text-white w-6 h-6 flex items-center justify-center"></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-['Urbanist']">Profile Settings</h1>
          <p className="text-gray-400">Manage your account settings and security</p>
        </div>
      </div>

      {(success || error) && (
        <div className={`rounded-lg p-4 mb-6 ${
          success ? 'bg-green-500/10 border border-green-500/50 text-green-400' : 
          'bg-red-500/10 border border-red-500/50 text-red-400'
        }`}>
          {success || error}
        </div>
      )}

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <i className="ri-mail-line text-[#ff005c] w-6 h-6 flex items-center justify-center"></i>
          <h2 className="text-xl font-semibold text-white">Email Settings</h2>
        </div>

        <form onSubmit={handleEmailUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <i className="ri-save-line w-5 h-5 flex items-center justify-center"></i>
                Update Email
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <i className="ri-key-line text-[#8c00ff] w-6 h-6 flex items-center justify-center"></i>
          <h2 className="text-xl font-semibold text-white">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="Enter current password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
              placeholder="Confirm new password"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="w-4 h-4 text-[#ff005c] bg-gray-800 border-gray-600 rounded focus:ring-[#ff005c] focus:ring-2"
            />
            <label htmlFor="showPasswords" className="ml-2 text-sm text-gray-300">
              Show passwords
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <i className="ri-save-line w-5 h-5 flex items-center justify-center"></i>
                Change Password
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <i className="ri-external-link-line text-orange-400 w-6 h-6 flex items-center justify-center"></i>
          <h2 className="text-xl font-semibold text-white">Quick Links</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-all group"
          >
            <i className="ri-home-line text-blue-400 w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
            <div>
              <div className="text-white font-medium">Homepage</div>
              <div className="text-sm text-gray-400">View public site</div>
            </div>
          </Link>

          <Link
            href="/upload"
            className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-all group"
          >
            <i className="ri-upload-2-line text-green-400 w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
            <div>
              <div className="text-white font-medium">Public Upload</div>
              <div className="text-sm text-gray-400">User submission form</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-red-600/10 border border-red-600/30 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <i className="ri-logout-box-line text-red-400 w-6 h-6 flex items-center justify-center"></i>
          <h2 className="text-xl font-semibold text-white">Session Management</h2>
        </div>

        <p className="text-gray-400 mb-6">
          Sign out of your admin account and return to the login page.
        </p>

        <button
          onClick={onLogout}
          className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <i className="ri-logout-box-line w-5 h-5 flex items-center justify-center"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
}
