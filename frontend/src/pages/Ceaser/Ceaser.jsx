import { useState } from "react";
import MenuBar from "../../components/MenuBar";
import Encryption from "./components/Encryption";
import Decryption from "./components/Decryption";
import BruteForce from "./components/BruteForce";

function Ceaser({}) {
  const [ciphertext, setCiphertext] = useState("");

  const [processType, setProcessType] = useState("encryption");

  return (
    <div className="sunrise-color h-[80%] p-6 rounded-lg shadow-md w-[65%] overflow-hidden">
      <h2 className="text-3xl font-bold mb-8 text-white ">Caesar Cipher</h2>

      <MenuBar processType={processType} setProcessType={setProcessType} />

      {processType == "encryption" ? (
        <Encryption ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : processType == "decryption" ? (
        <Decryption ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : (
        <BruteForce ciphertext={ciphertext} setCiphertext={setCiphertext} />
      )}
    </div>
  );
}

export default Ceaser;
