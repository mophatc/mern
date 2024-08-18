import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "../api/routes/user.route.js";
import authRouter from "../api/routes/auth.route.js";

if (mongoose.connect(process.env.MONGO)) {
  console.log("connected");
} else {
  console.log("failed");
}

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message|| 'Internal Server error';
  return res.status(statusCode).json({
    success:false, 
    message, 
    statusCode    
  });

})