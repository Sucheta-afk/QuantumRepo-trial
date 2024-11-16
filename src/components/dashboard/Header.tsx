import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import useCheckAuth from "@/utils/checkAuth";
import { auth } from "@/utils/firebase"; 
import { useRouter } from "next/navigation";

export default function Header() {

  const router = useRouter();

  const API_URL = typeof window !== "undefined" ? window.location.origin : "";

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const { user, isAuthenticated } = useCheckAuth(); // Using custom hook for auth

  // Fetch profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user) {
        try {
          const response = await axios.get(`${API_URL}/api/user/profile-img?firebaseUid=${user.uid}`);
          setProfileImage(response.data.avatarUrl);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };

    fetchProfileImage();
  }, [user, API_URL]);

  // Toggle profile dropdown
  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handle logout action
  const handleLogout = () => {
    auth.signOut().then(() => {
      router.push("/")
    });
  };

  // Toggle search bar on mobile
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return null; // Ensure header doesn't render if the user isn't authenticated
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      {/* Search Input */}
      <div
        className={`flex items-center transition-all duration-300 ${
          isSearchOpen ? "w-full" : "w-1/3"
        }`}
      >
        <div className="flex items-center w-full sm:w-auto">
          {isSearchOpen ? (
            <input
              type="text"
              placeholder="Search Quantum Repo"
              className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          ) : (
            <button
              className="text-gray-300 p-2 rounded-md hover:bg-gray-600"
              onClick={toggleSearch}
            >
              <FaSearch className="text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Icon and Dropdown */}
      <div className="relative">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 cursor-pointer"
            onClick={handleProfileClick}
          >
            ?
          </div>
        )}
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10"
            ref={profileMenuRef}
          >
            <button
              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-t-md"
              onClick={() => console.log("Profile clicked")}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-b-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
