import { NotificationResponse } from "@/interfaces/notification.type";
import axios from "axios";

export const notificationData = async () => {
  const response: NotificationResponse = await axios.get(
    "http://localhost:5000/api/notifications"
  );
  return response.data.data;
};

export const markNotificationAsSeen = async (id: string) => {
  const response: NotificationResponse = await axios.patch(
    `http://localhost:5000/api/notifications/seen-notification/${id}`,
    {
      seen: true,
    }
  );
  return response.data.data;
};

export const userNotification = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:5000/api/notifications/user-notification/${userId}`
  );
  return response.data.data;
};

export const userMarkNotificationSeen = async (id: string) => {
  const response = await axios.patch(
    `http://localhost:5000/api/notifications/user-seen-notification/${id}`,
    {
      seen: true,
    }
  );
  return response.data.data;
};
