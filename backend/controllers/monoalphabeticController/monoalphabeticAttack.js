const attackMonoalphabetic = (req, res, next) => {
  try {
    const { ciphertext } = req.body;

    if (!ciphertext || typeof ciphertext !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid input: ciphertext (string) is required." });
    }

    const alphabet =
      "abcdefghijklmnopqrstuvwxyzçğıöşüêîûñäößàáâéèêëíìîïóòôõúùûüýÿæœ";
    const results = [];
    const possibleKeys = generateAllMonoalphabeticKeys(alphabet);

    for (const key of possibleKeys) {
      const plaintext = decryptText(ciphertext, key);
      results.push({ key, plaintext });
    }

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Error during monoalphabetic attack:", error);
    next
      ? next(error)
      : res
          .status(500)
          .json({ message: "Internal server error during attack." });
  }
};

function generateAllMonoalphabeticKeys(alphabet) {
  const keys = [];
  const chars = alphabet.split("");
  const permutations = permute(chars);

  for (const permutation of permutations) {
    const key = {};
    for (let i = 0; i < chars.length; i++) {
      key[chars[i]] = permutation[i];
    }
    keys.push(key);
  }

  return keys;
}

function permute(arr) {
  const result = [];

  function p(arr, temp) {
    if (arr.length === 0) {
      result.push(temp.slice());
    }

    for (let i = 0; i < arr.length; i++) {
      const newArr = arr.slice(0, i).concat(arr.slice(i + 1));
      const newTemp = temp.concat(arr[i]);
      p(newArr, newTemp);
    }
  }

  p(arr, []);
  return result;
}

function decryptText(ciphertext, key) {
  let plaintext = "";
  for (const char of ciphertext.toLowerCase()) {
    plaintext += key[char] || char;
  }
  return plaintext;
}

module.exports = {
  attackMonoalphabetic,
};