import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-6">
        CRUD Application
      </h1>

      <p className="text-xl mb-10">
        Next.js + Express + MongoDB
      </p>

      <div className="flex gap-5">
        <Link href="/login">
          <button className="bg-white text-black px-6 py-3 rounded-xl">
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className="border border-white px-6 py-3 rounded-xl">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}