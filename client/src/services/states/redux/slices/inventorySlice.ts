import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Modify the state type and arg types to match your needs
interface inventoryState {
  selectedCategory: string;
  selectedProductName: string;
}

const initialState: inventoryState = {
  selectedCategory: "",
  selectedProductName: "",
};

const inventorSlice = createSlice({
  name: "inventorSlice",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedProductName: (state, action: PayloadAction<string>) => {
      state.selectedProductName = action.payload;
    },
    clearInventory: () => {
      return initialState;
    },
  },
});

export const { setSelectedCategory, clearInventory, setSelectedProductName } =
  inventorSlice.actions;

export default inventorSlice.reducer;
