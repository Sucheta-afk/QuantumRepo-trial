"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useState } from 'react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 lg:p-10 bg-gray-900">
          <h1 className="text-3xl font-semibold mb-6">Welcome to your Dashboard</h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded shadow hover:bg-gray-700">
              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="text-gray-400">Insights and summaries</p>
            </div>

            <div className="bg-gray-800 p-6 rounded shadow hover:bg-gray-700">
              <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
              <p className="text-gray-400">Your recent contributions</p>
            </div>

            <div className="bg-gray-800 p-6 rounded shadow hover:bg-gray-700">
              <h2 className="text-xl font-bold mb-2">Your Repositories</h2>
              <p className="text-gray-400">View and manage your repositories</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}