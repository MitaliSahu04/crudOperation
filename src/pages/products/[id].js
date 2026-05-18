// frontend/pages/products/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Navbar from '../../../components/Navbar';
import Loader from '../../../components/Loader';

import api from '../../../services/api';

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products/${id}`);

      setProduct(res.data);
    } catch (error) {
      console.log(error);

      alert('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            {product?.image ? (
              <img
                src={`https://backendforcrude.onrender.com/uploads/${product.image}`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full min-h-[400px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product?.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {product?.description}
            </p>

            <p className="text-5xl font-bold text-blue-600 mb-8">
              ${product?.price}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  router.push(`/products/edit/${product._id}`)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
              >
                Edit Product
              </button>

              <button
                onClick={() =>
                  router.push('/products')
                }
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}