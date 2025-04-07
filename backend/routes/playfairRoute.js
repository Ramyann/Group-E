const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  encryptPlayfair,
  decryptPlayfair,
  cryptoanalysisPlayfair,
  bruteforcePlayfair,
} = require("../controllers/playfair/playfairController");

router.use(requireAuth);

router.post("/encrypt", encryptPlayfair);

router.post("/decrypt", decryptPlayfair);

router.post("/cryptoanalysis", cryptoanalysisPlayfair);

router.post("/brute-force", bruteforcePlayfair);

module.exports = router;
