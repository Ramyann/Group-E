import { useState } from "react";
import axios from "axios";

function Ceaser({}) {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [shift, setShift] = useState(0);
  const [decryptedText, setDecryptedText] = useState("");
  const [attackResults, setAttackResults] = useState([]);

  const handleEncrypt = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/caesar/encrypt", {
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
      const response = await axios.post("http://localhost:5000/api/caesar/decrypt", {
        ciphertext,
        shift,
      });
      setDecryptedText(response.data.plaintext);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };

  const handleAttack = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/caesar/attack", { ciphertext });
      setAttackResults(response.data.results);
    } catch (error) {
      console.error("Attack error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[80%] ">
      <h2 className="text-2xl font-semibold mb-4">Caesar Cipher</h2>
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

        <button
          onClick={handleAttack}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Brute Force Attack
        </button>

        {attackResults.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Attack Results</h3>
            <ul className="space-y-2">
              {attackResults.map((result, index) => (
                <li key={index} className="text-sm text-gray-700">
                  Shift {result.shift}: {result.plaintext}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ceaser;