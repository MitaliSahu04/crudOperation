import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { getUser } from "../lib/auth";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.replace("/login");

      return;
    }

    if (
      adminOnly &&
      user.role !== "admin"
    ) {
      router.replace("/products");

      return;
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return children;
}