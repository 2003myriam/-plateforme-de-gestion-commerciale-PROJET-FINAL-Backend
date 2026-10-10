 
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully");
    console.log("Base utilisée :", mongoose.connection.name);
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
};

module.exports = connectDB;
