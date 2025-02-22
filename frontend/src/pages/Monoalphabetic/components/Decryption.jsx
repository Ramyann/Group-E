import axios from "axios";
import { useState } from "react";

function Decryption({ plaintext, setPlaintext }) {
  const [ciphertext, setCiphertext] = useState("");
  const [shift, setShift] = useState(0);

  const handleDecrypt = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/monoalphabetic/decrypt", {
        ciphertext,
        shift,
      });
      console.log(response.data)
      setPlaintext(response?.data?.plaintext);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white">Ciphertext</label>
        <input
          type="text"
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Shift Value</label>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleDecrypt}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Decrypt
      </button>
      <div>
        <label className="block text-sm font-medium text-white">Plaintext</label>
        <input
          type="text"
          value={plaintext}
          readOnly
          className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
      </div>
    </div>
  );
}

export default Decryption;