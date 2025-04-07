import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Decryption({ ciphertext, setCiphertext }) {
  const user = useSelector((state) => state.user.user);
  const [decryptedText, setDecryptedText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ciphertext: ciphertext || "",
      shift: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/ceaser/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ciphertext: data.ciphertext,
          shift: Number(data.shift),
        }),
      });

      const result = await response.json();
      setDecryptedText(result.plaintext);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ciphertext
        </label>
        <input
          type="text"
          {...register("ciphertext", { required: true })}
          onChange={(e) => setCiphertext(e.target.value)}
          value={ciphertext}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
        {errors.ciphertext && (
          <span className="text-red-500 text-sm">Ciphertext is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shift
        </label>
        <input
          type="number"
          {...register("shift", { required: true, valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
        />
        {errors.shift && (
          <span className="text-red-500 text-sm">Shift is required</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Decrypt
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Decrypted Text
        </label>
        <input
          type="text"
          value={decryptedText}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
      </div>
    </form>
  );
}

export default Decryption;
