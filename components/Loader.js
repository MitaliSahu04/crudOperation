// frontend/components/Loader.js

export default function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
}