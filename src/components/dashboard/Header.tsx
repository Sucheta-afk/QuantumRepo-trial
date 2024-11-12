import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search Quantum Repo"
        className="w-1/3 px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Image src="/assets/profile-icon.jpg" alt="User Avatar" width={32} height={32} className="rounded-full cursor-pointer" />
    </header>
  );
}
