require("dotenv").config(); // ← EN PREMIER, avant tout

const express = require("express");
const connectDB = require("./src/config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();

app.listen(port, () => {
  console.log("serveur is running on port " + port);
});