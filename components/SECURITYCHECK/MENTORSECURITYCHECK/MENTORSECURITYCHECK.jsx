"use client";
import { useState } from 'react';

const MENTORSECURITYCHECK = ({ children }) => {
  const [secretKey, setSecretKey] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (secretKey === process.env.NEXT_PUBLIC_SECRET_KEY_MENTOR) {
        setIsVerified(true);
      } else {
        setError('Invalid secret key. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isVerified) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#e2ebfc]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6 transition-all duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Please enter your secret key to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MENTORSECURITYCHECK;