import { Request, Response } from "express";
import Order from "../models/orders.model";

export const dailySalesController = async (req: Request, res: Response) => {
  try {
    const result = await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "inventories",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $match: {
          productDetails: { $ne: [] },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          },
          totalAmount: { $sum: "$totalAmount" },
          products: { $addToSet: "$productDetails.productName" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          totalAmount: 1,
          productName: {
            $reduce: {
              input: "$products",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Error fetching daily sales:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching daily sales",
      error: error.message,
    });
  }
};
