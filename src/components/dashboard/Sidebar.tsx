"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      {/* Hamburger Icon - Always Visible */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600"
      >
        {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full translate-x-0"
        }`}
        style={{ width: isOpen ? "16rem" : "5rem" }}
      >
        {/* Logo Section */}
        <Link href="/home">
          <div className="flex items-center gap-3 mt-20 mb-10 justify-center">
            <Image
              src="/assets/logo.jpg"
              alt="QuantumRepo Logo"
              className="rounded-full"
              width={40}
              height={40}
            />
            {isOpen && (
              <span className="text-2xl font-bold text-white">QuantumRepo</span>
            )}
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-4 p-4">
          <Link
            href="/dashboard"
            className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors justify-center"
          >
            <FaTachometerAlt size={28} />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/dashboard/repositories"
            className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors justify-center"
          >
            <FaBook size={28} />
            {isOpen && <span>Repositories</span>}
          </Link>
          <Link
            href="/dashboard/activity"
            className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors justify-center"
          >
            <FaClipboardList size={28} />
            {isOpen && <span>Activity</span>}
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors justify-center"
          >
            <FaCog size={28} />
            {isOpen && <span>Settings</span>}
          </Link>
        </nav>
      </aside>
    </>
  );
}
