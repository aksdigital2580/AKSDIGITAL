
'use client';

import { useState, useEffect, useRef } from 'react';

interface OtpVerificationProps {
  email: string;
  onOtpSuccess: () => void;
  onBack: () => void;
}

export default function OtpVerification({ email, onOtpSuccess, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        onOtpSuccess();
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 1000);
    }
  };

  const handleResendOtp = () => {
    setTimeLeft(300);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-mail-line text-2xl text-white w-8 h-8 flex items-center justify-center"></i>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-['Urbanist']">Verify Your Identity</h1>
          <p className="text-gray-400">
            We've sent a 6-digit code to <br />
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-4 text-center">
                Enter OTP Code
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
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
                  Verify OTP
                </>
              )}
            </button>

            <div className="text-center space-y-3">
              <p className="text-gray-400 text-sm">
                {timeLeft > 0 ? (
                  <>Time remaining: <span className="text-white font-medium">{formatTime(timeLeft)}</span></>
                ) : (
                  <span className="text-red-400">OTP has expired</span>
                )}
              </p>
              
              {canResend && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#ff005c] hover:text-[#8c00ff] transition-colors text-sm font-medium"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div className="text-center pt-4">
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
