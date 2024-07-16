import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AssessmentsState } from '../../helpers/types';

const initialState: AssessmentsState[] = [];

export const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {
    getAll: (_state, action: PayloadAction<AssessmentsState[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return [...action.payload];
    },

    getByName: (state, action: PayloadAction<{ assessmentId: string }>) => {
      const { assessmentId } = action.payload;
      state.filter((assessment) => assessment.name === assessmentId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAll, getByName } = assessmentsSlice.actions;

export default assessmentsSlice.reducer;
