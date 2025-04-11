const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/requireAuth'); 

const {
  caesarAttack,
  caesarDecrypt,
  caesarEncrypt,
} = require("../controllers/ceaser/ceaserController");

router.use(requireAuth);

// Caesar Cipher Encryption
router.post("/encrypt", caesarEncrypt);

// Caesar Cipher Decryption
router.post("/decrypt", caesarDecrypt);

module.exports = router;