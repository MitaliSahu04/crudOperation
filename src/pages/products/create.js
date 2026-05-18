// frontend/pages/products/create.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import api from '../../../services/api';
export default function CreateProduct() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState('');

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
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

      const data = new FormData();

      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);

      if (image) {
        data.append('image', image);
      }

      await api.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product created successfully');

      router.push('/products');
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          'Failed to create product'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-5">
        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Create Product
            </h1>

            <p className="text-gray-500 mt-2">
              Add a new product to your store
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Product Title */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.title && (
                <p className="text-red-500 mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                placeholder="Enter product price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.price && (
                <p className="text-red-500 mt-1">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full"
              />

              {/* Image Preview */}
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="preview"
                    className="h-52 w-full object-cover rounded-xl border"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-lg text-white font-semibold ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/products')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}