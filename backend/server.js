const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");
const ceaserRoutes = require("./routes/ceaserRoute");
const monoalphabeticRoutes = require("./routes/monoalphabeticRoute");
const playfairRoutes = require("./routes/playfairRoute");
const hillRoutes = require("./routes/hillRoute");
const bruteforcesRoutes = require('./routes/bruteforcesRoute')

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoute);

app.use("/api/ceaser", ceaserRoutes);
app.use("/api/monoalphabetic", monoalphabeticRoutes);

app.use("/api/playfair", playfairRoutes);
app.use("/api/hill", hillRoutes);
app.use('/api/bruteforces',bruteforcesRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "test",
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });