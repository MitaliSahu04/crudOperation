export default function Navbar() {
  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </div>
  );
}