import express from "express";
import {
  validationController,
  resendController,
} from "../controllers/verify.js";

const router = express.Router();

router.post("/validate", validationController);
router.post("/resend", resendController);

export default router;
