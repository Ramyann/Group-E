import { useState } from "react";
import MenuBar from "../../components/MenuBar";
import Encryption from "./components/Encryption";
import Decryption from "./components/Decryption";
import BruteForce from "./components/BruteForce";
import Hint from "../../components/Hint";

function Ceaser({}) {
  const [ciphertext, setCiphertext] = useState("");

  const [processType, setProcessType] = useState("encryption");

  return (
    <div className="sunrise-color h-[80%] p-6 rounded-lg shadow-md w-[65%] overflow-hidden">
      <span className="flex items-center gap-x-4  mb-8">
        <h2 className="text-3xl font-bold text-white ">Caesar Cipher</h2>
        <Hint
          longText={`The Caesar Cipher is a simple encryption method where each letter in the plaintext is shifted by a fixed number down or up the alphabet. For example, with a shift of 3, "A" becomes "D", "B" becomes "E", and so on. Named after Julius Caesar, who used it for secret communication, it's easy to implement but also easy to break using modern techniques like frequency analysis.`}
        />
      </span>

      <MenuBar
        processType={processType}
        setProcessType={setProcessType}
        processes={{
          encryption: true,
          decryption: true,
          cryptoanalysis: false,
          bruteForce: false,
        }}
      />

      {processType == "encryption" ? (
        <Encryption ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : (
        <Decryption ciphertext={ciphertext} setCiphertext={setCiphertext} />
      )}
    </div>
  );
}

export default Ceaser;
