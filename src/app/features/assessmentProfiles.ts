import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any[] = [];

export const assessmentProfilesSlice = createSlice({
  name: "assessmentProfiles",
  initialState,
  reducers: {
    getAllProfiles: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return state;
    },

    setAllProfiles: (state, action: PayloadAction<any>) => {
      return [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllProfiles, setAllProfiles } =
  assessmentProfilesSlice.actions;

export default assessmentProfilesSlice.reducer;
