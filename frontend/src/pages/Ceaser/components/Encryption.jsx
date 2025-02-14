import axios from "axios";
import { useState } from "react";

function Encryption({ ciphertext,setCiphertext }) {

  const [plaintext, setPlaintext] = useState("");
  const [shift, setShift] = useState(0);

  const handleEncrypt = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/caesar/encrypt",
        {
          plaintext,
          shift,
        }
      );
      setCiphertext(response.data.ciphertext);
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Plaintext
        </label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shift Value
        </label>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleEncrypt}
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
    </div>
  );
}

export default Encryption;