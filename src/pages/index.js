import Link from "next/link";

import {
  FaArrowRight,
  FaBoxOpen,
  FaLock,
  FaServer,
  FaDatabase,
} from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            CRUD Dashboard
          </h1>

          <div className="flex gap-4">
            <Link href="/login">
              <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="border border-white px-5 py-2 rounded-xl font-semibold hover:bg-white hover:text-black transition">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-black font-semibold mb-4 uppercase tracking-widest">
              Full Stack CRUD Application
            </p>

            <h1 className="text-6xl font-bold leading-tight mb-8">
              Modern Product
              <span className="block text-gray-500">
                Management Dashboard
              </span>
            </h1>

            <p className="text-gray-600 text-xl leading-10 mb-10">
              Build and manage products using
              secure JWT authentication,
              Express APIs, MongoDB database,
              and a responsive Next.js admin
              panel.
            </p>

            <div className="flex gap-5 flex-wrap">
              <Link href="/register">
                <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-gray-800 transition">
                  Get Started

                  <FaArrowRight />
                </button>
              </Link>

              <Link href="/products">
                <button className="bg-white px-8 py-4 rounded-2xl font-semibold shadow hover:shadow-lg transition">
                  View Products
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <FaLock size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                JWT Authentication
              </h2>

              <p className="text-gray-600 leading-8">
                Secure login and registration
                system using JWT tokens and
                bcrypt password hashing.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <FaBoxOpen size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                CRUD Operations
              </h2>

              <p className="text-gray-600 leading-8">
                Create, update, delete, and
                manage products with a clean
                admin dashboard UI.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <FaServer size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Express Backend
              </h2>

              <p className="text-gray-600 leading-8">
                RESTful APIs built with Express
                and modular backend
                architecture.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <FaDatabase size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                MongoDB Database
              </h2>

              <p className="text-gray-600 leading-8">
                Cloud database integration using
                MongoDB Atlas and Mongoose ODM.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20 mt-10">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Manage Products?
          </h2>

          <p className="text-gray-300 text-xl leading-10 mb-10">
            Start building your modern CRUD
            dashboard application with secure
            authentication and scalable backend
            architecture.
          </p>

          <Link href="/register">
            <button className="bg-white text-black px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-gray-200 transition">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}