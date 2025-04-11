function MenuBar({ processType, setProcessType }) {
  return (
    <ul className="flex justify-around w-[70%] text-center m-auto p-2 dark-color1 rounded-lg font-bold text-md">
      <li
        onClick={(e) => {
          setProcessType("ceaser");
        }}
        className={`cursor-pointer p-2 rounded-md w-42 ${
          processType === "encryption" ? "text-white" : ""
        }`}
      >
        Ceaser
      </li>

      <li
        onClick={(e) => {
          setProcessType("monoalphabetic");
        }}
        className={`cursor-pointer  p-2 rounded-md  w-42 ${
          processType === "decryption" ? "text-white" : ""
        }`}
      >
        Monoalphabetic
      </li>

      <li
        onClick={(e) => {
          setProcessType("Playfair");
        }}
        className={`cursor-pointer  p-2 rounded-md w-42 ${
          processType === "cryptoanalysis" ? "text-white" : ""
        }`}
      >
        Playfair
      </li>

      <li
        onClick={(e) => {
          setProcessType("Hill Ciphering");
        }}
        className={`cursor-pointer  p-2 rounded-md w-42 ${
          processType === "brute-force" ? "text-white" : ""
        }`}
      >
        Hill Ciphering
      </li>
    </ul>
  );
}

export default MenuBar;
