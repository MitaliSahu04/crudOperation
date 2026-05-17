import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import Link from "next/link";

import api from "../../lib/axios";

import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    const res = await api.post(
      "/auth/login",
      data
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    toast.success(
      "Login successful"
    );

    if (
      res.data.user.role === "admin"
    ) {
      router.push("/admin");
    } else {
      router.push("/products");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message
    );
  }
};

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-center px-20">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Welcome Back
        </h1>

        <p className="text-gray-300 text-xl leading-10">
          Manage products, track inventory,
          and control your dashboard with a
          modern CRUD management system.
        </p>

        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>

            <p className="text-color">JWT Authentication</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>

            <p>Secure Product Management</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>

            <p>Responsive Admin Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FaSignInAlt size={32} />
            </div>

            <h2 className="text-4xl font-bold text-color">
              Login
            </h2>

            <p className="text-gray-500 mt-3">
              Sign in to your account
            </p>
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-3 text-color">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-5 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border text-color border-gray-300 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-black"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label className="block font-semibold mb-3 text-color">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-5 text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-black"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-500 mt-8">
            Don&apos;t have an account?{" "}

            <Link
              href="/register"
              className="text-black font-semibold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}