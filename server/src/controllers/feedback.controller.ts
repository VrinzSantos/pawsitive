import { Request, Response } from "express";
import feedbackModel, { IFeedback } from "../models/feedback.model";

export const userFeedBackCrontroller = async (req: Request, res: Response) => {
  try {
    const feedbacks: IFeedback[] = await feedbackModel
      .find()
      .sort({ createdAt: -1 }); // Sort by timestamp in descending order

    // Convert ratings from string to integer
    const formattedFeedbacks = feedbacks.map((feedback) => ({
      ...feedback.toObject(),
      ratings: parseFloat(feedback.ratings),
    }));

    res.status(200).send({
      success: true,
      data: formattedFeedbacks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching feedbacks",
      error,
    });
  }
};

export const computeTotalRatingController = async (
  req: Request,
  res: Response
) => {
  try {
    const feedbacks: IFeedback[] = await feedbackModel.find();

    const totalRatingMap: Record<string, number> = {};
    const totalRatingCountMap: Record<string, number> = {};

    feedbacks.forEach((feedback) => {
      const rating = parseFloat(feedback.ratings);
      if (!isNaN(rating)) {
        if (totalRatingMap[feedback.category]) {
          totalRatingMap[feedback.category] += rating;
          totalRatingCountMap[feedback.category]++;
        } else {
          totalRatingMap[feedback.category] = rating;
          totalRatingCountMap[feedback.category] = 1;
        }
      }
    });

    const categoryAverageRatings = Object.entries(totalRatingMap).map(
      ([category, totalRating]) => {
        const totalRatingCount = totalRatingCountMap[category];
        const averageRating = totalRating / totalRatingCount;
        return {
          category,
          Rating: parseFloat(averageRating.toFixed(2)), // Round to two decimal places
        };
      }
    );

    res.status(200).json({
      success: true,
      categoryAverageRatings,
    });
  } catch (error) {
    console.error("Error computing total ratings:", error);
    res.status(500).json({
      success: false,
      message: "Error computing total ratings",
    });
  }
};

export const createFeedbackController = async (req: Request, res: Response) => {
  try {
    const { category, feedback, ratings } = req.body;
    const newFeedback = new feedbackModel({
      category,
      feedback,
      ratings,
    });
    await newFeedback.save();
    res.status(201).json({
      success: true,
      message: "Feedback created successfully",
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error creating feedback",
    });
  }
};
