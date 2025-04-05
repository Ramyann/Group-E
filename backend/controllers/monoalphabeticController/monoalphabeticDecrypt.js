const { letter: englishFreq } = require("../../languages/english.json");

function analyzeFrequency(text) {
  const freq = {};
  const total = text.replace(/[^a-z]/gi, "").length;

  for (let char of text.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      freq[char] = (freq[char] || 0) + 1;
    }
  }

  for (let char in freq) {
    freq[char] = (freq[char] / total) * 100;
  }

  return freq;
}

function mapCharacters(cipherFreq) {
  const sortedCipher = Object.entries(cipherFreq).sort((a, b) => b[1] - a[1]);
  const sortedEnglish = Object.entries(englishFreq).sort((a, b) => b[1] - a[1]);

  const mapping = {};
  for (let i = 0; i < sortedCipher.length; i++) {
    mapping[sortedCipher[i][0]] = sortedEnglish[i][0];
  }

  return mapping;
}

function decryptMonoalphabetic(req, res) {
  const { ciphertext } = req.body;

  try {
    const cipherFreq = analyzeFrequency(ciphertext);
    const mapping = mapCharacters(cipherFreq);

    const plainText = ciphertext
      .split("")
      .map((char) => {
        const lowerChar = char.toLowerCase();
        if (/[a-z]/.test(lowerChar)) {
          const mappedChar = mapping[lowerChar] || lowerChar;
          return char === lowerChar ? mappedChar : mappedChar.toUpperCase();
        }
        return char;
      })
      .join("");

    res.status(200).json({ plainText, key:mapping });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ mssg: "Error fetching user list from database." });
  }
}

module.exports = { decryptMonoalphabetic };