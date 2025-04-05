import { useState } from "react";
import Hint from "../../components/Hint";
import MenuBar from "../../components/MenuBar";
import Encryption from "./components/Encryption";
import Decryption from "./components/Decryption";
import BruteForce from "../Ceaser/components/BruteForce";

function Monoalphabetic({}) {
  const [ciphertext, setCiphertext] = useState("");

  const [processType, setProcessType] = useState("encryption");

  return (
    <div className="dark-color2 h-[80%] p-6 rounded-lg shadow-md w-[65%] overflow-hidden">
      <span className="flex items-center gap-x-4  mb-4">
        <h2 className="text-3xl font-bold text-white ">
          Monoalphabetic Cipher
        </h2>
        <Hint
          longText={`The Monoalphabetic Cipher is a classic encryption technique where each letter in the plaintext is replaced by a fixed, unique letter from the alphabet. Unlike the Caesar Cipher, which uses a uniform shift for all letters, the monoalphabetic cipher employs a scrambled or randomly rearranged alphabet for substitution. For example, if "A" is mapped to "Q," "B" to "W," and "C" to "E," the word "ABC" would encrypt to "QWE." This method offers more complexity than the Caesar Cipher because the substitution pattern is not based on a simple shift. However, despite its increased complexity, the monoalphabetic cipher is still vulnerable to cryptanalysis, particularly through frequency analysis, which exploits the predictable frequency of letters in a language (e.g., "E" is the most common letter in English). While it was a significant improvement over simpler ciphers, modern encryption methods have far surpassed its security.`}
        />
      </span>

      <MenuBar processType={processType} setProcessType={setProcessType} />

      {processType == "encryption" ? (
        <Encryption ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : processType == "decryption" ? (
        <Decryption ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : (
        ""
        // <BruteForce ciphertext={ciphertext} setCiphertext={setCiphertext} />
      )}
    </div>
  );
}

export default Monoalphabetic;
