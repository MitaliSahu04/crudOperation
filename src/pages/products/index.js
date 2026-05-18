// frontend/pages/products/index.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import Loader from '../../../components/Loader';
import api from '../../../services/api';

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products?search=${search}&page=${page}`
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert('Delete failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Products
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your products easily
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => router.push('/products/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold mb-2">
              No Products Found
            </h2>

            <p className="text-gray-500 mb-5">
              Start by creating your first product.
            </p>

            <button
              onClick={() => router.push('/products/create')}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Create Product
            </button>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  {/* Product Image */}
                  {product.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.title}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">
                        No Image
                      </span>
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="p-5">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {product.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    <p className="text-2xl font-bold text-blue-600 mb-5">
                      ${product.price}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          router.push(`/products/${product._id}`)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          router.push(
                            `/products/edit/${product._id}`
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white'
                }`}
              >
                Previous
              </button>

              <span className="font-semibold">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-lg ${
                  page === totalPages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}