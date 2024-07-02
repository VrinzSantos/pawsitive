import mongoose, { Document, Schema } from "mongoose";
export interface INotification extends Document {
  title: string;
  image: string;
  description: string;
  date: Date;
  seen: boolean;
  userId: string;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
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
  },
  { timestamps: true }
);

const UserNotification = mongoose.model<INotification>(
  "userNotification",
  notificationSchema
);

export default UserNotification;
