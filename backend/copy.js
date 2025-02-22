// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require('dotenv').config()

// const ceaserRoutes = require('./routes/ceaser')

// const app = express();
// app.use(express.json)

// app.use(cors());
// app.use(bodyParser.json());


// app.use('/api/ceaser',ceaserRoutes)

// const letterFrequency = {
//   'a': 8.2, 'b': 1.5, 'c': 2.8, 'd': 4.3, 'e': 12.7,
//   'f': 2.2, 'g': 2.0, 'h': 6.1, 'i': 7.0, 'j': 0.15,
//   'k': 0.77, 'l': 4.0, 'm': 2.4, 'n': 6.7, 'o': 7.5,
//   'p': 1.9, 'q': 0.095, 'r': 6.0, 's': 6.3, 't': 9.1,
//   'u': 2.8, 'v': 0.98, 'w': 2.4, 'x': 0.15, 'y': 2.0, 'z': 0.074
// };

// // Caesar Cipher Encryption
// app.post("/api/caesar/encrypt", (req, res) => {
//   const { plaintext, shift } = req.body;
//   const ciphertext = caesarEncrypt(plaintext, shift);
//   res.json({ ciphertext });
// });

// // Caesar Cipher Decryption
// app.post("/api/caesar/decrypt", (req, res) => {
//   const { ciphertext, shift } = req.body;
//   const plaintext = caesarDecrypt(ciphertext, shift);
//   res.json({ plaintext });
// });

// // Caesar Cipher Brute Force Attack
// app.post("/api/caesar/attack", (req, res) => {
//   try {
//     const { ciphertext } = req.body;

//     // Find the most likely plaintext
//     const result = caesarAttack(ciphertext);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: "Decryption failed" });
//   }
// });

// // Monoalphabetic Cipher Encryption
// app.post("/api/monoalphabetic/encrypt", (req, res) => {
//   const { plaintext, shift } = req.body;
//   const ciphertext = monoalphabeticEncrypt(plaintext, shift);
//   res.json({ ciphertext });
// });

// // Monoalphabetic Cipher Decryption
// app.post("/api/monoalphabetic/decrypt", (req, res) => {
//   const { ciphertext, shift } = req.body;
//   const plaintext = monoalphabeticDecrypt(ciphertext, shift);
//   res.json({ plaintext });
// });



// // Caesar Cipher Functions
// function caesarEncrypt(plaintext, shift) {
//   return plaintext
//     .split("")
//     .map((char) => {
//       const charCode = char.charCodeAt(0); // Get ASCII code of the character
//       return String.fromCharCode((charCode + shift) % 256); // Shift and wrap around using modulo 256
//     })
//     .join("");
// }


// function caesarDecrypt(ciphertext, shift) {
//   return ciphertext
//     .split("")
//     .map((char) => {
//       const charCode = char.charCodeAt(0);
//       return String.fromCharCode((charCode - shift + 256) % 256); // Reverse the shift
//     })
//     .join("");
// }

// function caesarAttack(ciphertext) {
//   const results = [];
//   for (let shift = 0; shift < 256; shift++) { // Try all possible shifts (0-255)
//     const plaintext = caesarDecrypt(ciphertext, shift);
//     results.push({ shift, plaintext });
//   }
//   return results;
// }


// // Monoalphabetic Cipher Functions
// function monoalphabeticEncrypt(plaintext, shift) {
//   return plaintext
//     .split("")
//     .map((char) => {
//       const charCode = char.charCodeAt(0);
//       return String.fromCharCode((charCode + shift) % 256);
//     })
//     .join("");
// }

// function monoalphabeticDecrypt(ciphertext, shift) {
//   return ciphertext
//     .split("")
//     .map((char) => {
//       const charCode = char.charCodeAt(0);
//       return String.fromCharCode((charCode - shift + 256) % 256);
//     })
//     .join("");
// }


// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on http://localhost:${process.env.PORT}`);
// });
