"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, FormEvent } from 'react';
import Footer from '@/components/auth/Footer';

const CreateAccount: React.FC = () => {
  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async (event: FormEvent) => {
    event.preventDefault();

    // Sending data to API
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
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
      <h2 className="text-2xl font-semibold mb-6">Create your account</h2>

      {/* Container */}
      <div className="container max-w-xs w-full p-6 bg-gray-700 rounded-lg shadow-lg">
        {/* Form */}
        <form onSubmit={handleCreateAccount}>
          {/* Username Input */}
          <div className="input-group mb-4">
            <label className="label text-sm font-semibold mb-1" htmlFor="username">
              Username
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

          {/* Email Input */}
          <div className="input-group mb-4">
            <label className="label text-sm font-semibold mb-1" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="input w-full px-3 py-2 rounded border border-gray-500 bg-gray-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>

          {/* Create Account Button */}
          <button type="submit" className="button w-full px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700">
            Create account
          </button>
        </form>

        {/* Footer Links */}
        <div className="footer-links mt-4 text-center text-sm">
          <p>
            Already have an account?
            <Link href="/auth/login" className="text-blue-500 hover:underline">Sign in</Link>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default CreateAccount;