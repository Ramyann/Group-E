import { useState } from "react";
import MenuBar from "../../components/MenuBar";
import Hint from "../../components/Hint";
import Encryption from "./components/Encryption";

function DES() {

  const [processType, setProcessType] = useState("encryption");

  return (
    <div className="sunrise-color h-[80%] p-6 rounded-lg shadow-md w-[65%] overflow-hidden">
      <span className="flex items-center gap-x-4  mb-8">
        <h2 className="text-3xl font-bold text-white ">DES</h2>
        <Hint
          longText={`The Data Encryption Standard (DES) is a symmetric-key algorithm used for encrypting digital data. It works by taking a 64-bit block of plaintext and processing it through 16 rounds of permutation and substitution using a 56-bit key. Originally developed by IBM and adopted as a federal standard in the 1970s, DES was widely used for securing sensitive information. However, due to its relatively short key length, it is now considered insecure against brute-force attacks
`}
        />
      </span>

      <MenuBar
        processType={processType}
        setProcessType={setProcessType}
        processes={{
          encryption: true,
          decryption: false,
          cryptoanalysis: false,
          bruteForce: false,
        }}
      />

      {processType == "encryption" ? (
        <Encryption  />
      ) : (
        ""
      )}
    </div>
  );
}

export default DES;
