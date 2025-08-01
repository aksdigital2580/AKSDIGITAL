
'use client';

import { useState } from 'react';

interface ForgotPasswordProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function ForgotPassword({ onSuccess, onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (email === 'krushnamohanta217@gmail.com') {
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Email not found in our records.');
      }, 1000);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    if (otpValue === '123456') {
      setTimeout(() => {
        setIsLoading(false);
        setStep('newPassword');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
      }, 1000);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  if (step === 'email') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-line text-2xl text-white w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-['Urbanist']">Forgot Password</h1>
            <p className="text-gray-400">Enter your email to reset your password</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter your registered email"
                  required
                />
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
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <i className="ri-mail-send-line w-5 h-5 flex items-center justify-center"></i>
                    Send Reset Code
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-mail-line text-2xl text-white w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-['Urbanist']">Enter Reset Code</h1>
            <p className="text-gray-400">
              We've sent a 6-digit code to<br />
              <span className="text-white font-medium">{email}</span>
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-4 text-center">
                  Enter OTP Code
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      name={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-semibold bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
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
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
                    Verify Code
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-key-line text-2xl text-white w-8 h-8 flex items-center justify-center"></i>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-['Urbanist']">Set New Password</h1>
          <p className="text-gray-400">Choose a strong password for your account</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter new password"
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

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff005c] focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="Confirm new password"
                required
              />
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
                  Updating Password...
                </>
              ) : (
                <>
                  <i className="ri-save-line w-5 h-5 flex items-center justify-center"></i>
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
