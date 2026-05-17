import { useForm } from "react-hook-form";

import api from "../../lib/axios";

import toast from "react-hot-toast";
import { Router } from "next/router";

export default function Login() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/auth/login",
        data
      );

     console.log(res.data.token);
      localStorage.setItem(
        "token",
        res.data.token
      );

      Router.push("/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-4 rounded-xl mb-4"
          {...register("email")}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-4 rounded-xl mb-6"
          {...register("password")}
        />

        <button className="w-full bg-black text-white py-4 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}