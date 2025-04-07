import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Encryption({ ciphertext, setCiphertext }) {
  const user = useSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    console.log(data)
    try {
      const response = await fetch("http://localhost:5000/api/ceaser/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCiphertext(result.ciphertext);
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Plaintext
        </label>
        <input
          type="text"
          {...register("plaintext", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.plaintext && (
          <span className="text-red-500 text-sm">Plaintext is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shift Value
        </label>
        <input
          type="number"
          {...register("shift", { required: true, valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.shift && (
          <span className="text-red-500 text-sm">Shift is required</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Encrypt
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ciphertext
        </label>
        <input
          type="text"
          value={ciphertext}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
      </div>
    </form>
  );
}

export default Encryption;
