"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Footer from "@/components/auth/Footer";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

const googleLogin = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await axios.post(
      `/api/auth`, // Backend API route
      { token, provider: "google" }, // Send token and provider type
      { withCredentials: true } // Include cookies if needed
    );

    console.log("Google Login Successful:", response.data);
  } catch (error) {
    console.error("Google Login failed:", error);
    alert("Failed to log in with Google. Please try again.");
    throw error;
  }
};

// Function to handle GitHub login
const githubLogin = async (): Promise<void> => {
  try {
    const provider = new GithubAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await axios.post(
      `/api/auth`, // Backend API route
      { token, provider: "github" },
      { withCredentials: true }
    );

    console.log("GitHub Login Successful:", response.data);
  } catch (error) {
    console.error("GitHub Login failed:", error);
    alert("Failed to log in with GitHub. Please try again.");
    throw error;
  }
};

const CreateAccount: React.FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      router.push("/"); // Redirect to home or dashboard
    } catch {
      setError("An error occurred during Google Sign-In. Please try again.");
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await githubLogin();
      router.push("/"); // Redirect to home or dashboard
    } catch {
      setError("An error occurred during GitHub Sign-In. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Logo */}
      <div className="logo mb-4">
        <Image
          src="/assets/logo.jpg"
          alt="QuantumRepo Logo"
          className="w-40 h-40 rounded-full"
          width={160}
          height={160}
        />
      </div>

      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Create your account</h2>

      {/* Container */}
      <div className="container max-w-xs w-full p-6 bg-gray-700 rounded-lg shadow-lg">
        {/* Error Message */}
        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="button w-full px-3 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 mb-4 flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Sign in with Google
        </button>

        {/* GitHub Sign-In Button */}
        <button
          onClick={handleGitHubSignIn}
          className="button w-full px-3 py-2 bg-gray-800 text-white rounded font-semibold hover:bg-gray-700 mb-4 flex items-center justify-center"
        >
          <FaGithub className="mr-2" />
          Sign in with GitHub
        </button>

        {/* Footer Links */}
        <div className="footer-links mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreateAccount;
