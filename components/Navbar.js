// frontend/components/Navbar.js

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const router = useRouter();

  const { user, logout } = useAuth();

  // Logout Function
  const handleLogout = () => {
    logout();

    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => router.push('/dashboard')}
            className="cursor-pointer"
          >
            <h1 className="text-3xl font-bold text-blue-600">
              CRUD App
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`font-medium transition ${
                router.pathname === '/dashboard'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/products"
              className={`font-medium transition ${
                router.pathname === '/products'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Products
            </Link>

            <Link
              href="/products/create"
              className={`font-medium transition ${
                router.pathname === '/products/create'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Add Product
            </Link>

            <Link
              href="/profile"
              className={`font-medium transition ${
                router.pathname === '/profile'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* User Name */}
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.name}
                  </p>

                  <p className="text-sm text-gray-500 capitalize">
                    {user?.role || 'user'}
                  </p>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden justify-between mt-4 border-t pt-4">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            href="/products/create"
            className="text-gray-700 hover:text-blue-600"
          >
            Add
          </Link>

          <Link
            href="/profile"
            className="text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}