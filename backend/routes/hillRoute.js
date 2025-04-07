const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  hillEncrypt,
  hillDecrypt,
  hillCryptoanalysis,
} = require("../controllers/hill/hillController");

router.use(requireAuth);

router.post("/encrypt", hillEncrypt);
router.post("/decrypt", hillDecrypt);
router.post("/cryptoanalysis", hillCryptoanalysis);

module.exports = router;
