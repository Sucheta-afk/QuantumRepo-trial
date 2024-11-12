import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full fixed top-0 bg-gray-800 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/logo.jpg"
            alt="QuantumRepo Logo"
            className="rounded-full"
            width={40}
            height={40}
          />
          <h1 className="text-white font-semibold text-lg md:text-xl">
            QuantumRepo
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/features" className="text-white hover:text-gray-300">
            Features
          </Link>
          <Link href="/explore" className="text-white hover:text-gray-300">
            Explore
          </Link>
          <Link href="/pricing" className="text-white hover:text-gray-300">
            Pricing
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Actions */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/auth/login"
            className="text-green-500 border border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link
              href="/features"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="/explore"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              href="/pricing"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={toggleMenu}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
