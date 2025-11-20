import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || 'http://localhost:5173' }));

app.get("/", (req, res) => res.send("API Working!"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))
  )
  .catch((error) => {
    console.log("Database connection failed:", error.message);
    process.exit(1);
  });
