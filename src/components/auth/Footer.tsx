import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-20 text-center text-sm">
      <ul className="footer-links flex justify-center space-x-4">
        <li>
          <Link href="/contact" className="text-blue-500 hover:underline">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/pricing" className="text-blue-500 hover:underline">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/api" className="text-blue-500 hover:underline">
            API
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-blue-500 hover:underline">
            About
          </Link>
        </li>
      </ul>
      <p className="text-gray-500 mt-4">&copy; {new Date().getFullYear()} QuantumRepo, Inc.</p>
    </footer>
  );
};

export default Footer;
