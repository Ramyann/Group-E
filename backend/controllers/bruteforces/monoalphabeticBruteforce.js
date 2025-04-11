const Bruteforce = require('../../models/bruteforceModel')
const mongoose = require('mongoose')

const getMonoalphabeticUsers = async (req,res) =>{
   try {
     const users = await Bruteforce.find({ encryption_algorithm: "monoalphabetic" });
     res.status(200).json({ users });
   } catch (error) {
     console.error("error fetching Ceaser users", error);
     res.status(400).json({ message: error.message });
   }
}

// Generate all permutations (⚠️ factorial time!)
const permute = (str) => {
  if (str.length <= 1) return [str];
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    for (const sub of permute(remaining)) {
      result.push(char + sub);
    }
  }

  return result;
};


const monoalphabeticBruteforce = (req, res) => {
  try {
    const { ciphertext, limit = 10, charsetLength = 6 } = req.body;

    const charset = "abcdefghijklmnopqrstuvwxyz".slice(0, charsetLength);
    const permutations = permute(charset);
    const possiblePlaintexts = [];

    for (let p of permutations.slice(0, limit)) {
      let map = {};
      for (let i = 0; i < charset.length; i++) {
        map[charset[i]] = p[i];
      }

      const decrypted = [...ciphertext]
        .map((char) => map[char.toLowerCase()] || char)
        .join("");
      possiblePlaintexts.push(decrypted);
    }

    return res.status(200).json({ plaintexts: possiblePlaintexts });
  } catch (error) {
    console.error("Brute-force error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { monoalphabeticBruteforce,getMonoalphabeticUsers };