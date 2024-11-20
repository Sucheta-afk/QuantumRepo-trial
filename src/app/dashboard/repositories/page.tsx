"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RepositoryCard from "@/components/dashboard/RepositoryCard";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import checkAuth from "@/utils/checkAuth";
import axios from "axios";

// Define the Repository type
export type Repository = {
  id: string;
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  files: { name: string; content: string }[]; // Adding file information to repository
};

// Helper type to handle errors
interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const API_URL = "/api/repo"; // Updated API URL

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRepo, setNewRepo] = useState<Partial<Repository>>({
    name: "",
    description: "",
    language: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { user, loading, isAuthenticated } = checkAuth();

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

  const validateRepoName = (name: string) => {
    const isValid = /^[a-zA-Z0-9-]+$/.test(name);

    if (!isValid) {
      setError(
        "Repository name can only contain letters, numbers, and hyphens."
      );
      return false;
    }

    const isUnique = !repositories.some((repo) => repo.name === name);
    if (!isUnique) {
      setError("Repository name must be unique.");
      return false;
    }

    return true;
  };

  // Fetch repositories after firebaseUid is available
  const fetchRepositories = async () => {
    if (!user?.uid) {
      return; // Ensure we only make the API call if firebaseUid is available
    }

    try {
      const response = await axios.get(`${API_URL}?firebaseUid=${user.uid}`);
      const repos: Repository[] = response.data.map((repo: Repository) => ({
        id: String(repo.id),
        name: repo.name,
        description: repo.description,
        language: repo.language || "", // Default empty language if not provided
        updatedAt: repo.updatedAt,
        files: repo.files || [], // Ensure files are included
      }));

      setRepositories(repos);
    } catch (error) {
      const typedError = error as CustomError;
      console.error("Error fetching repositories:", error);
      setError(typedError.message || "Error fetching repositories");
    }
  };

  const handleAddRepo = async () => {
    const { name, description } = newRepo;

    if (!name || !description) {
      setError("All fields are required.");
      return;
    }

    if (!validateRepoName(name)) {
      return;
    }

    try {
      if (user) {
        const response = await axios.post(`${API_URL}`, {
          firebaseUid: user.uid,
          ...newRepo,
        });

        setRepositories((prev) => [
          ...prev,
          { ...response.data, id: String(response.data.id) },
        ]);
        setShowModal(false);
        setNewRepo({ name: "", description: "", language: "" });
        setError(null);
      }
    } catch (error) {
      console.error("Error adding repository:", error);
      setError("Failed to create repository.");
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchRepositories();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You must log in to view this page.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-16 md:ml-64" : "ml-20"
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
        <main className="flex-1 p-6 lg:p-10 bg-gray-900 transition-all duration-300">
          {repositories.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {repositories.map((repo) => (
                <div key={repo.id}>
                  <Link href={`/dashboard/${repo.name}`}>
                    <RepositoryCard repo={repo} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No repositories found.</p>
          )}
        </main>
      </div>

      {/* Modal to Create Repository */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold text-blue-400 mb-4">
              Create Repository
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Repository Name"
              value={newRepo.name || ""}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
            />
            <input
              type="text"
              name="description"
              placeholder="Repository Description"
              value={newRepo.description || ""}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
            />
            <input
              type="text"
              name="language"
              placeholder="Programming Language"
              value={newRepo.language || ""}
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
