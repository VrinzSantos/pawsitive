import express from "express";
import {
  userFeedBackCrontroller,
  computeTotalRatingController,
  createFeedbackController,
} from "../controllers/feedback.controller";
const router = express.Router();

router.get("/", userFeedBackCrontroller);
router.get("/feedback-rating", computeTotalRatingController);
router.post("/create", createFeedbackController);

export default router;
