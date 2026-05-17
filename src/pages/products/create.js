import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import api from "../../../lib/axios";

import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaDollarSign,
  FaFileAlt,
} from "react-icons/fa";

import Link from "next/link";

export default function CreateProduct() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/products", data);

      toast.success("Product created successfully");

      router.push("/products");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Create Product
            </h1>

            <p className="text-gray-500 mt-2">
              Add a new product to your inventory
            </p>
          </div>

          <Link href="/products">
            <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md">
              <FaArrowLeft />

              Back
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-black text-white p-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <FaBoxOpen size={30} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Product Information
                </h2>

                <p className="text-gray-300 mt-1">
                  Fill all required product details
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8"
          >
            <div className="mb-6">
              <label className="flex items-center gap-2 font-semibold mb-3">
                <FaBoxOpen />

                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-black"
                {...register("name", {
                  required: "Product name is required",
                })}
              />

              {errors.name && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 font-semibold mb-3">
                <FaDollarSign />

                Product Price
              </label>

              <input
                type="number"
                placeholder="Enter product price"
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-black"
                {...register("price", {
                  required: "Price is required",
                })}
              />

              {errors.price && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="flex items-center gap-2 font-semibold mb-3">
                <FaFileAlt />

                Description
              </label>

              <textarea
                rows="6"
                placeholder="Enter product description"
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-black"
                {...register("description")}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Create Product
              </button>

              <button
                type="button"
                onClick={() => router.push("/products")}
                className="bg-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}