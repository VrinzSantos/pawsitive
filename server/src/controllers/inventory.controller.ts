import { Request, Response } from "express";
import Inventory, { IInventory } from "../models/inventory.model";
import Order from "../models/orders.model";
import cloudinary from "../config/cloudinary";
export const getAllInventoryItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryItems = await Inventory.find();
    if (inventoryItems) {
      res.status(200).json({ success: true, data: inventoryItems });
    } else {
      res.status(404).json({ success: false, data: "not found" });
    }
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching inventory items" });
  }
};

export const generateInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryItems = await Inventory.find(
      {},
      { _id: 0, productImage: 0, updatedAt: 0, createdAt: 0, __v: 0 }
    );
    if (inventoryItems.length > 0) {
      res.status(200).json({ success: true, data: inventoryItems });
    } else {
      res.status(404).json({ success: false, data: "not found" });
    }
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching inventory items" });
  }
};

export const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { products, totalAmount, amountReceived, change, customerName } =
      req.body;
    const currentDate = new Date();

    // Create the order document
    const order = new Order({
      products,
      totalAmount,
      amountReceived,
      change,
      customerName,
      orderDate: currentDate,
    });

    // Save the order
    await order.save();

    // Update inventory stocks
    for (const product of products) {
      const productId: string = product.product;
      const quantity: number = product.quantity;

      const inventory = await Inventory.findById(productId);

      if (inventory) {
        const updatedStocksLeft: number = inventory.stocksLeft - quantity;
        const updatedStocksOut: number = (inventory.stocksOut || 0) + quantity;

        // Update inventory document
        inventory.stocksLeft = updatedStocksLeft;
        inventory.stocksOut = updatedStocksOut;
        await inventory.save();
      }
    }

    res.status(201).send({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating the order",
      error: error.message,
    });
  }
};

export const updateProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;

    // Fetch the product by its ID
    const product: IInventory | null = await Inventory.findById(id);

    if (!product) {
      res.status(404).send({
        success: false,
        message: "Product not found",
      });
      return;
    }
    // Calculate the difference between old and new quantities
    const updatedQuantity = parseInt(updatedProductData.productQuantity);
    const quantityDifference = updatedQuantity - product.productQuantity;

    // Calculate the updated stocksLeft
    const updatedStocksLeft = product.stocksLeft + quantityDifference;

    // Update the product data
    product.productCategory = updatedProductData.productCategory;
    product.productName = updatedProductData.productName;
    product.productDescription = updatedProductData.productDescription;
    product.productPrice = updatedProductData.productPrice;
    product.productQuantity = updatedQuantity; // Update quantity
    product.stocksLeft = updatedStocksLeft; // Update stocksLeft

    // Save the updated product data
    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the product",
      error,
    });
  }
};

export const addProductController = async (req: Request, res: Response) => {
  try {
    const {
      productCategory,
      productName,
      productDescription,
      productPrice,
      productQuantity,
      productImage,
    } = req.body;
    const stocksLeft = productQuantity;
    const options = {
      folder: "/sample",
    };

    const result = await cloudinary.uploader.upload(productImage, options);

    if (result) {
      const product = new Inventory({
        productCategory,
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage: result.url,
        stocksLeft,
      });
      await product.save();
      res.status(201).send({
        success: true,
        message: "Product added successfully",
        data: product,
      });
    }
  } catch (error) {
    console.log("🚀 ~ addProductController ~ error:", error);
    res.status(500).send({
      success: false,
      message: "Error in adding a product",
      error,
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Inventory.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found or could not be deleted",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the product",
      error,
    });
  }
};
