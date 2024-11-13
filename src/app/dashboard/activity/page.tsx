"use client";

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

type Activity = {
  id: number;
  description: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export default function Activity() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, description: 'Pushed new commit to QuantumRepo', timestamp: '2 hours ago', status: 'Completed' },
    { id: 2, description: 'Opened issue #42 in Nexus UI', timestamp: '1 day ago', status: 'Pending' },
    { id: 3, description: 'Forked Lamina repository', timestamp: '3 days ago', status: 'Completed' },
    { id: 4, description: 'Closed issue #101 in Lamina', timestamp: '1 week ago', status: 'Failed' },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-16 md:ml-64' : 'ml-20'}`}>
        <Header />

        <main className="flex-1 p-6 lg:p-10">
          <h1 className="text-3xl font-semibold mb-6">Recent Activity</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-gray-800 p-5 rounded-lg shadow-md hover:bg-gray-700 transition">
                <h2 className="text-lg font-semibold">{activity.description}</h2>
                <p className="text-gray-400">{activity.timestamp}</p>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm rounded ${
                    activity.status === 'Completed'
                      ? 'bg-green-500'
                      : activity.status === 'Pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
