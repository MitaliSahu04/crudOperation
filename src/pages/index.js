// frontend/pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-black">
            CRUD App
          </h1>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link href="/login">
              <button className="bg-black text-color px-5 py-2 rounded-lg hover:bg-gray-800">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="border border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white">
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl font-bold leading-tight mb-6 text-black">
              Full Stack
              <br />
              CRUD Application
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Build and manage products using
              Next.js, Node.js, Express.js,
              MongoDB, JWT Authentication,
              Tailwind CSS, and full CRUD
              operations.
            </p>

            <div className="flex gap-5">
              <Link href="/login">
                <button className="bg-black text-color px-8 py-4 rounded-xl text-lg ">
                  Get Started
                </button>
              </Link>

              <Link href="/products">
                <button className="border border-black px-8 py-4 rounded-xl text-lg  hover:text-white">
                  View Products
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="grid grid-cols-2 gap-6">
              {/* Card */}
              <div className="bg-gray-100 p-6 rounded-2xl">
                <h2 className="text-4xl font-bold mb-2">
                  JWT
                </h2>

                <p className="text-gray-600">
                  Secure Authentication
                </p>
              </div>

              {/* Card */}
              <div className="bg-gray-100 p-6 rounded-2xl">
                <h2 className="text-4xl font-bold mb-2">
                  CRUD
                </h2>

                <p className="text-gray-600">
                  Full Operations
                </p>
              </div>

              {/* Card */}
              <div className="bg-gray-100 p-6 rounded-2xl">
                <h2 className="text-4xl font-bold mb-2">
                  API
                </h2>

                <p className="text-gray-600">
                  REST Backend
                </p>
              </div>

              {/* Card */}
              <div className="bg-gray-100 p-6 rounded-2xl">
                <h2 className="text-4xl font-bold mb-2">
                  UI
                </h2>

                <p className="text-gray-600">
                  Responsive Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Application Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">
              Authentication
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Secure login and registration using
              JWT authentication and bcrypt
              password hashing.
            </p>
          </div>

          {/* Feature */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">
              Product Management
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Add, edit, delete, and manage
              products with image upload support.
            </p>
          </div>

          {/* Feature */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">
              Responsive UI
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Modern responsive design built using
              Tailwind CSS for all devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}