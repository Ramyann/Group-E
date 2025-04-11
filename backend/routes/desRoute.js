const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const desEncrypt = require("../controllers/des/desEncrypt");
const desDecrypt = require("../controllers/des/desDecrypt");

router.use(requireAuth);

// DES Encryption
router.post("/encrypt", desEncrypt);

// DES Decryption
router.post("/decrypt", desDecrypt);

module.exports = router;
