"use client";

import { useState } from "react";
import Link from "next/link";

export default function Repositories() {
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [repositories, setRepositories] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new repository to the list
    const newRepo = { name: repoName, description: repoDescription };
    setRepositories([...repositories, newRepo]);

    // Clear the form after submission
    setRepoName("");
    setRepoDescription("");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Repositories</h1>

      {/* Add Repo Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="repoName" className="block text-sm font-medium text-gray-300 mb-1">
              Repository Name:
            </label>
            <input
              type="text"
              id="repoName"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter repository name"
              required
            />
          </div>

          <div>
            <label htmlFor="repoDescription" className="block text-sm font-medium text-gray-300 mb-1">
              Repository Description:
            </label>
            <textarea
              id="repoDescription"
              value={repoDescription}
              onChange={(e) => setRepoDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter repository description"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Repository
          </button>
        </form>
      </div>

      {/* List of Repositories */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Existing Repositories</h2>
        <div className="space-y-4">
          {repositories.map((repo, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-medium text-white">{repo.name}</h3>
              <p className="text-gray-400">{repo.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Link to Dashboard */}
      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
