const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

function generateMatrix(key) {
  key = key
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace(/J/g, "I");
  let matrix = [];
  let seen = new Set();

  for (let char of key + "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
    if (!seen.has(char)) {
      seen.add(char);
      matrix.push(char);
    }
  }

  const table = [];
  for (let i = 0; i < 5; i++) table.push(matrix.slice(i * 5, i * 5 + 5));
  return table;
}

function preprocess(text) {
  text = text
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace(/J/g, "I");

  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += text[i];
    if (text[i] === text[i + 1]) {
      result += "X"; // Insert 'X' if two same letters appear together
    }
  }

  if (result.length % 2 !== 0) result += "X"; // Ensure even length
  return result.match(/.{1,2}/g); // Break into pairs
}

function preprocessForDecryption(text) {
  return text
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace(/J/g, "I")
    .match(/.{1,2}/g);
}


function findPosition(matrix, char) {
  for (let i = 0; i < 5; i++) {
    let j = matrix[i].indexOf(char);
    if (j !== -1) return [i, j];
  }
  return null;
}

function encryptPlayfair(req, res) {
  const { plaintext, key } = req.body;

  try {
    // generate a matrix of the key
    const matrix = generateMatrix(key);

    // modify the plaintext: i -> j , remove non alphabet characters, make pairs
    const pairs = preprocess(plaintext);

    let result = "";
    for (let [a, b] of pairs) {
      let [r1, c1] = findPosition(matrix, a);
      let [r2, c2] = findPosition(matrix, b);

      // the purpose of %5 is, for in case we have two letters next to
      // each other and they are last two letters in the row so if they are
      // in the same row then we have to take next letter in the right,
      // but since it's the last letter so we have to go back to the first letter
      // (4+1) = 5 that's wrong
      // (4+1) %5 = 0 this one is right

      if (r1 === r2) {
        result += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
      } else if (c1 === c2) {
        result += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
      } else {
        result += matrix[r1][c2] + matrix[r2][c1];
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

function decryptPlayfair(req, res) {
  let { ciphertext, key } = req.body;

  if (!ciphertext || !key) {
    return res.status(400).json({ error: "Ciphertext and key are required." });
  }

  key = key
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  const matrix = generateMatrix(key);
  const pairs = preprocessForDecryption(ciphertext);

  if (!pairs) {
    return res.status(400).json({ error: "Invalid ciphertext format." });
  }

  let result = "";

  for (let [a, b] of pairs) {
    const [r1, c1] = findPosition(matrix, a);
    const [r2, c2] = findPosition(matrix, b);

    if (r1 === r2) {
      result += matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5];
    } else if (c1 === c2) {
      result += matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2];
    } else {
      result += matrix[r1][c2] + matrix[r2][c1];
    }
  }

  res.status(200).json({ plaintext: result });
}


function bruteforcePlayfair(ciphertext, keylistPath, res) {
  const keyList = fs
    .readFileSync(keylistPath, "utf-8")
    .split("\n")
    .map((key) => key.trim());

  let found = false;

  for (let key of keyList) {
    const decrypted = decryptPlayfair(ciphertext, key);
    const decryptedText = decrypted
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .trim();

    found = true;
    return res.status(200).json({
      key: key,
      plaintext: decryptedText,
    });
  }

  if (!found) {
    return res.status(400).json({ error: "No valid decryption found." });
  }
}

function cryptoanalysisPlayfair(req, res) {
  const { ciphertext } = req.body;

  let output = "";
  let errorOutput = "";

  const python = spawn("python", [path.join(__dirname, "playfair_breaker.py")]);
  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0 || errorOutput) {
      return res
        .status(500)
        .json({ error: "Python error", details: errorOutput });
    }

    const parts = output.trim().split("\n");
    if (parts.length === 2) {
      const key = parts[0].replace("Key: ", "").trim();
      const plaintext = parts[1].replace("Plaintext: ", "").trim();

      res.status(200).json({ key, plaintext });
    } else {
      res.status(400).json({ error: "No valid decryption found." });
    }
  });

  python.stdin.write(ciphertext + "\n");
  python.stdin.end();
}

module.exports = {
  encryptPlayfair,
  bruteforcePlayfair,
  cryptoanalysisPlayfair,
  decryptPlayfair,
};
