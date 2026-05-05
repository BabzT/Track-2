import express from "express";
import * as userController from "../controllers/auth";
import { validateRequestBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequestBody(registerSchema),
  userController.createAccount,
);

router.post("/login", validateRequestBody(loginSchema), userController.login);

export default router;
