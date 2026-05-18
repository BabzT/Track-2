import express from "express";
import * as authController from "../controllers/auth";
import { validateRequestBody } from "../middleware/validate";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequestBody(registerSchema),
  authController.createAccount,
);
router.post("/login", validateRequestBody(loginSchema), authController.login);
router.post("/refresh-token", authController.refreshAccessToken);
router.post(
  "/forgot-password",
  validateRequestBody(forgotPasswordSchema),
  authController.forgotPassword,
);
router.post(
  "/reset-password",
  validateRequestBody(resetPasswordSchema),
  authController.resetPassword,
);
router.post("/logout", authController.logout);

export default router;
