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
  cryptoanalysisMonoalphabetic,
} = require("../controllers/monoalphabeticController/monoalphabeticCryptoanalysis");

router.use(requireAuth);

router.post("/decrypt", decryptMonoalphabetic);
router.post("/encrypt", encryptMonoalphabetic);
router.post("/attack", cryptoanalysisMonoalphabetic);

module.exports = router;
