import express from "express";
import {
  getNotificationsController,
  markNotificationAsSeen,
  getUserNotification,
  userMarkNotificationAsSeen,
} from "../controllers/notification.controller";
const router = express.Router();

router.get("/", getNotificationsController);
router.patch("/seen-notification/:id", markNotificationAsSeen);
router.get("/user-notification/:id", getUserNotification);
router.patch("/user-seen-notification/:id", userMarkNotificationAsSeen);
export default router;
