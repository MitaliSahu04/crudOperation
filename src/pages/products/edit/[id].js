// frontend/pages/products/edit/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Navbar from '../../../../components/Navbar';
import Loader from '../../../../components/Loader';

import api from '../../../../services/api';

export default function EditProduct() {
  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState('');

  // Fetch Product
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setProduct({
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
      });

      if (res.data.image) {
        setPreview(
          `https://backendforcrude.onrender.com/uploads/${res.data.image}`
        );
      }
    } catch (error) {
      console.log(error);

      alert('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Image
  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('title', product.title);
      formData.append(
        'description',
        product.description
      );
      formData.append('price', product.price);

      if (image) {
        formData.append('image', image);
      }

      await api.put(
        `/products/${id}`,
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      alert('Product updated successfully');

      router.push('/products');
    } catch (error) {
      console.log(error);

      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            {/* Image */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Product Image
              </label>

              <input
                type="file"
                onChange={handleImage}
                className="w-full"
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 h-60 rounded-xl object-cover"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Update Product
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push('/products')
                }
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
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