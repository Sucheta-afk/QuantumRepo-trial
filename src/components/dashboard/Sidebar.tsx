import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-6 border-r border-gray-700">
      <div className="flex items-center gap-3 mb-10">
        <Image src="/assets/logo.jpg" alt="QuantumRepo Logo" className="rounded-full w-10 h-10" width={40} height={40} />
        <span className="text-2xl font-bold text-white">QuantumRepo</span>
      </div>

      <nav className="space-y-4 text-lg">
        <Link href="/dashboard" className="block text-gray-400 hover:text-white">
          Dashboard
        </Link>
        <Link href="/dashboard/repositories" className="block text-gray-400 hover:text-white">
          Repositories
        </Link>
      </nav>
    </aside>
  );
}
