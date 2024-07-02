import { Request, Response } from "express";
import Order, { IOrder } from "../models/orders.model";

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders: IOrder[] = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

export const deleteOrderController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Find the order by ID and remove it
    const deletedOrder: IOrder | null = await Order.findByIdAndDelete(id);

    if (deletedOrder) {
      res.status(200).send({
        success: true,
        message: "Order deleted successfully",
        // data: deletedOrder,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting the order",
      error,
    });
  }
};
