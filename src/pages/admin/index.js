import { useEffect } from "react";

import { useRouter } from "next/router";

import Layout from "../../../components/Layout";

import { getUser } from "../../../lib/auth";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (user?.role !== "admin") {
      router.push("/products");
    }
  }, []);

  return (
    <Layout>
       <ProtectedRoute adminOnly>
      <div className="bg-white p-10 rounded-2xl shadow-sm">
        <h1 className="text-5xl font-bold mb-5">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 text-xl">
          Only admins can access this
          page.
        </p>
      </div>
      </ProtectedRoute>
    </Layout>
  );
}