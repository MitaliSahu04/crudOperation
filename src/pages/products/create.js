import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import Layout from "../../../components/Layout";

import api from "../../../lib/axios";
import { getUser } from "../../../lib/auth";

import toast from "react-hot-toast";

export default function CreateProduct() {
  const router = useRouter();

  const [preview, setPreview] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const {
    register,
    handleSubmit,
  } = useForm();

  useEffect(() => {
  const user = getUser();

  if (user?.role !== "admin") {
    router.push("/products");
  }
}, []);

  const handleImage = (e) => {
    const selected =
      e.target.files[0];

    setFile(selected);

    setPreview(
      URL.createObjectURL(selected)
    );
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

      if (file) {
        formData.append(
          "image",
          file
        );
      }

      await api.post(
        "/products",
        formData
      );

      toast.success(
        "Product created"
      );

      router.push("/products");
    } catch (error) {
      toast.error(
        "Failed to create product"
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-4xl font-bold mb-8 text-color">
          Create Product
        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <input
            placeholder="Product Name"
            className="w-full border p-4 rounded-xl mb-5 text-color"
            {...register("name")}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-4 rounded-xl mb-5 text-color"
            {...register("price")}
          />

          <textarea
            rows="5"
            placeholder="Description"
            className="w-full border p-4 rounded-xl mb-5 text-color"
            {...register(
              "description"
            )}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mb-6 text-color"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-xl mb-6"
            />
          )}

          <button className="bg-black text-white px-8 py-4 rounded-xl">
            Create Product
          </button>
        </form>
      </div>
    </Layout>
  );
}