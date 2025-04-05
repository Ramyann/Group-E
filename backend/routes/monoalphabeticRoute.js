const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  decryptMonoalphabetic,
} = require("../controllers/monoalphabeticController/monoalphabeticDecrypt");

const {
  encryptMonoalphabetic,
} = require("../controllers/monoalphabeticController/monoalphabeticEncrypt");

const {
  attackMonoalphabetic,
} = require("../controllers/monoalphabeticController/monoalphabeticAttack");

router.post("/decrypt", requireAuth, decryptMonoalphabetic);
router.post("/encrypt", requireAuth, encryptMonoalphabetic);
router.post("/attack", requireAuth, attackMonoalphabetic);

module.exports = router;
