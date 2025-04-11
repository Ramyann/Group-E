// Decrypt a string using byte-wise Caesar shift
const decryptByteShift = (ciphertext, shift) => {
  if (!ciphertext || typeof ciphertext !== 'string') return '';

  const effectiveShift = shift % 256;

  return Array.from(ciphertext, (char) => {
    const charCode = char.charCodeAt(0);
    const decryptedCharCode = (charCode - effectiveShift + 256) % 256;
    return String.fromCharCode(decryptedCharCode);
  }).join('');
};

// Encrypt endpoint
const caesarEncrypt = async (req, res) => {

  const { plaintext, shift } = req.body;
  const effectiveShift = shift % 256;

  const ciphertext = Array.from(plaintext, (char) =>
    String.fromCharCode((char.charCodeAt(0) + effectiveShift) % 256)
  ).join('');

  res.status(200).json({ ciphertext });
};

// Decrypt endpoint
const caesarDecrypt = async (req, res) => {

  const { ciphertext, shift } = req.body;
  const plaintext = decryptByteShift(ciphertext, shift);

  res.status(200).json({ plaintext });
};

module.exports = {
  caesarEncrypt,
  caesarDecrypt,
};