import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appState {
  activeSideBar: number;
  isAppLoading: boolean;
}

const initialState: appState = {
  activeSideBar: 0,
  isAppLoading: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    appInfoRedux: (
      state: appState,
      action: PayloadAction<Partial<appState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAppRedux: () => {
      return initialState;
    },
  },
});

export const { appInfoRedux, clearAppRedux } = appSlice.actions;

export default appSlice.reducer;
