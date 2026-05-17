import { useEffect, useState } from "react";

import Link from "next/link";

import Layout from "../../../components/Layout";

import api from "../../../lib/axios";

import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      Router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/products?page=${page}&search=${search}`
      );

      setProducts(res.data.products);

      setTotalPages(
        res.data.totalPages
      );
    } catch (error) {
      toast.error(
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete product?"))
      return;

    try {
      await api.delete(
        `/products/${id}`
      );

      toast.success(
        "Product deleted"
      );

      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <Link href="/products/create">
            <button className="bg-black text-white px-6 py-3 rounded-xl">
              Add Product
            </button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border p-3 rounded-lg"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {loading ? (
          <div className="text-center text-3xl font-bold py-20">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL.replace(
                    "/api",
                    ""
                  )}/uploads/${product.image}`}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                <h2 className="text-2xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-gray-500 mb-3">
                  ${product.price}
                </p>

                <p className="text-gray-600 mb-5 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    href={`/products/${product._id}`}
                  >
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      View
                    </button>
                  </Link>

                  <Link
                    href={`/products/edit/${product._id}`}
                  >
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-3 mt-10">
          {[...Array(totalPages)].map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setPage(index + 1)
                }
                className={`px-4 py-2 rounded-lg ${
                  page === index + 1
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}