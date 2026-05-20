import express from "express";
import * as usersController from "../controllers/users";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/me", authenticate, usersController.getMe);

export default router;
