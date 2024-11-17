"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import useCheckAuth from "@/utils/checkAuth";

// Define the type for userData
interface UserData {
  username: string;
  email: string;
  repositories?: { name: string }[];
  activity?: { description: string }[];
}

// Helper type to handle errors
interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const API_URL = typeof window !== "undefined" ? window.location.origin : "";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user, isAuthenticated, loading } = useCheckAuth();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${API_URL}/api/user?firebaseUid=${user.uid}`
          );
          setUserData(response.data);
        } catch (error) {
          const typedError = error as CustomError;
          console.error("Error fetching user data:", error);
          throw new Error(typedError.message || "Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-16 md:ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main
          className={`flex-1 p-6 lg:p-10 bg-gray-900 transition-all duration-300 ${
            isSidebarOpen ? "md:pl-16" : "md:pl-10"
          }`}
        >
          <h1 className="text-3xl font-semibold mb-6">
            Welcome to your Dashboard
          </h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Overview Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:bg-gray-700 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Overview</h2>
                <span className="text-green-500 text-4xl">📊</span>
              </div>
              <p className="text-gray-400">
                View insights and summaries of your activity.
              </p>
              <button className="mt-4 text-blue-500 hover:text-blue-400">
                See More
              </button>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:bg-gray-700 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <span className="text-yellow-500 text-4xl">📝</span>
              </div>
              <p className="text-gray-400">
                Track your recent contributions and actions.
              </p>
              <button className="mt-4 text-blue-500 hover:text-blue-400">
                View Activity
              </button>
            </div>

            {/* Repositories Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:bg-gray-700 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Repositories</h2>
                <span className="text-purple-500 text-4xl">🔧</span>
              </div>
              <p className="text-gray-400">
                Manage and view your repositories easily.
              </p>
              <button className="mt-4 text-blue-500 hover:text-blue-400">
                Manage Repos
              </button>
            </div>
          </div>

          {/* User Data Section */}
          {userData && (
            <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold">Your Data</h2>
              <p className="text-gray-400">Username: {userData.username}</p>
              <p className="text-gray-400">Email: {userData.email}</p>
              <p className="text-gray-400">
                Repositories: {userData.repositories?.length}
              </p>
              <p className="text-gray-400">
                Activity: {userData.activity?.length}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
