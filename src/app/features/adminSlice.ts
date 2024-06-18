import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  username: string;
  credits: number;
  token?: string;
  rememberMe?: boolean;
}

const initialState: AdminState = {
  username: "Admin",
  credits: 0,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    get: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state;
    },

    login: (state, action: PayloadAction<any>) => {
      const { token, username, credits, rememberMe } = action.payload;
      return {
        ...state,
        token,
        username,
        credits,
        rememberMe,
      };
    },
    logout: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { get, login, logout } = adminSlice.actions;

export default adminSlice.reducer;
