import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  userId: string;
  userEmail: string;
  serviceType: string;
  description?: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;
