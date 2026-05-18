// frontend/pages/dashboard.js

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

import { useAuth } from '../../context/AuthContext';

import api from '../../services/api';

export default function Dashboard() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [products, setProducts] = useState([]);

  const [pageLoading, setPageLoading] =
    useState(true);

  // Protect Route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  // Loader
  if (loading || pageLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-md p-10 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left */}
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Welcome,
                <span className="ml-3">
                  {user?.name}
                </span>
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                Manage your products, create
                new inventory, update product
                details, and monitor your CRUD
                application dashboard.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() =>
                    router.push('/products')
                  }
                  className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800"
                >
                  View Products
                </button>

                <button
                  onClick={() =>
                    router.push(
                      '/products/create'
                    )
                  }
                  className="border border-black px-8 py-4 rounded-2xl hover:bg-black hover:text-white"
                >
                  Create Product
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="bg-gray-100 rounded-3xl p-8 min-w-[300px]">
              <h2 className="text-3xl font-bold mb-6">
                Account Info
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-gray-500 mb-1">
                    Full Name
                  </p>

                  <h3 className="text-xl font-bold">
                    {user?.name}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">
                    Email Address
                  </p>

                  <h3 className="text-xl font-bold">
                    {user?.email}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">
                    Role
                  </p>

                  <h3 className="text-xl font-bold capitalize">
                    {user?.role || 'User'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold">
                Recent Products
              </h2>

              <p className="text-gray-500 mt-2">
                Latest products from your
                database
              </p>
            </div>

            <button
              onClick={() =>
                router.push('/products')
              }
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
            >
              See All
            </button>
          </div>

          {/* Empty State */}
          {products.length === 0 ? (
            <div className="bg-gray-100 rounded-2xl p-16 text-center">
              <h2 className="text-3xl font-bold mb-4">
                No Products Found
              </h2>

              <p className="text-gray-600 mb-8">
                Start by creating your first
                product.
              </p>

              <button
                onClick={() =>
                  router.push(
                    '/products/create'
                  )
                }
                className="bg-black text-white px-8 py-4 rounded-2xl"
              >
                Create Product
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products
                .slice(0, 6)
                .map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl"
                  >
                    {/* Image */}
                    {product.image ? (
                      <img
                        src={`https://backendforcrude.onrender.com/uploads/${product.image}`}
                        alt={product.title}
                        className="w-full h-60 object-cover"
                      />
                    ) : (
                      <div className="h-60 bg-gray-200 flex justify-center items-center">
                        <span className="text-gray-500">
                          No Image
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3">
                        {product.title}
                      </h3>

                      <p className="text-gray-600 mb-5 line-clamp-3">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <h4 className="text-3xl font-bold">
                          $
                          {product.price}
                        </h4>

                        <button
                          onClick={() =>
                            router.push(
                              `/products/${product._id}`
                            )
                          }
                          className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}