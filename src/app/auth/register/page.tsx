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

const API_URL = typeof window !== "undefined" ? window.location.origin : "";

interface LoginResponse {
  message: string;
}

// Helper type to handle errors
interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Google Login
const googleLogin = async (): Promise<LoginResponse> => {
  try {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await axios.post(
      `${API_URL}/auth/googleLogin`,
      { token },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    const typedError = error as CustomError;
    console.error("Error during Google login:", typedError);
    throw new Error(typedError.message || "Google Login failed");
  }
};

// GitHub Login
const githubLogin = async (): Promise<LoginResponse> => {
  try {
    const provider = new GithubAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await axios.post(
      `${API_URL}/auth/githubLogin`,
      { token },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    const typedError = error as CustomError;
    console.error("Error during GitHub login:", typedError);
    throw new Error(typedError.message || "GitHub Login failed");
  }
};

const CreateAccount: React.FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (error) {
      console.error("An error occurred during Google Sign-In:", error);
      setError("An error occurred during Google Sign-In. Please try again.");
    }
  };

  // Handle GitHub Sign-In
  const handleGitHubSignIn = async () => {
    try {
      await githubLogin();
      router.push("/");
    } catch (error) {
      console.error("An error occurred during GitHub Sign-In:", error);
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
            Already have an account?
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              {" "}
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
