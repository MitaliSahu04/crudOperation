import { useForm } from "react-hook-form";

import { useEffect } from "react";

import Layout from "../../../components/Layout";

import api from "../../../lib/axios";

import toast from "react-hot-toast";
import { Router } from "next/router";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      Router.push("/login");
    }
  }, []);

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

      formData.append(
        "image",
        data.image[0]
      );

      await api.post(
        "/products",
        formData
      );

      toast.success(
        "Product created"
      );
      Router.push("/products");
    } catch (error) {
      toast.error(
        "Create failed"
      );
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-sm max-w-2xl"
      >
        <h1 className="text-4xl font-bold mb-8">
          Create Product
        </h1>

        <input
          placeholder="Product Name"
          className="w-full border p-4 rounded-xl mb-4"
          {...register("name")}
        />

        <input
          placeholder="Price"
          type="number"
          className="w-full border p-4 rounded-xl mb-4"
          {...register("price")}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-4 rounded-xl mb-4 h-40"
          {...register("description")}
        />

        <input
          type="file"
          className="w-full border p-4 rounded-xl mb-6"
          {...register("image")}
        />

        <button className="bg-black text-white px-6 py-4 rounded-xl font-semibold">
          Create Product
        </button>
      </form>
    </Layout>
  );
}