import mongoose, { Document, Schema } from "mongoose";

export interface IInventory extends Document {
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
  stocksLeft: number;
  stocksOut?: number;
}

const inventorySchema = new Schema<IInventory>(
  {
    productCategory: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
      editable: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    stocksLeft: {
      type: Number,
      required: true,
    },
    stocksOut: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model<IInventory>("Inventory", inventorySchema);

export default Inventory;
