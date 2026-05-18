// frontend/pages/profile.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const router = useRouter();

  const { user, loading, logout } = useAuth();

  // Protect Route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  // Logout Handler
  const handleLogout = () => {
    logout();

    router.push('/login');
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-16 mb-4">
              <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-5xl font-bold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                {user?.name}
              </h1>

              <p className="text-gray-500 text-lg mt-2">
                {user?.email}
              </p>

              <span className="inline-block mt-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                {user?.role || 'User'}
              </span>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Card */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Account Status
                </h2>

                <p className="text-green-600 font-bold">
                  Active
                </p>
              </div>

              {/* Card */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Member Since
                </h2>

                <p className="text-gray-600">
                  2026
                </p>
              </div>

              {/* Card */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Role
                </h2>

                <p className="text-purple-600 font-bold capitalize">
                  {user?.role || 'user'}
                </p>
              </div>

              {/* Card */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Authentication
                </h2>

                <p className="text-blue-600 font-bold">
                  JWT Protected
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  router.push('/products')
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                View Products
              </button>

              <button
                onClick={() =>
                  router.push('/products/create')
                }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
              >
                Add Product
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Extra Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            About This Application
          </h2>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              This is a full-stack CRUD application built
              using Next.js, Node.js, Express.js, MongoDB,
              JWT Authentication, and Tailwind CSS.
            </p>

            <p>
              Features include secure login/register,
              protected routes, CRUD operations, image
              uploads, pagination, search, and role-based
              access control.
            </p>

            <p>
              The application follows modern UI/UX
              practices and responsive design principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}