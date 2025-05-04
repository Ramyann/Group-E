import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Encryption({ ciphertext, setCiphertext }) {
  const user = useSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const { plaintext, key } = data;

    if (plaintext.length !== 8) {
      setError("plaintext", { message: "Plaintext must be exactly 8 characters" });
      return;
    }

    if (key.length !== 8) {
      setError("key", { message: "Key must be exactly 8 characters" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/des/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ plaintext, key }),
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
          Plaintext (8 characters)
        </label>
        <input
          type="text"
          maxLength={8}
          {...register("plaintext", { required: "Plaintext is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.plaintext && (
          <span className="text-red-500 text-sm">{errors.plaintext.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Key (8 characters)
        </label>
        <input
          type="text"
          maxLength={8}
          {...register("key", { required: "Key is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.key && (
          <span className="text-red-500 text-sm">{errors.key.message}</span>
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
