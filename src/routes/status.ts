import express from "express";
import * as statusController from "../controllers/status";

const router = express.Router();

router.get("/", statusController.getStatuses);

export default router;
