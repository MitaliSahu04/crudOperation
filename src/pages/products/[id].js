import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import api from "../../../lib/axios";
import { useRouter } from "next/router";

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const res = await api.get(
      `/products/${id}`
    );

    setProduct(res.data);
  };

  if (!product)
    return (
      <div className="text-center py-20 text-3xl font-bold">
        Loading...
      </div>
    );

  return (
    <Layout>
      <div className="bg-white p-8 rounded-2xl shadow-sm max-w-4xl mx-auto">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL.replace(
            "/api",
            ""
          )}/uploads/${product.image}`}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        <h1 className="text-5xl font-bold mb-4">
          {product.name}
        </h1>

        <p className="text-3xl text-gray-600 mb-6">
          ${product.price}
        </p>

        <p className="text-lg text-gray-700 leading-8">
          {product.description}
        </p>
      </div>
    </Layout>
  );
}