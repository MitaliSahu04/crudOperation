import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "../../../components/Layout";
import api from "../../../lib/axios";
import { getUser } from "../../../lib/auth";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaDollarSign,
  FaEdit,
} from "react-icons/fa";

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] =
  useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-2xl font-semibold">
            Loading Product...
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
          <h1 className="text-3xl font-bold mb-3">
            Product Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            The requested product does not exist.
          </p>

          <Link href="/products">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Back to Products
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/products">
            <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md">
              <FaArrowLeft />

              Back
            </button>
          </Link>
          
          {user?.role === "admin" && (
          <Link href={`/products/edit/${product._id}`}>
            <button className="flex items-center  gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800">
              <FaEdit />

              Edit Product
            </button>
          </Link>
        )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-black text-white p-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <FaBoxOpen size={30} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  Added By:
                  {" "}
                  {product?.name}
                </h1>

                <p className="text-gray-300 mt-2">
                  Product Details Overview
                </p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <img
                  src={`http://backendforcrude.onrender.com/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full max-w-md rounded-2xl mb-8"
                />
                <div className="flex items-center gap-3 mb-4">
                  <FaDollarSign className="text-green-600" />

                  <h2 className="text-xl font-semibold">
                    Price
                  </h2>
                </div>

                <p className="text-4xl font-bold text-green-600">
                  ${product.price}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-semibold mb-4">
                  Product ID
                </h2>

                <p className="text-gray-600 break-all">
                  {product._id}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Description
              </h2>

              <p className="text-gray-700 leading-8">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">
                  Created At
                </h3>

                <p className="text-gray-600">
                  {new Date(
                    product.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">
                  Updated At
                </h3>

                <p className="text-gray-600">
                  {new Date(
                    product.updatedAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}