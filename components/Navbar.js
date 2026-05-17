import { useEffect, useState } from "react";

import { getUser } from "../lib/auth";

export default function Navbar() {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const currentUser = getUser();

    setUser(currentUser);
  }, []);

  return (
    <div className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold capitalize">
            {user?.role || "Guest"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.id
              ? user.id.slice(0, 8)
              : "No ID"}
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold uppercase">
          {user?.role?.charAt(0) || "G"}
        </div>
      </div>
    </div>
  );
}