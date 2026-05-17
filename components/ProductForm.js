export default function ProductForm({
  register,
  handleSubmit,
  onSubmit,
  buttonText,
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Product Name
        </label>
         <input
          {...register("name")}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Price
        </label>

        <input
          type="number"
          {...register("price")}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter product price"
        />
         </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows="5"
          {...register("description")}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter description"
        />
      </div>

      <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
        {buttonText}
      </button>
    </form>
  );
}
