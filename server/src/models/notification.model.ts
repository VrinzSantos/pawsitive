import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  title: string;
  image: string;
  description: string;
  date: Date;
  seen: boolean;
  appointmentId: Types.ObjectId; // Update the type to Types.ObjectId
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    appointmentId: {
      type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
      unique: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
