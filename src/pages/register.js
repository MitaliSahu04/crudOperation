// frontend/pages/register.js

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../../services/api';

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.password.length < 6) {
      newErrors.password =
        'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post('/auth/register', formData);

      alert('Registration successful');

      router.push('/login');
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center px-20">
        <h1 className="text-6xl text-color font-bold leading-tight mb-6 text-white">
          Create
          <br />
          Account
        </h1>

        <p className="text-xl text-color text-gray-300 leading-relaxed">
          Register to access your dashboard,
          products, and CRUD management
          system.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">
              Register
            </h2>

            <p className="text-gray-500">
              Create your new account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:border-black"
              />

              {errors.name && (
                <p className="text-red-500 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:border-black"
              />

              {errors.email && (
                <p className="text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:border-black"
              />

              {errors.password && (
                <p className="text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold text-lg ${
                loading
                  ? 'bg-gray-400 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading
                ? 'Creating Account...'
                : 'Register'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}