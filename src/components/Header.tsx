import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full fixed top-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <Image src="/assets/github-logo.png" alt="GitHub Logo" width={32} height={32} />
          <nav className="hidden md:flex space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-black">Features</Link>
            <Link href="/explore" className="text-gray-600 hover:text-black">Explore</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-black">Pricing</Link>
          </nav>
        </div>
        <div className="flex space-x-4">
          <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign In</Link>
          <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
