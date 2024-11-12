"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/auth/Footer';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Logo */}
      <div className="logo mb-4">
        <Image src="/assets/logo.jpg" alt="QuantumRepo Logo" className="w-40 h-40 rounded-full" width={160} height={160}/>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Sign in to QuantumRepo</h2>

      {/* Container */}
      <div className="container max-w-xs w-full p-6 bg-gray-700 rounded-lg shadow-lg">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="input-group mb-4">
            <label className="label text-sm font-semibold mb-1" htmlFor="username">
              Username or email address
            </label>
            <input
              type="text"
              id="username"
              className="input w-full px-3 py-2 rounded border border-gray-500 bg-gray-800 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group mb-4">
            <label className="label text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input w-full px-3 py-2 rounded border border-gray-500 bg-gray-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link href="/auth/forgot-password" className="text-blue-500 text-xs hover:underline mt-1 block">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="button w-full px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700">
            Sign in
          </button>
        </form>

        {/* Footer Links */}
        <div className="footer-links mt-4 text-center text-sm">
          <p>
            New to QuantumRepo? <Link href="/auth/register" className="text-blue-500 hover:underline">Create an account</Link>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default SignIn;
