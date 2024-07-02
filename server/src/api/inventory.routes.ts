import express from "express";
const router = express.Router();
import {
  getAllInventoryItems,
  createOrderController,
  updateProductController,
  addProductController,
  deleteProductController,
  generateInventory,
} from "../controllers/inventory.controller";

router.get("/", getAllInventoryItems);
router.get("/generate-inventory", generateInventory);

router.post("/create-order", createOrderController);
router.put("/update/:id", updateProductController);
router.post("/add-product", addProductController);
router.delete("/delete-order/:id", deleteProductController);
export default router;
