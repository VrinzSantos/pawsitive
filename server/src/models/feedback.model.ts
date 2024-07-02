import mongoose, { Document, Schema } from "mongoose";

// Define interface for Feedback document
export interface IFeedback extends Document {
  category: string;
  feedback: string;
  ratings: string;
}

// Define Mongoose schema for Feedback
const feedbackSchema = new Schema<IFeedback>(
  {
    category: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export Feedback model
const FeedbackModel = mongoose.model<IFeedback>("Feedback", feedbackSchema);
export default FeedbackModel;
