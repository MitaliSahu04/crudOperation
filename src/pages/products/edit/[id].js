import { Router, useRouter } from "next/router";

import {
  useEffect,
  useState,
} from "react";

import { useForm } from "react-hook-form";

import Layout from "../../../../components/Layout";

import api from "../../../../lib/axios";

import toast from "react-hot-toast";

export default function EditProduct() {
  const router = useRouter();

  const { id } = router.query;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
     Router.push("/login");
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

    reset(res.data);

    setLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append(
        "name",
        data.name
      );

      formData.append(
        "price",
        data.price
      );

      formData.append(
        "description",
        data.description
      );

      if (data.image[0]) {
        formData.append(
          "image",
          data.image[0]
        );
      }

      await api.put(
        `/products/${id}`,
        formData
      );

      toast.success(
        "Product updated"
      );
      Router.push("/products");
    } catch (error) {
      toast.error(
        "Update failed"
      );
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-3xl font-bold">
        Loading...
      </div>
    );

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-sm max-w-2xl"
      >
        <h1 className="text-4xl font-bold mb-8">
          Edit Product
        </h1>

        <input
          className="w-full border p-4 rounded-xl mb-4"
          {...register("name")}
        />

        <input
          type="number"
          className="w-full border p-4 rounded-xl mb-4"
          {...register("price")}
        />

        <textarea
          className="w-full border p-4 rounded-xl mb-4 h-40"
          {...register("description")}
        />

        <input
          type="file"
          className="w-full border p-4 rounded-xl mb-6"
          {...register("image")}
        />

        <button className="bg-black text-white px-6 py-4 rounded-xl font-semibold">
          Update Product
        </button>
      </form>
    </Layout>
  );
}