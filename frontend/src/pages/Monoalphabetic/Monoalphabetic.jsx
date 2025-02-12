import { useState } from "react";
import axios from "axios";

function Monoalphabetic({}) {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [shift, setShift] = useState(0);
  const [decryptedText, setDecryptedText] = useState("");

  const handleEncrypt = async () => {
    try {
      const response = await axios.post("/api/monoalphabetic/encrypt", {
        plaintext,
        shift,
      });
      setCiphertext(response.data.ciphertext);
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await axios.post("/api/monoalphabetic/decrypt", {
        ciphertext,
        shift,
      });
      setDecryptedText(response.data.plaintext);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[80%] ">
      <h2 className="text-2xl font-semibold mb-4">Monoalphabetic Cipher</h2>
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
    </div>
  );
}

export default Monoalphabetic;
