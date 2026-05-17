// import { Router } from "next/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    setUser(token);
  }, []);

  return (
    <div className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem(
            "token"
          );

         router.push("/login");
        }}
        className="bg-black text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}