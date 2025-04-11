const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bruteforceSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    encryption_algorithm: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bruteforce", bruteforceSchema, "bruteforces");
