import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// const mockData = {
//   modules: [
//     {
//       type: "Quiz",
//       name: "Microsoft Word Proficiency Test",
//       noOfQuestions: 10,
//       skills: ["Document Formatting", "Text Editing", "Template Usage"],
//       time: 15,
//       Weightage: 20,
//     },
//     {
//       type: "AI Video Interview",
//       name: "Goal Development Assessment",
//       noOfQuestions: 5,
//       skills: [
//         "Strategic Planning",
//         "Objective Setting",
//         "Performance Tracking",
//       ],
//       time: 20,
//       Weightage: 30,
//     },
//   ],
// };
const initialState: any = {
  modules: [],
  selectedModules: [],
};

export const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<any>) => {
      console.log("action", action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.modules = [...action.payload.modules];
    },
    addModule: (state, action: PayloadAction<any>) => {
      state = [...state, action.payload];
    },
    setSelectedModule: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedModules = [...action.payload.modules];
    },
    removeSelectedModule: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedModules = state.selectedModules.filter(
        (item: any) => item.name !== action.payload.name,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setModules,
  addModule,
  setSelectedModule,
  removeSelectedModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;
