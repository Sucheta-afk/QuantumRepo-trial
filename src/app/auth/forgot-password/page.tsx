"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/auth/Footer";

const ForgotPassword: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPassword = prompt("Enter your new password");

    if (newPassword) {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailOrUsername, newPassword }),
      });

      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117]">
      {/* Logo */}
      <div className="logo mb-5">
        <img src="/logo.jpg" alt="QuantumRepo Logo" className="w-40 h-40 rounded-full" />
      </div>

      {/* Header */}
      <h2 className="text-xl font-semibold text-white mb-5">Reset your password</h2>

      {/* Form Container */}
      <div className="container max-w-sm w-full p-5 bg-[#3d444db3] border border-[#d0d7de] rounded-lg shadow-md text-center">
        {/* Form */}
        <form onSubmit={handleForgotPassword}>
          {/* Input Group */}
          <div className="input-group text-left mb-5">
            <label className="label font-semibold text-white block mb-2">
              Enter your email address
            </label>
            <input
              type="text"
              className="input w-full p-2 text-sm text-gray-800 border border-[#d0d7de] rounded-md"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          {/* Reset Password Button */}
          <button type="submit" className="button w-full p-2 text-sm font-semibold text-white bg-[#238636] rounded-md hover:bg-[#06a044]">
            Send password reset email
          </button>
        </form>

        {/* Footer Links */}
        <div className="footer-links mt-5">
          <p className="text-sm text-blue-500">
            <Link href="/auth/login" className="hover:underline">Sign in</Link>{" "}|{" "}
            <Link href="/auth/register" className="hover:underline">Create an account</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ForgotPassword;
