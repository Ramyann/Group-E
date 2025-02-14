function MenuBar({processType, setProcessType }) {


  return (
    <ul className="flex justify-around w-[70%] text-center m-auto p-4 dark-color1 rounded-lg font-bold text-md">
      <li
        onClick={(e) => {
          setProcessType("encryption");
        }}
        className={`cursor-pointer p-2 rounded-md w-42 ${processType === 'encryption' ? 'text-white' : ''}`}
      >
        Encryption
      </li>

      <li
        onClick={(e) => {
          setProcessType("decryption");
        }}
        className={`cursor-pointer  p-2 rounded-md  w-42 ${processType === 'decryption' ? 'text-white' : ''}`}
      >
        Decryption
      </li>

      <li
        onClick={(e) => {
          setProcessType("brute-force");
        }}
        className={`cursor-pointer  p-2 rounded-md w-42 ${processType === 'brute-force' ? 'text-white' : ''}`}
      >
        Brute-Force Attack
      </li>
    </ul>
  );
}

export default MenuBar;
