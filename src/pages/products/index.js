import { useEffect, useState } from "react";

import Link from "next/link";

import Layout from "../../../components/Layout";

import api from "../../../lib/axios";
import { getUser } from "../../../lib/auth";

import toast from "react-hot-toast";

import {
  FaBoxOpen,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [user, setUser] =
  useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    fetchProducts();
  }, [page, search]);
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products?page=${page}&search=${search}`
      );

      setProducts(res.data.products);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete product?")) return;

    try {
      await api.delete(`/products/${id}`);

      toast.success("Product deleted");

      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              Products
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your products
            </p>
          </div>

          {user?.role === "admin" && (
            <Link href="/products/create">
              <button className="bg-black text-white px-6 py-3 rounded-xl">
                Add Product
              </button>
            </Link>
          )}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 p-3 pl-12 rounded-xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="text-2xl font-semibold">
              Loading Products...
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-14 rounded-2xl shadow-sm text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-6 rounded-full">
                <FaBoxOpen
                  size={50}
                  className="text-gray-500"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              No Products Yet
            </h2>

            <p className="text-gray-500 mb-8">
              Start by creating your first
              product.
            </p>

            <Link href="/products/create">
              <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition">
                Create Product
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
                >
                  <div className="mb-5">

                    <img
                    src={`http://backendforcrude.onrender.com/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-xl mb-5"
                  />
                    <h2 className="text-2xl font-bold">
                      {product.name}
                    </h2>

                    <p className="text-green-600 font-semibold text-lg mt-2">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3 leading-7">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/products/${product._id}`}
                    >
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        View
                      </button>
                    </Link>

                   {user?.role === "admin" && (
                      <Link
                        href={`/products/edit/${product._id}`}
                      >
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                          Edit
                        </button>
                      </Link>
                    )}

                   {user?.role === "admin" && (
                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-5 mt-12">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
                className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
              >
                Previous
              </button>

              <div className="bg-white px-6 py-3 rounded-xl shadow-sm font-semibold">
                Page {page} of {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage(page + 1)
                }
                className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}