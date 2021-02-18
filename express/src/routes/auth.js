import express from "express";
import {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
  logoutAllController,
  updatePasswordController,
} from "../controllers/auth.js";
import rateLimit from 'express-rate-limit'

const router = express.Router();

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many attempts from this IP, please try again after an hour"
});

router.post("/signup", createAccountLimiter, signupController);
router.post("/login", createAccountLimiter, loginController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);
router.post("/logout-all", logoutAllController);
router.put("/password", updatePasswordController);

export default router;
