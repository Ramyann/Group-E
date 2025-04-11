const Bruteforce = require("../../models/bruteforceModel");

const getCeaserUsers = async (req, res) => {
  try {
    const users = await Bruteforce.find({ encryption_algorithm: "ceaser" }).select("email");
    res.status(200).json({ users });
  } catch (error) {
    console.error("error fetching Ceaser users", error);
    res.status(400).json({ message: error.message });
  }
};


// Decrypt a string using byte-wise Caesar shift
const encryptAlphabet = (shift) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const shifted = alphabet
    .split("")
    .map((_, i) => alphabet[(i + shift) % 26])
    .join("");
  return shifted;
};


// Brute-force attack endpoint
const caesarBruteforce = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Bruteforce.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const encryptedPassword = user.password;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let shift = 1; shift <= 25; shift++) {
      const attempt = encryptAlphabet(shift);

      if (attempt.toLowerCase() === encryptedPassword.toLowerCase()) {
        return res.status(200).json({
          message: "Password decrypted",
          shift,
          decrypted: alphabet,
          encrypted: attempt,
          user: {
            email: user.email,
          },
        });
      }
    }

    return res.status(400).json({ message: "No matching Caesar shift found" });
  } catch (error) {
    console.error("Error during Caesar brute-force:", error);
    return res.status(500).json({
      message: "Internal server error during Caesar attack.",
    });
  }
};


module.exports = { caesarBruteforce, getCeaserUsers };
