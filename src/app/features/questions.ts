import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = { questions: [], selectedQuestions: [] };

export const questionsSlice = createSlice({
  name: 'questions',
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
        (q: { title: any }) => q.title === action.payload.title,
      );
      question.answer = action.payload.answer;
    },
    addQuestionChoice: (state, action: PayloadAction<any>) => {
      const question = state.questions.find(
        (q: { title: any }) => q.title === action.payload.title,
      );
      const answer = action.payload.answer;
      if(question.answer){
        question.answer.push(answer);
      }else{
        question.answer = [answer];
      }
      
    },
    removeQuestionChoice: (state, action: PayloadAction<any>) => {
      const question = state.questions.find(
        (q: { title: any }) => q.title === action.payload.title,
      );
      const answer = action.payload.answer;

      question.answer = question.answer.filter((a: { name: any; }) => a.name !== answer.name);
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setQuestionsToApp, getAllQuestions, updateQuestion, addQuestionChoice, removeQuestionChoice } = questionsSlice.actions;

export default questionsSlice.reducer;
