const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Caesar Cipher Encryption
app.post("/api/caesar/encrypt", (req, res) => {
  const { plaintext, shift } = req.body;
  const ciphertext = caesarEncrypt(plaintext, shift);
  res.json({ ciphertext });
});

// Caesar Cipher Decryption
app.post("/api/caesar/decrypt", (req, res) => {
  const { ciphertext, shift } = req.body;
  const plaintext = caesarDecrypt(ciphertext, shift);
  res.json({ plaintext });
});

// Caesar Cipher Brute Force Attack
app.post("/api/caesar/attack", (req, res) => {
  const { ciphertext } = req.body;
  const results = caesarAttack(ciphertext);
  res.json({ results });
});

// Monoalphabetic Cipher Encryption
app.post("/api/monoalphabetic/encrypt", (req, res) => {
  const { plaintext, shift } = req.body;
  const ciphertext = monoalphabeticEncrypt(plaintext, shift);
  res.json({ ciphertext });
});

// Monoalphabetic Cipher Decryption
app.post("/api/monoalphabetic/decrypt", (req, res) => {
  const { ciphertext, shift } = req.body;
  const plaintext = monoalphabeticDecrypt(ciphertext, shift);
  res.json({ plaintext });
});

// Monoalphabetic Cipher Frequency Analysis
app.post("/api/monoalphabetic/analyze", (req, res) => {
  const { ciphertext } = req.body;
  const analysis = frequencyAnalysisAttack(ciphertext);
  res.json(analysis);
});

// Caesar Cipher Functions
function caesarEncrypt(plaintext, shift) {
  return plaintext
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode((charCode + shift) % 256);
    })
    .join("");
}

function caesarDecrypt(ciphertext, shift) {
  let plaintext = '';
  for (let i = 0; i < ciphertext.length; i++) {
    const charCode = ciphertext.charCodeAt(i);
    const decryptedCharCode = (charCode - shift + 256) % 256;
    plaintext += String.fromCharCode(decryptedCharCode);
  }
  return plaintext;
}

function caesarAttack(ciphertext, dictionary = null) {
  const results = [];
  let bestShift = -1;
  let bestPlaintext = '';
  let maxScore = -Infinity;

  for (let shift = 0; shift < 256; shift++) {
    const plaintext = caesarDecrypt(ciphertext, shift);
    results.push({ shift, plaintext });

    if (dictionary) {
      const words = plaintext.toLowerCase().split(/\W+/).filter(word => word.length > 0);
      const score = words.reduce((acc, word) => acc + (dictionary.has(word) ? 1 : 0), 0);
      
      if (score > maxScore || (score === maxScore && shift < bestShift)) {
        maxScore = score;
        bestShift = shift;
        bestPlaintext = plaintext;
      }
    }
  }

  return dictionary ? { bestShift, bestPlaintext, allResults: results } : results;
}

// Monoalphabetic Cipher Functions
function monoalphabeticEncrypt(plaintext, shift) {

  const substitutionMap = createSubstitutionMap(shift);
  let ciphertext = "";
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    const encryptedChar = substitutionMap[char] || char; // Use the mapped character or the original if not in the map
    ciphertext += encryptedChar;
  }

  return ciphertext;
}

function monoalphabeticDecrypt(ciphertext, shift) {

  const inverseSubstitutionMap = createInverseSubstitutionMap(shift);
  let plaintext = "";
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    const decryptedChar = inverseSubstitutionMap[char] || char; // Use the mapped character or original if not in map
    plaintext += decryptedChar;
  }
  
  return plaintext;
}

// Helper Functions
function createSubstitutionMap(shift) {
  const substitutionMap = {};
  const printableAsciiRange = 256; // All ASCII characters (0-255)

  for (let i = 0; i < printableAsciiRange; i++) {
    const char = String.fromCharCode(i);
    const shiftedCharCode = (i + shift) % printableAsciiRange; // Apply shift and wrap around
    substitutionMap[char] = String.fromCharCode(shiftedCharCode);
  }

  return substitutionMap;
}

function createInverseSubstitutionMap(shift) {
  const inverseSubstitutionMap = {};
  const printableAsciiRange = 256; // All ASCII characters (0-255)
  
  for (let i = 0; i < printableAsciiRange; i++) {
    const shiftedCharCode = (i + shift) % printableAsciiRange;
    const char = String.fromCharCode(shiftedCharCode);
    const originalChar = String.fromCharCode(i);
    inverseSubstitutionMap[char] = originalChar;
  }
  
  return inverseSubstitutionMap;
}

function analyzeFrequency(text) {
  const frequencies = {};
  const totalChars = text.length;
  
  // Count character frequencies
  for (let char of text) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  
  // Convert counts to percentages
  Object.keys(frequencies).forEach(char => {
    frequencies[char] = (frequencies[char] / totalChars) * 100;
  });
  
  return frequencies;
}

function frequencyAnalysisAttack(ciphertext) {
  const frequencies = analyzeFrequency(ciphertext);
  
  // Common English letter frequencies
  const englishFrequencies = {
    'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0,
    'N': 6.7, 'S': 6.3, 'H': 6.1, 'R': 6.0, 'D': 4.3
  };
  
  // Sort both frequency distributions
  const sortedCipherFreq = Object.entries(frequencies)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  
  const sortedEnglishFreq = Object.entries(englishFrequencies)
    .sort(([,a], [,b]) => b - a);
  
  // Create possible mapping based on frequency analysis
  const possibleMapping = {};
  sortedCipherFreq.forEach((([cipherChar], index) => {
    possibleMapping[cipherChar] = sortedEnglishFreq[index][0];
  }));
  
  return {
    frequencies,
    possibleMapping,
    sortedFrequencies: sortedCipherFreq
  };
}

// Dictionary for Caesar cipher attack (can be expanded)
const dictionary = new Set(["hello", "world", "test", "secret", "message"]);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});