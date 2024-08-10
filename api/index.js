import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO)
  ? console.log("connected")
  : console.log("failed");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000!!");
});
