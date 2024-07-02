import { Request, Response } from "express";
import Appointment from "../models/appointment.model";
import UserNotification from "../models/user.notification.model";
import { DEFAULT_IMAGE_URL } from "../tasks/appointmentNotificationCron";
export const getAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments
    res.status(200).send({
      success: true,
      message: "Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Appointments",
      error: error.message,
    });
  }
};

export const updateStatusController = async (req: Request, res: Response) => {
  try {
    // Extract appointment ID and new status from request body
    const { appointmentId, newStatus, userId, service, description } = req.body;

    // Find the appointment by ID and update its status
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: newStatus },
      { new: true } // Return the updated document
    );

    const userNotification = await UserNotification.create({
      userId: userId,
      title: `Appointment ${service} has been approved`,
      description: `${description}`,
      date: new Date(),
      seen: false,
      image: DEFAULT_IMAGE_URL,
    });

    // Check if appointment exists
    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Send response with updated appointment
    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      appointment: updatedAppointment,
    });

    await userNotification.save();
  } catch (error: any) {
    // Handle errors
    console.error("Error updating appointment status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating appointment status",
      error: error.message,
    });
  }
};

// Delete appointment
export const deleteAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if appointment exists
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Delete the appointment
    await Appointment.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Appointment deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting appointment",
      error: error.message,
    });
  }
};

export const bookAppointnmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, email, service, description, date, time } = req.body;
    const newAppointment = await Appointment.create({
      userId: userId,
      userEmail: email,
      serviceType: service,
      description: description,
      date: date,
      time: time,
    });
    await newAppointment.save();
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500);
  }
};

export const getFullyBookedAppointments = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch all unique dates from the database
    const uniqueDates = await Appointment.distinct("date");

    // Array to store fully booked dates
    const fullyBookedDates: string[] = [];

    // Iterate over each date
    for (const date of uniqueDates) {
      // Count the number of appointments with "Approved" status for the current date
      const count = await Appointment.countDocuments({
        date: date,
        status: "Approved",
      });

      // Check if the date is fully booked (5 or more appointments with "Approved" status)
      if (count >= 5) {
        fullyBookedDates.push(date);
      }
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved fully booked appointments",
      fullyBookedDates: fullyBookedDates,
    });
  } catch (error: any) {
    console.error("Error fetching fully booked appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching fully booked appointments",
      error: error.message,
    });
  }
};
