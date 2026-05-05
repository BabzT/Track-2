import express from "express";
import * as usersController from "../controllers/users";

const router = express.Router();

router.get("/me", usersController.getMe);

export default router;
