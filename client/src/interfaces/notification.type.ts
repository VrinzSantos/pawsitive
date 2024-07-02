import { AxiosResponse } from "axios";

// Define the type for a single notification
export interface NotificationData {
  _id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  seen: boolean;
}

// Define the type for the response data
export interface NotificationResponseData {
  data: NotificationData[]; // Array of notifications
}

// Define the type for the entire response object including data
export interface NotificationResponse extends AxiosResponse {
  data: NotificationResponseData; // Notification response data
}
