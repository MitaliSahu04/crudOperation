import { useEffect } from "react";

import { useRouter } from "next/router";

import Layout from "../../components/Layout";

import { getUser } from "../../lib/auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push("/login");
    }

    if (user?.role !== "admin") {
      router.push("/products");
    }
  }, []);

  return (
    <Layout>
      <div className="bg-white p-10 rounded-2xl shadow-sm">
        <h1 className="text-5xl font-bold mb-5">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 text-xl">
          Only admins can access this
          page.
        </p>
      </div>
    </Layout>
  );
}