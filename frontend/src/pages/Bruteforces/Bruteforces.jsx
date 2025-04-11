import { useState } from "react";
import MenuBar from "./Components/MenuBar";
import Ceaser from "./Components/Ceaser";
import Monoalphabetic from "./Components/Monoalphabetic";
import Playfair from "./Components/Playfair";
import Hill from "./Components/Hill";

function Bruteforces() {
  const [ciphertext, setCiphertext] = useState("");
  const [processType, setProcessType] = useState("ceaser");

  return (
    <div className="sunrise-color h-[80%] p-6 rounded-lg shadow-md w-[65%] overflow-hidden">
      <h2 className="text-3xl font-bold text-white ">Brute Forces</h2>

      <MenuBar processType={processType} setProcessType={setProcessType} />

      {processType == "ceaser" ? (
        <Ceaser ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : processType == "monoalphabetic" ? (
        <Monoalphabetic ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : processType == "playfair" ? (
        <Playfair ciphertext={ciphertext} setCiphertext={setCiphertext} />
      ) : (
        <Hill ciphertext={ciphertext} setCiphertext={setCiphertext} />
      )}
    </div>
  );
}

export default Bruteforces;
