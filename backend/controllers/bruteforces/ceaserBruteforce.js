const Bruteforce = require("../../models/bruteforceModel");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// Utility function to decrypt a string using Caesar cipher
const decryptCaesar = (text, shift) => {
  return text
    .split("")
    .map((char) => {
      const isUpperCase = char === char.toUpperCase();
      const lowerChar = char.toLowerCase();
      const index = ALPHABET.indexOf(lowerChar);

      if (index === -1) return char; // Non-alphabetic characters remain unchanged

      const shiftedIndex = (index - shift + 26) % 26;
      const decryptedChar = ALPHABET[shiftedIndex];
      return isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
    })
    .join("");
};

// Get users with Caesar encryption
const getCaesarUsers = async (req, res) => {
  try {
    const users = await Bruteforce.find({
      encryption_algorithm: "caesar",
    }).select("email");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching Caesar users:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
};

// Brute-force attack endpoint
const caesarBruteforce = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    const user = await Bruteforce.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const encryptedPassword = user.password;

    for (let shift = 1; shift <= 25; shift++) {
      const decryptedPassword = decryptCaesar(encryptedPassword, shift);

      if (decryptedPassword.toLowerCase() === encryptedPassword.toLowerCase()) {
        return res.status(200).json({
          success: true,
          message: "Password decrypted successfully.",
          shift,
          decryptedPassword,
          user: { email: user.email },
        });
      }
    }

    return res
      .status(400)
      .json({ success: false, message: "No matching Caesar shift found." });
  } catch (error) {
    console.error("Error during Caesar brute-force:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error during Caesar attack.",
      });
  }
};

module.exports = { caesarBruteforce, getCaesarUsers };
