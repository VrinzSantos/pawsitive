import express from "express";
import {
  AdminLogin,
  getAdminData,
  createAdminUser,
  updateAdminProfile,
} from "../controllers/admin.controller";
const router = express.Router();

router.get("/", (req, res) => {
  res.json("success");
});

router.post("/login", AdminLogin);
router.get("/details", getAdminData);
router.post("/createuser", createAdminUser);
router.patch("/update-admin", updateAdminProfile);

export default router;
