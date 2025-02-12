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
  return ciphertext
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode((charCode - shift + 256) % 256);
    })
    .join("");
}

function caesarAttack(ciphertext) {
  const results = [];
  for (let shift = 0; shift < 256; shift++) {
    const plaintext = caesarDecrypt(ciphertext, shift);
    results.push({ shift, plaintext });
  }
  return results;
}

// Monoalphabetic Cipher Functions
function monoalphabeticEncrypt(plaintext, shift) {
  return plaintext
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode((charCode + shift) % 256);
    })
    .join("");
}

function monoalphabeticDecrypt(ciphertext, shift) {
  return ciphertext
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode((charCode - shift + 256) % 256);
    })
    .join("");
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
