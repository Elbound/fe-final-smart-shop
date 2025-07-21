'use client';
import { useRouter } from 'next/navigation';
import { Home, ShoppingCart, History, User } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <button onClick={() => router.push('/')} className="flex items-center gap-2">
        <img src="/asset/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
        <span className="text-xl font-bold text-blue-600">Smart Shop</span>
      </button>
      <div className="flex gap-6 items-center">
        <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-blue-500">
          <Home size={20} /> Home
        </button>

        <button onClick={() => router.push('/dashboard/customer')} className="flex items-center gap-1 hover:text-blue-500">
          <ShoppingCart size={20} /> Cart
        </button>

        <button onClick={() => router.push('/history')} className="flex items-center gap-1 hover:text-blue-500">
          <History size={20} /> History
        </button>

        <button onClick={() => router.push('/login')} className="flex items-center gap-1 hover:text-blue-500">
          <User size={20} /> Login
        </button>
      </div>
    </nav>
  );
}
//testing navbar