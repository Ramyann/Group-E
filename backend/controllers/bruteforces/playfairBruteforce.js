const alphabet = "abcdefghijklmnopqrstuvwxyz";

const generateMatrix = (key) => {
  const matrix = [];
  const usedChars = new Set();
  let keyStr = key.toLowerCase().replace(/[^a-z]/g, "");

  keyStr = keyStr.replace(/j/g, "i");

  for (let char of keyStr) {
    if (!usedChars.has(char)) {
      matrix.push(char);
      usedChars.add(char);
    }
  }

  for (let char of alphabet) {
    if (!usedChars.has(char)) {
      matrix.push(char);
      usedChars.add(char);
    }
  }

  return matrix;
};

const createDigraphs = (ciphertext) => {
  const sanitized = ciphertext.toLowerCase().replace(/[^a-z]/g, "");
  const digraphs = [];

  for (let i = 0; i < sanitized.length; i += 2) {
    let digraph = sanitized[i];

    if (i + 1 < sanitized.length) {
      if (sanitized[i] === sanitized[i + 1]) {
        digraph += "x";
        i--;
      } else {
        digraph += sanitized[i + 1];
      }
    } else {
      digraph += "x";
    }

    digraphs.push(digraph);
  }
  return digraphs;
};

const decryptDigraph = (digraph, matrix) => {
  const position = (char) => {
    const idx = matrix.indexOf(char);
    return { row: Math.floor(idx / 5), col: idx % 5 };
  };

  const [char1, char2] = digraph;
  const pos1 = position(char1);
  const pos2 = position(char2);

  if (pos1.row === pos2.row) {
    return (
      matrix[pos1.row * 5 + ((pos1.col - 1 + 5) % 5)] +
      matrix[pos2.row * 5 + ((pos2.col - 1 + 5) % 5)]
    );
  } else if (pos1.col === pos2.col) {
    return (
      matrix[((pos1.row - 1 + 5) % 5) * 5 + pos1.col] +
      matrix[((pos2.row - 1 + 5) % 5) * 5 + pos2.col]
    );
  } else {
    return matrix[pos1.row * 5 + pos2.col] + matrix[pos2.row * 5 + pos1.col];
  }
};

const playfairBruteforce = (ciphertext, keyLength = 5, maxKeys = 10) => {
  const results = [];

  const generateKeys = (length) => {
    const keys = [];
    const generateKey = (prefix, remaining) => {
      if (prefix.length === length) {
        keys.push(prefix);
        return;
      }

      for (let i = 0; i < alphabet.length; i++) {
        generateKey(prefix + alphabet[i], remaining - 1);
      }
    };
    generateKey("", length);
    return keys;
  };

  const keys = generateKeys(keyLength).slice(0, maxKeys);

  for (let key of keys) {
    const matrix = generateMatrix(key);
    const digraphs = createDigraphs(ciphertext);
    const decrypted = digraphs
      .map((digraph) => decryptDigraph(digraph, matrix))
      .join("");
    results.push({ key, decrypted });
  }

  return results;
};

module.exports = { playfairBruteforce };
