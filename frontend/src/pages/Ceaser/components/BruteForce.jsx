import axios from "axios";
import { useState } from "react";

function BruteForce({ ciphertext, setCiphertext }) {
  const [attackResults, setAttackResults] = useState([]);
  const [decryptedText, setDecryptedText] = useState("");

  const handleAttack = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/caesar/attack",
        { ciphertext }
      );

      console.log(response);
      setAttackResults(response.data.results);
    } catch (error) {
      console.error("Attack error:", error);
    }
  };

  console.log(ciphertext);

  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ciphertext
        </label>
        <input
          type="text"
          defaultValue={ciphertext}
          onChange={(e) => {
            setCiphertext(e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
      </div>

      <button
        onClick={handleAttack}
        className="success-color text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Brute Force Attack
      </button>


      {attackResults?.length > 0 && (
        <div className="[&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-42 bg-[#F5F9FC] rounded-md p-2 overflow-x-hidden overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">Attack Results</h3>
          <ul className="space-y-2">
            {attackResults?.map((result, index) => (
              <li key={index} className="text-sm text-gray-700">
                Shift {result.shift}: {result.plaintext}
              </li>
            ))}
          </ul>
        </div>
      )}


      <div>
        <label className="block text-sm font-medium text-gray-700">
          Decrypted Text
        </label>
        <input
          type="text"
          value={decryptedText}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
        />
      </div>
    </div>
  );
}

export default BruteForce;
