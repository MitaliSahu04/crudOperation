import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBox,
  FaHome,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };
    return (
    <div className="w-64 bg-black text-white min-h-screen p-5 hidden md:block">
      <h1 className="text-2xl font-bold mb-10">
        CRUD APP
      </h1>

      <div className="space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <FaHome />
          Dashboard
        </Link>
         <Link
          href="/products"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <FaBox />
          Products
        </Link>

        <Link
          href="/products/create"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <FaPlus />
          Add Product
        </Link>

         <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded hover:bg-red-600 w-full text-left"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}