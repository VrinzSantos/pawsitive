import mongoose, { Schema, Document } from "mongoose";

interface IProduct {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  products: IProduct[];
  totalAmount: number;
  orderDate: Date;
  customerName: string;
  amountReceived: number;
  change: number;
  formattedOrderDate: string;
}

const productSchema = new Schema<IProduct>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    products: [productSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    amountReceived: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.virtual("formattedOrderDate").get(function (this: IOrder) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return this.orderDate.toLocaleDateString(undefined, options);
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
