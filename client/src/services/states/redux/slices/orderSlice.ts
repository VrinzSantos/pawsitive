import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  productImageUrl: string;
}

interface OrderState {
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
}

const initialState: OrderState = {
  items: [],
  totalAmount: 0,
  customerName: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<OrderItem>) => {
      const { _id, price, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === _id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount += price * quantity;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removedItemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (removedItemIndex !== -1) {
        const removedItem = state.items[removedItemIndex];
        state.totalAmount -= removedItem.price * removedItem.quantity;
        state.items.splice(removedItemIndex, 1);
      }
    },
    clearOrder: () => {
      return initialState;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === _id);
      if (item) {
        const prevQuantity = item.quantity;
        item.quantity = quantity;
        state.totalAmount += item.price * (quantity - prevQuantity);
      }
    },
    setCustomername: (state, action: PayloadAction<string>) => {
      state.customerName = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearOrder,
  updateQuantity,
  setCustomername,
} = orderSlice.actions;

export default orderSlice.reducer;
