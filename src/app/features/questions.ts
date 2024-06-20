import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { questions: [], selectedQuestions: [] };

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionsToApp: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.questions = [...action.payload];
    },
    getAllQuestions: (state) => {
      return state.questions;
    },
    updateQuestion: (state, action: PayloadAction<any>) => {
      const question = state.questions.find(
        (q: { position: any }) => q.position === action.payload.position,
      );
      question.answer = action.payload.answer;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuestionsToApp, getAllQuestions, updateQuestion } =
  questionsSlice.actions;

export default questionsSlice.reducer;
