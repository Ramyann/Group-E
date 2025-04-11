const alphabet = "abcdefghijklmnopqrstuvwxyz";

const modInverse = (a, m) => {
  let m0 = m,
    t,
    q;
  let x0 = 0,
    x1 = 1;

  if (m === 1) return 0;

  while (a > 1) {
    q = Math.floor(a / m);
    t = m;
    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) x1 += m0;
  return x1;
};

const determinant = (matrix) => {
  return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
};

const inverseMatrix = (matrix) => {
  const det = determinant(matrix);
  const invDet = modInverse(det, 26);

  if (invDet === -1) return null;
  const adjugate = [
    [matrix[1][1], -matrix[0][1]],
    [-matrix[1][0], matrix[0][0]],
  ];

  return adjugate.map((row) =>
    row.map((element) => (element * invDet + 26) % 26)
  );
};

const multiplyMatrices = (matrixA, matrixB) => {
  const result = [];
  for (let i = 0; i < matrixA.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrixB[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA[0].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum % 26;
    }
  }
  return result;
};

const stringToNumbers = (str) => {
  return [...str.toLowerCase()].map((char) => alphabet.indexOf(char));
};

const numbersToString = (numbers) => {
  return numbers.map((num) => alphabet[num]).join("");
};

const decryptHillCipher = (ciphertext, keyMatrix) => {
  const inverseKeyMatrix = inverseMatrix(keyMatrix);
  if (!inverseKeyMatrix) return "No valid key";
  const ciphertextNumbers = stringToNumbers(ciphertext);

  const blocks = [];
  while (ciphertextNumbers.length) {
    blocks.push(ciphertextNumbers.splice(0, keyMatrix.length));
  }

  const plaintextNumbers = blocks
    .map((block) => multiplyMatrices([block], inverseKeyMatrix)[0])
    .flat();

  return numbersToString(plaintextNumbers);
};

const hillBruteforce = (ciphertext, keyLength = 2, maxKeys = 10) => {
  const results = [];
  const generateKeys = () => {
    const keys = [];
    const generateKey = (prefix, remaining) => {
      if (prefix.length === keyLength * keyLength) {
        keys.push(prefix);
        return;
      }
      for (let i = 0; i < alphabet.length; i++) {
        generateKey(prefix + alphabet[i], remaining - 1);
      }
    };
    generateKey("", keyLength * keyLength);
    return keys;
  };

  const keys = generateKeys().slice(0, maxKeys);

  for (let key of keys) {
    const matrix = [
      [alphabet.indexOf(key[0]), alphabet.indexOf(key[1])],
      [alphabet.indexOf(key[2]), alphabet.indexOf(key[3])],
    ];

    const decrypted = decryptHillCipher(ciphertext, matrix);
    results.push({ key, decrypted });
  }

  return results;
};

module.exports = { hillBruteforce };
