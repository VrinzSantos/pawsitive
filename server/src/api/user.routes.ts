import express from "express";
import {
  loginUserController,
  registerUser,
  getUserAuth,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/login", loginUserController);
router.post("/register", registerUser);
router.get("/details", getUserAuth);
export default router;
