import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">
        CRUD APP
      </h1>

      <div className="flex flex-col gap-4">
        <Link href="/products">
          <div className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer">
            Products
          </div>
        </Link>

        <Link href="/products/create">
          <div className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer">
            Add Product
          </div>
        </Link>
      </div>
    </div>
  );
}