const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all results" });
});

router.get("/encrypt", (req, res) => {
  res.json();
});

router.get("/decrypt", (req, res) => {
  res.json();
});

router.get("/attack", (req, res) => {
  res.json();
});

module.exports = router;
