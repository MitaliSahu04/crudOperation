import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import Link from "next/link";

import api from "../../lib/axios";

import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/auth/register",
        data
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Registration successful");

      router.push("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-center px-20">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Create Account
        </h1>

        <p className="text-gray-300 text-xl leading-10">
          Build and manage products with a
          professional admin dashboard and
          secure authentication system.
        </p>

        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>

            <p>JWT Secure Authentication</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>

            <p>Modern CRUD Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>

            <p>Responsive Admin Experience</p>
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
              <FaUserPlus size={32} />
            </div>

            <h2 className="text-4xl font-bold">
              Register
            </h2>

            <p className="text-gray-500 mt-3">
              Create your new account
            </p>
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-3">
              Full Name
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-5 text-gray-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-black"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-3">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-5 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-black"
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
            <label className="block font-semibold mb-3">
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
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
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
            Create Account
          </button>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-black font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}