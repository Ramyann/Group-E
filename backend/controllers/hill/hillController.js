// Helper: Convert letter matrix (e.g. [['A','B'],['C','D']]) to numbers
const letterMatrixToNumbers = (letterMatrix) => {
  return letterMatrix.map((row) =>
    row.map((ch) => {
      const code = ch.toUpperCase().charCodeAt(0);
      if (code < 65 || code > 90)
        throw new Error("Matrix must contain only A-Z.");
      return code - 65;
    })
  );
};

// text -> matrix
const textToMatrix = (text, size) => {
  const nums = text
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .map((char) => char.charCodeAt(0) - 97);

  while (nums.length % size !== 0) nums.push(23);

  const matrix = [];
  for (let i = 0; i < nums.length; i += size) {
    matrix.push(nums.slice(i, i + size));
  }
  return matrix;
};

// matrix -> text
const matrixToText = (matrix) => {
  return matrix
    .flat()
    .map((num) => String.fromCharCode((num % 26) + 97))
    .join("");
};

const matrixMultiplyMod = (matA, matB, mod) => {
  const result = [];
  for (let i = 0; i < matA.length; i++) {
    result[i] = [];
    for (let j = 0; j < matB[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matB.length; k++) {
        sum += matA[i][k] * matB[k][j];
      }
      result[i][j] = ((sum % mod) + mod) % mod;
    }
  }
  return result;
};

const matrixInverseMod = (matrix, mod) => {
  const det = matrixDeterminantMod(matrix, mod);
  const detInv = modInverse(det, mod);
  const adj = matrixAdjugateMod(matrix, mod);
  return adj.map((row) =>
    row.map((val) => (((val * detInv) % mod) + mod) % mod)
  );
};

const matrixDeterminantMod = (matrix, mod) => {
  const n = matrix.length;

  const det2 = (m) => m[0][0] * m[1][1] - m[0][1] * m[1][0];

  const det3 = (m) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

  const getMinor = (m, row, col) =>
    m.filter((_, i) => i !== row).map((r) => r.filter((_, j) => j !== col));

  if (n === 1) return ((matrix[0][0] % mod) + mod) % mod;
  if (n === 2) return ((det2(matrix) % mod) + mod) % mod;
  if (n === 3) return ((det3(matrix) % mod) + mod) % mod;
  if (n === 4) {
    let det = 0;
    for (let j = 0; j < 4; j++) {
      const sign = j % 2 === 0 ? 1 : -1;
      const minor = getMinor(matrix, 0, j);
      const cofactor = sign * matrix[0][j] * det3(minor);
      det += cofactor;
    }
    return ((det % mod) + mod) % mod;
  }

  throw new Error("Only 2x2, 3x3, or 4x4 matrices are supported.");
};

const modInverse = (a, m) => {
  a = ((a % m) + m) % m;

  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error(
    `Modular inverse does not exist for determinant ${a} mod ${m}. Matrix is not invertible.`
  );
};

const matrixAdjugateMod = (matrix, mod) => {
  const n = matrix.length;

  const getMinor = (m, row, col) =>
    m.filter((_, i) => i !== row).map((r) => r.filter((_, j) => j !== col));

  const cofactorMatrix = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const minor = getMinor(matrix, i, j);
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      cofactorMatrix[i][j] = sign * matrixDeterminantMod(minor, mod);
    }
  }

  // Transpose and mod
  const adjugate = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      adjugate[i][j] = ((cofactorMatrix[j][i] % mod) + mod) % mod;
    }
  }

  return adjugate;
};

const gcd = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

// P = K⁻¹ × C mod 26
const hillDecrypt = async (req, res) => {
  const { ciphertext, keyLetters } = req.body;

  try {
    const keyMatrix = letterMatrixToNumbers(keyLetters);
    const m = keyLetters.length;
    const blocks = textToMatrix(ciphertext, m);

    const inverseKey = matrixInverseMod(keyMatrix, 26);

    const decrypted = blocks.map((block) => {
      const result = matrixMultiplyMod([block], inverseKey, 26);
      return result[0];
    });

    const plaintext = matrixToText(decrypted);
    res.status(200).json({ plaintext });
  } catch (error) {
    console.error("Decryption error:", error);
    res.status(400).json({ message: error.message });
  }
};

// C = K × P mod 26
const hillEncrypt = async (req, res) => {
  const { plaintext, keyLetters } = req.body;

  try {
    const keyMatrix = letterMatrixToNumbers(keyLetters);
    const m = keyMatrix.length;
    const blocks = textToMatrix(plaintext, m);

    const encrypted = blocks.map((block) => {
      const result = matrixMultiplyMod([block], keyMatrix, 26);
      return result[0];
    });

    const ciphertext = matrixToText(encrypted);
    res.status(200).json({ ciphertext });
  } catch (error) {
    console.error("Encryption error:", error);
    res.status(400).json({ message: error.message });
  }
};

const hillCryptoanalysis = async (req, res) => {
  try {
    res.status(200).json({
      message:
        "Cryptoanalysis of Hill cipher requires known plaintext-ciphertext pairs. Not feasible here without more data.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error during cryptoanalysis." });
  }
};

module.exports = {
  hillEncrypt,
  hillDecrypt,
  hillCryptoanalysis,
};
