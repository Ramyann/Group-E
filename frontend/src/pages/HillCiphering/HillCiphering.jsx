import { useState } from "react";
import MenuBar from "../../components/MenuBar";
import Encryption from "./Components/Encryption";
import Decryption from "./Components/Decryption";
import Hint from "../../components/Hint";
import Cryptoanalysis from "./Components/Cryptoanalysis";

function HillCiphering() {
  const [processType, setProcessType] = useState("encryption");

  return (
    <div className="bg-blue-400 h-[80%] p-6 rounded-lg shadow-md w-[65%] overflow-hidden">
      <span className="flex items-center gap-x-4  mb-8">
        <h2 className="text-3xl font-bold text-white ">Hill Ciphering</h2>
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
          cryptoanalysis: true,
          bruteForce: false,
        }}
      />

      {processType == "encryption" ? (
        <Encryption />
      ) : processType == "decryption" ? (
        <Decryption />
      ) : processType == "cryptoanalysis" ? (
        <Cryptoanalysis />
      ) : (
        ""
      )}
    </div>
  );
}

export default HillCiphering;
