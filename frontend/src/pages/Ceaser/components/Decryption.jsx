import axios from "axios";
import { useState } from "react";

function Decryption({ ciphertext,setCiphertext }) {

  const [decryptedText, setDecryptedText] = useState("");

  const handleDecrypt = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/caesar/decrypt",
        {
          ciphertext,
        //   shift,
        }
      );

      setDecryptedText(response.data.plaintext);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ciphertext
        </label>
        <input
          type="text"
          defaultValue={ciphertext}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
      </div>

      <button
        onClick={handleDecrypt}
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
    </div>
  );
}

export default Decryption;
