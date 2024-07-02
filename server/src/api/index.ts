import express from "express";

import admin from "./admin.routes";
import dashboard from "./dashboard.routes";
import appointment from "./appointment.routes";
import inventory from "./inventory.routes";
import orders from "./order.routes";
import client from "./client.routes";
import notifications from "./notification.routes";
import feedbacks from "./feedback.routes";
import user from "./user.routes";
import generate from "./generate.sales.routes";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API ROUTE",
  });
});

router.use("/admin", admin);
router.use("/dashboard", dashboard);
router.use("/appointment", appointment);
router.use("/inventory", inventory);
router.use("/orders", orders);
router.use("/client", client);
router.use("/notifications", notifications);
router.use("/feedbacks", feedbacks);
router.use("/user", user);
router.use("/generate", generate);

export default router;
