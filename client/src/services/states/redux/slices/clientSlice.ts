import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Modify the state type and arg types to match your needs
interface clientState {
  id: string;
  name: string;
  email: string;
  token: string | null;
}

const initialState: clientState = {
  id: "",
  name: "",
  email: "",
  token: null,
};

const clientSlice = createSlice({
  name: "clientSlice",
  initialState,
  reducers: {
    clientUserRedux: (
      state: clientState,
      action: PayloadAction<Partial<clientState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearClientRedux: () => {
      return initialState;
    },
  },
});

export const { clientUserRedux, clearClientRedux } = clientSlice.actions;

export default clientSlice.reducer;
