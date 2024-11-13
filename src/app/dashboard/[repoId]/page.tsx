"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaStar, FaCodeBranch, FaExclamationCircle, FaCog, FaPlay } from 'react-icons/fa';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

type Repository = {
  id: number;
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  stars: number;
  forks: number;
  issues: number;
  contributors: string[];
};

// Mock repository data
const repositories: Repository[] = [
  { id: 1, name: 'QuantumRepo', description: 'A repo management tool', language: 'TypeScript', updatedAt: '2 days ago', stars: 120, forks: 40, issues: 3, contributors: ['Alice', 'Bob'] },
  { id: 2, name: 'Nexus UI', description: 'A UI framework for space-themed apps', language: 'JavaScript', updatedAt: '5 days ago', stars: 250, forks: 80, issues: 12, contributors: ['Charlie', 'Dave'] },
  { id: 3, name: 'Lamina', description: '3D rendering library', language: 'Python', updatedAt: '1 week ago', stars: 150, forks: 30, issues: 8, contributors: ['Eve', 'Frank'] },
];

export default function RepositoryDetails() {
  const params = useParams();
  const repoId = params.repoId;
  const [repo, setRepo] = useState<Repository | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('code');

  useEffect(() => {
    if (repoId) {
      const selectedRepo = repositories.find((repo) => repo.id.toString() === repoId);
      setRepo(selectedRepo);
    }
    setLoading(false);
  }, [repoId]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (!repo) {
    return <p className="text-center text-gray-500">Repository not found!</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header (Navbar) */}
        <Header />

        {/* Repository Details */}
        <div className="p-6 bg-gray-900 rounded-lg shadow-md mb-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold text-blue-400">{repo.name}</h1>
              <p className="text-gray-400 mt-1">{repo.description}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{repo.language}</span>
                <span className="text-sm text-gray-500">Updated {repo.updatedAt}</span>
              </div>
            </div>

            {/* Settings Menu */}
            <div className="relative">
              <button className="text-gray-400 hover:text-blue-500 focus:outline-none">
                <FaCog size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 hidden group-hover:block">
                <p className="text-sm text-gray-300 cursor-pointer hover:text-blue-500">Edit Repository</p>
                <p className="text-sm text-gray-300 cursor-pointer hover:text-blue-500 mt-2">Manage Contributors</p>
                <p className="text-sm text-gray-300 cursor-pointer hover:text-blue-500 mt-2">Settings</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex items-center text-gray-200 space-x-6 mt-4">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FaStar className="text-yellow-500" />
              <span>{repo.stars} Stars</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FaCodeBranch className="text-green-500" />
              <span>{repo.forks} Forks</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FaExclamationCircle className="text-red-500" />
              <span>{repo.issues} Issues</span>
            </button>
          </div>

          {/* Launch Editor Button */}
          <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <FaPlay />
              <span>Launch Editor</span>
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-gray-900">
          <div className="flex space-x-8 p-4 border-b border-gray-600">
            <button
              className={`${
                activeTab === 'code' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
              } pb-2`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
            <button
              className={`${
                activeTab === 'issues' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
              } pb-2`}
              onClick={() => setActiveTab('issues')}
            >
              Issues
            </button>
            <button
              className={`${
                activeTab === 'pulls' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
              } pb-2`}
              onClick={() => setActiveTab('pulls')}
            >
              Pull Requests
            </button>
            <button
              className={`${
                activeTab === 'contributors' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
              } pb-2`}
              onClick={() => setActiveTab('contributors')}
            >
              Contributors
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 text-gray-300">
          {activeTab === 'code' && (
            <div>
              <h2 className="text-xl font-semibold">Code Files</h2>
              <p className="text-gray-500 mt-2">Browse the source code here...</p>
            </div>
          )}
          {activeTab === 'issues' && (
            <div>
              <h2 className="text-xl font-semibold">Issues</h2>
              <p className="text-gray-500 mt-2">No open issues found.</p>
            </div>
          )}
          {activeTab === 'pulls' && (
            <div>
              <h2 className="text-xl font-semibold">Pull Requests</h2>
              <p className="text-gray-500 mt-2">No open pull requests found.</p>
            </div>
          )}
          {activeTab === 'contributors' && (
            <div>
              <h2 className="text-xl font-semibold">Contributors</h2>
              <ul className="list-disc ml-5 mt-4 text-gray-300">
                {repo.contributors.map((contributor, index) => (
                  <li key={index}>{contributor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
