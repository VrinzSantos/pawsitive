import cron from "node-cron";
import Appointment, { IAppointment } from "../models/appointment.model";
import Notification from "../models/notification.model";

// Define a default image URL for notifications
export const DEFAULT_IMAGE_URL =
  "https://www.managemore.com/images/appointment.jpg";

// Define a cron job to run every 10 seconds
cron.schedule("*/10 * * * * *", async () => {
  //   console.log("Checking for new appointments");

  try {
    // Query for new appointments with pending status
    const newAppointments: IAppointment[] = await Appointment.find({
      status: "Pending",
    });

    // Loop through new appointments
    for (const appointment of newAppointments) {
      // Check if a notification for this appointment already exists
      const existingNotification = await Notification.findOne({
        appointmentId: appointment._id,
      });

      // If no existing notification found, create a new one
      if (!existingNotification) {
        // Create a notification for the new appointment
        const notification = new Notification({
          title: "New Appointment",
          description: `You have a new appointment scheduled`,
          date: new Date(),
          seen: false,
          image: DEFAULT_IMAGE_URL, // Default image URL
          appointmentId: appointment._id, // Unique identifier for the appointment
        });

        // Save the notification to the database
        await notification.save();
      }
    }

    // console.log("Notifications created for new appointments");
  } catch (error) {
    console.error("Error creating notifications for new appointments:", error);
  }
});
