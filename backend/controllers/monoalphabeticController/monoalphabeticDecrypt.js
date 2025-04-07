const decryptMonoalphabetic = async (req, res) => {
  const { inputText, mappings } = req.body;

  try {
    // Build reverse mapping from substituted letter → original letter
    const reverseKeys = {};
    for (const [original, substitute] of Object.entries(mappings)) {
      if (substitute) {
        reverseKeys[substitute.toLowerCase()] = original.toLowerCase();
      }
    }

    let plaintext = "";
    for (const char of inputText) {
      const lowerChar = char.toLowerCase();
      const isLetter = lowerChar >= "a" && lowerChar <= "z";

      if (isLetter) {
        const originalChar = reverseKeys[lowerChar];

        if (originalChar !== undefined) {
          const wasUpper = char !== lowerChar;
          plaintext += wasUpper
            ? originalChar.toUpperCase()
            : originalChar.toLowerCase();
        } else {
          plaintext += char; // unmapped letter
        }
      } else {
        plaintext += char; // non-letter
      }
    }

    res.status(200).json({ plaintext });
  } catch (error) {
    console.error("Monoalphabetic decryption error:", error.message);
    res.status(500).json({ mssg: "Internal server error during decryption." });
  }
};

module.exports = {
  decryptMonoalphabetic,
};