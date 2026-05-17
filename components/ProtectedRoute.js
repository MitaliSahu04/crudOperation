import { useEffect } from "react";

import { useRouter } from "next/router";

import {
  useAuth,
} from "./AuthProvider";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  useEffect(() => {
    if (loading) return;

    if (
      adminOnly &&
      user.role !== "admin"
    ) {
      router.replace("/products");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  if (
    adminOnly &&
    user.role !== "admin"
  ) {
    return null;
  }

  return children;
}