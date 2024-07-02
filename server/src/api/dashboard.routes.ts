import express from "express";
import {
  getSalesToday,
  getUserCount,
  getNumberOfProducts,
  getTotalAppointments,
  getWeeklySales,
  getBestSellingProducts,
  getProductCategoryDistribution,
  getMonthlySalesController,
  getLowSellingProducts,
  getMonthlyBestProducts,
  getMonthlyLowSellingProducts,
  getMonthlyAverageSales,
  getClientsByLocation,
  getPetsBreedCount,
} from "../controllers/dashboard.controller";
const router = express.Router();
router.get("/sales-today", getSalesToday);
router.get("/total-users", getUserCount);
router.get("/total-products", getNumberOfProducts);
router.get("/total-appointments", getTotalAppointments);
router.get("/weekly-sales", getWeeklySales);
router.get("/best-selling", getBestSellingProducts);
router.get("/product-distribution", getProductCategoryDistribution);
router.get("/monthly-sales", getMonthlySalesController);
router.get("/low-selling", getLowSellingProducts);
router.get("/monthly-best-products", getMonthlyBestProducts);
router.get("/monthly-low-selling-products", getMonthlyLowSellingProducts);
router.get("/monthly-average-sales", getMonthlyAverageSales);
router.get("/clients-by-location", getClientsByLocation);
router.get("/pets-breed-count", getPetsBreedCount);
export default router;
