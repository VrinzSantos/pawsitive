import express from "express";
import {
  getAllOrders,
  deleteOrderController,
} from "../controllers/order.controller";
const router = express.Router();

router.get("/", getAllOrders);

router.delete("/delete/:id", deleteOrderController);

export default router;
