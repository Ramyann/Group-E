function MenuBar({ processType, setProcessType, processes }) {
  const { encryption, decryption, cryptoanalysis, bruteForce } = processes;
  return (
    <ul className="flex justify-around w-[70%] text-center m-auto p-2 dark-color1 rounded-lg font-bold text-md">
      {encryption && (
        <li
          onClick={(e) => {
            setProcessType("encryption");
          }}
          className={`cursor-pointer p-2 rounded-md w-42 ${
            processType === "encryption" ? "text-white" : ""
          }`}
        >
          Encryption
        </li>
      )}

      {decryption && (
        <li
          onClick={(e) => {
            setProcessType("decryption");
          }}
          className={`cursor-pointer  p-2 rounded-md  w-42 ${
            processType === "decryption" ? "text-white" : ""
          }`}
        >
          Decryption
        </li>
      )}

      {cryptoanalysis && (
        <li
          onClick={(e) => {
            setProcessType("cryptoanalysis");
          }}
          className={`cursor-pointer  p-2 rounded-md w-42 ${
            processType === "cryptoanalysis" ? "text-white" : ""
          }`}
        >
          Crypto Analysis
        </li>
      )}

      {bruteForce && (
        <li
          onClick={(e) => {
            setProcessType("brute-force");
          }}
          className={`cursor-pointer  p-2 rounded-md w-42 ${
            processType === "brute-force" ? "text-white" : ""
          }`}
        >
          Brute-Force Attack
        </li>
      )}
    </ul>
  );
}

export default MenuBar;
