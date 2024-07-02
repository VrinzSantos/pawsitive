import express from "express";
import { dailySalesController } from "../controllers/generate.sales.controller";
const router = express.Router();
router.get("/daily-sales", dailySalesController);

export default router;
