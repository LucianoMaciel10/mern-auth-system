import express from "express";
import { validateSchema } from "../middlewares/validate.js";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  verifyResetOtp,
} from "../controllers/auth.controller.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  sendResetOtpSchema,
} from "../schemas/auth.schema.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", validateSchema(registerSchema), register);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", validateSchema(sendResetOtpSchema), sendResetOtp);
authRouter.post('/verify-reset-otp', verifyResetOtp)
authRouter.post("/reset-password", validateSchema(resetPasswordSchema), resetPassword);

export default authRouter;