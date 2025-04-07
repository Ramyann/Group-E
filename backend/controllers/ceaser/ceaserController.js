// Helper to validate string and number inputs
const validateInput = (req, res, fields) => {
  for (const field of fields) {
    const value = req.body[field.name];
    if (
      value == null ||
      typeof value !== field.type ||
      (field.type === 'string' && value.trim() === '')
    ) {
      res.status(400).json({
        message: `Invalid input: ${field.name} (${field.type}) is required.`,
      });
      return false;
    }
  }
  return true;
};

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
  if (
    !validateInput(req, res, [
      { name: 'plaintext', type: 'string' },
      { name: 'shift', type: 'number' },
    ])
  ) return;

  
  const { plaintext, shift } = req.body;
  const effectiveShift = shift % 256;

  const ciphertext = Array.from(plaintext, (char) =>
    String.fromCharCode((char.charCodeAt(0) + effectiveShift) % 256)
  ).join('');

  res.status(200).json({ ciphertext });
};

// Decrypt endpoint
const caesarDecrypt = async (req, res) => {
  if (
    !validateInput(req, res, [
      { name: 'ciphertext', type: 'string' },
      { name: 'shift', type: 'number' },
    ])
  ) return;

  const { ciphertext, shift } = req.body;
  const plaintext = decryptByteShift(ciphertext, shift);

  res.status(200).json({ plaintext });
};

// Brute-force attack endpoint
const caesarAttack = async (req, res, next) => {
  try {
    const { ciphertext } = req.body;
    if (!ciphertext || typeof ciphertext !== 'string') {
      return res.status(400).json({ message: 'Invalid input: ciphertext (string) is required.' });
    }

    const results = Array.from({ length: 256 }, (_, shift) => ({
      shift,
      plaintext: decryptByteShift(ciphertext, shift),
    }));

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error during Caesar attack:', error);
    next ? next(error) : res.status(500).json({ message: 'Internal server error during attack.' });
  }
};

module.exports = {
  caesarEncrypt,
  caesarDecrypt,
  caesarAttack,
};
