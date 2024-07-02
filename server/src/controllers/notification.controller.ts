import { Request, Response } from "express";
import Notification, { INotification } from "../models/notification.model";
import UserNotification from "../models/user.notification.model";
export const getNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all notifications from the database
    const notifications: INotification[] = await Notification.find().sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

export const markNotificationAsSeen = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notificationId = req.params.id; // Assuming the notification ID is passed as a URL parameter

  try {
    // Find the notification by ID
    const notification: INotification | null = await Notification.findById(
      notificationId
    );

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    // Update the seen field to true
    notification.seen = true;

    // Save the updated notification
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as seen",
      data: notification,
    });
  } catch (error: any) {
    console.error("Error marking notification as seen:", error);
    res.status(500).json({
      success: false,
      message: "Error marking notification as seen",
      error: error.message,
    });
  }
};

export const getUserNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    // Fetch all notifications for the user from the database
    const notifications = await UserNotification.find({ userId }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

export const userMarkNotificationAsSeen = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notificationId = req.params.id; // Assuming the notification ID is passed as a URL parameter

  try {
    // Find the notification by ID
    const notification = await UserNotification.findById(notificationId);

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    // Update the seen field to true
    notification.seen = true;

    // Save the updated notification
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as seen",
      data: notification,
    });
  } catch (error: any) {
    console.error("Error marking notification as seen:", error);
    res.status(500).json({
      success: false,
      message: "Error marking notification as seen",
      error: error.message,
    });
  }
};
