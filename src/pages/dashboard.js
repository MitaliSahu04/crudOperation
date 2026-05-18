// frontend/pages/dashboard.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const router = useRouter();

  const { user, loading } = useAuth();

  // Protect Route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  // Loading State
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name}
          </h1>

          <p className="text-lg opacity-90">
            Manage your products and monitor your dashboard.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-gray-500 text-lg mb-2">
              Total Products
            </h2>

            <p className="text-4xl font-bold text-blue-600">
              120
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-gray-500 text-lg mb-2">
              Active Users
            </h2>

            <p className="text-4xl font-bold text-green-600">
              45
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-gray-500 text-lg mb-2">
              Revenue
            </h2>

            <p className="text-4xl font-bold text-purple-600">
              $12K
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push('/products')}
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
              onClick={() => router.push('/profile')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
            >
              Profile
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="font-semibold">
                New Product Added
              </p>

              <p className="text-gray-500 text-sm">
                Product added successfully to inventory
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="font-semibold">
                User Logged In
              </p>

              <p className="text-gray-500 text-sm">
                Admin logged into dashboard
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Product Updated
              </p>

              <p className="text-gray-500 text-sm">
                Product details updated successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}