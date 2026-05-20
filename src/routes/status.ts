import express from "express";
import * as statusController from "../controllers/status";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/", authenticate, statusController.getStatuses);

export default router;
