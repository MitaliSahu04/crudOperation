import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import api from "../../../lib/axios";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
   useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data.products);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
   const deleteProduct = async (id) => {
    if (!confirm("Delete product?")) return;

    try {
      await api.delete(`/products/${id}`);

      toast.success("Product deleted");

      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <Layout>
      <div>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <Link href="/products/create">
            <button className="bg-black text-white px-5 py-3 rounded-lg">
              Add Product
            </button>
          </Link>
        </div>
         <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border p-3 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl">
            Loading...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No Products Found
            </h2>
            <p className="text-gray-500">
              Create your first product.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {product.name}
                    </h2>
                     <p className="text-gray-500 mt-1">
                      ${product.price}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-5 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex gap-3">
                  <Link href={`/products/${product._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      View
                    </button>
                  </Link>

                  <Link href={`/products/edit/${product._id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
              </div>
    </Layout>
  );
}