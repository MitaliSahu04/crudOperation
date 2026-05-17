import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import api from "../../../../lib/axios";
import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaDollarSign,
  FaEdit,
  FaFileAlt,
} from "react-icons/fa";
import { getUser } from "../../../../lib/auth";

export default function EditProduct() {
  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
   const [preview, setPreview] =useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);


  useEffect(() => {
  const user = getUser();

 
}, []);
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      reset(res.data);
    } catch (error) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

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

    formData.append("name", data.name);

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

    await api.put(
      `/products/${id}`,
      formData
    );

    toast.success(
      "Product updated"
    );
  } catch (error) {
    toast.error(
      "Update failed"
    );
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-color">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-2">
              Update product information
            </p>
          </div>

          <Link href="/products">
            <button className="text-color flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md">
              <FaArrowLeft />

              Back
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-black text-white p-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <FaEdit size={30} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Edit Product Details
                </h2>

                <p className="text-gray-300 mt-1">
                  Modify and save product changes
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8"
          >
            <div className="mb-6">
              <label className="flex items-center gap-2 font-semibold mb-3 text-color">
                <FaBoxOpen />

                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                className="w-full text-color border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-black"
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
              <label className="flex items-center gap-2 font-semibold mb-3 text-color">
               

                Product Price
              </label>

              <input
                type="number"
                placeholder="Enter product price"
                className="w-full text-color border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-black"
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
              <label className="flex items-center gap-2 font-semibold mb-3 text-color">
                <FaFileAlt />

                Description
              </label>

              <textarea
                rows="6"
                placeholder="Enter product description"
                className="w-full text-color border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-black"
                {...register("description")}
              />
            </div>
                <div className="flex gap-4 text-color ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="mb-6"
                />
                </div>
             

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
               
                Update Product
              </button>

              <button
                type="button"
                onClick={() => router.push("/products")}
                className="bg-gray-200 px-8 text-color py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
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