/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from '../types/User';

interface AuthState {
  user: any | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRedux: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },

    logoutUserRedux: (state) => {
      state.user = null;
    },
  },
});

export const { setUserRedux, logoutUserRedux } = authSlice.actions;
export default authSlice.reducer;
