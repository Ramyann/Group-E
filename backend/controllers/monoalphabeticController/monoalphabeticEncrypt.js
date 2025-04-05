const encryptMonoalphabetic = async (req, res) => {
  const { plainText, keys } = req.body;

  try {
    let ciphertext = "";
    for (const originalChar of plainText) {
      const lowerChar = originalChar.toLowerCase();
      const isBasicLetter = lowerChar >= "a" && lowerChar <= "z";

      if (isBasicLetter) {
        const mappedChar = keys[lowerChar];

        if (mappedChar !== undefined && mappedChar !== null) {
          const wasUpperCase = originalChar !== lowerChar;
          ciphertext += wasUpperCase
            ? String(mappedChar).toUpperCase()
            : String(mappedChar).toLowerCase();
        } else {
          ciphertext += originalChar;
        }
      } else {
        ciphertext += originalChar;
      }
    }
    res.status(200).json({ ciphertext: ciphertext });
  } catch (error) {
    console.error("monoalphabetic encryption error: ", error.message);
    res.status(500).json({ mssg: "Internal server error during encryption." });
  }
};

module.exports = {
  encryptMonoalphabetic,
};