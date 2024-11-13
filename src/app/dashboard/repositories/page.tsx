"use client";

import { useState } from 'react';
import Link from 'next/link';
import RepositoryCard from '@/components/dashboard/RepositoryCard';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export type Repository = {
  id: number;
  name: string;
  description: string;
  language: string;
  updatedAt: string;
};

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([
    { id: 1, name: 'QuantumRepo', description: 'A repo management tool', language: 'TypeScript', updatedAt: '2 days ago' },
    { id: 2, name: 'Nexus UI', description: 'A UI framework for space-themed apps', language: 'JavaScript', updatedAt: '5 days ago' },
    { id: 3, name: 'Lamina', description: '3D rendering library', language: 'Python', updatedAt: '1 week ago' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRepo, setNewRepo] = useState<Repository>({ id: 0, name: '', description: '', language: '', updatedAt: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRepo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRepo = () => {
    const newId = repositories.length + 1;
    const repoToAdd = { ...newRepo, id: newId, updatedAt: 'Just Now' };
    setRepositories([...repositories, repoToAdd]);
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-16 md:ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <Header />

        {/* Button to Open Modal */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-4 mx-8"
        >
          Create New Repository
        </button>

        {/* Repository List */}
        <main className={`flex-1 p-6 lg:p-10 bg-gray-900 transition-all duration-300`}>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {repositories.map((repo) => (
              <Link key={repo.id} href={`/dashboard/${repo.id}`}>
                <RepositoryCard repo={repo} />
              </Link>
            ))}
          </div>
        </main>
      </div>

      {/* Modal to Create Repository */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Create Repository</h2>

            <input
              type="text"
              name="name"
              placeholder="Repository Name"
              value={newRepo.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
            />
            <input
              type="text"
              name="description"
              placeholder="Repository Description"
              value={newRepo.description}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
            />
            <input
              type="text"
              name="language"
              placeholder="Programming Language"
              value={newRepo.language}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRepo}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Repository
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
