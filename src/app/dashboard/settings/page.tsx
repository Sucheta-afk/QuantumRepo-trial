"use client";

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function UserSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState({
    username: 'john_doe',
    email: 'john@example.com',
    darkMode: true,
  });

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-16 md:ml-64' : 'ml-20'}`}>
        <Header />

        <main className="flex-1 p-6 lg:p-10">
          <h1 className="text-3xl font-semibold mb-6">User Settings</h1>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-xl">
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-gray-400">Enable Dark Mode</label>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-400">
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
