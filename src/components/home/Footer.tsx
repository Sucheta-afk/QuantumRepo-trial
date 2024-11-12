import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="hover:text-gray-400 transition">Features</Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-gray-400 transition">Explore</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gray-400 transition">Pricing</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-400 transition">About</Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-400 transition">About Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-400 transition">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
  <Link href="#" className="hover:text-gray-400 transition">
    <FaFacebookF />
  </Link>
  <Link href="#" className="hover:text-gray-400 transition">
    <FaTwitter />
  </Link>
  <Link href="#" className="hover:text-gray-400 transition">
    <FaGithub />
  </Link>
</div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} QuantumRepo, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
