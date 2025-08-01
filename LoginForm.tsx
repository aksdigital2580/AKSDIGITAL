
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LoginFormProps {
  onLoginSuccess: (email: string) => void;
  onForgotPassword: () => void;
}

export default function LoginForm({ onLoginSuccess, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (email === 'krushnamohanta217@gmail.com' && password === 'Aksdigital9692@2025') {
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(email);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Invalid email or password. Please try again.');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-[#ff005c] to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist'] inline-block mb-4">
            AKS DIGITAL
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2 font-['Urbanist']">Admin Login</h1>
          <p className="text-gray-400">Enter your credentials to access the admin panel</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} w-5 h-5 flex items-center justify-center`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff005c]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line w-5 h-5 flex items-center justify-center"></i>
                  Sign In
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[#ff005c] hover:text-[#8c00ff] transition-colors text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2">
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
