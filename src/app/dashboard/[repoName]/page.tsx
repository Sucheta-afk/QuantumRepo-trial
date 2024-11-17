"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaStar,
  FaCodeBranch,
  FaExclamationCircle,
  FaPlay,
  FaTrash,
} from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import axios from "axios";
import useCheckAuth from "@/utils/checkAuth";

type File = {
  _id: string;
  name: string;
  content: string;
  repoId: string;
};

type Repository = {
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  stars: number;
  forks: number;
  issues: number;
  contributors: string[];
  files: File[];
};

const API_URL = typeof window !== "undefined" ? window.location.origin : "";

export default function RepositoryDetails() {
  const params = useParams();
  const repoName = params.repoName;
  const [repo, setRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const { user, loading: authLoading, isAuthenticated } = useCheckAuth();

  const handleLaunchEditor = () => {
    router.push(`/dashboard/${repoName}/editor`);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteRepo = async () => {
    try {
      setDeleting(true);
      await axios.delete(`${API_URL}/api/user/${user.uid}/repo/${repoName}`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting repository:", error);
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchRepoDetails = async () => {
      if (!isAuthenticated || !user || !repoName) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/api/user/${user.uid}/repo/${repoName}`
        );
        setRepo(response.data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [user, isAuthenticated, repoName]);

  if (authLoading || loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (!repo) {
    return <p className="text-center text-gray-500">Repository not found!</p>;
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
        <Header />

        {/* Repository Details */}
        <div className="p-6 lg:p-10 bg-gray-900">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-semibold text-blue-400">
                  {repo.name}
                </h1>
                <p className="text-gray-400 mt-1">{repo.description}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {repo.language}
                  </span>
                  <span className="text-sm text-gray-500">
                    Updated {repo.updatedAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex items-center text-gray-200 space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-500" />
                <span>{repo.stars} Stars</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCodeBranch className="text-green-500" />
                <span>{repo.forks} Forks</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaExclamationCircle className="text-red-500" />
                <span>{repo.issues} Issues</span>
              </div>
            </div>

            {/* Launch Editor Button */}
            <div className="mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg flex items-center space-x-2"
                onClick={handleLaunchEditor}
              >
                <FaPlay />
                <span>Launch Editor</span>
              </button>
            </div>

            {/* Delete Repository Button */}
            <div className="mt-6">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-lg flex items-center space-x-2"
                onClick={() => setIsModalOpen(true)}
              >
                <FaTrash />
                <span>Delete Repository</span>
              </button>
            </div>
          </div>

          {/* File List Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Files</h2>
            <div className="space-y-4">
              {repo.files.length === 0 ? (
                <p className="text-gray-400">
                  No files found in this repository.
                </p>
              ) : (
                repo.files.map((file) => (
                  <div
                    key={file._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-blue-500">
                      {file.name}
                    </h3>
                    <p className="text-gray-400 mt-2">
                      {file.content.substring(0, 10)}...
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl text-red-600 font-semibold mb-4">
                Are you sure?
              </h3>
              <p className="text-gray-400 mb-4">
                This action cannot be undone. The repository &quot;{repoName}
                &quot; will be permanently deleted.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={handleDeleteRepo}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
