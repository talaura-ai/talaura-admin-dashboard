import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = { skills: [], selectedSkills: [] };

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.skills = [...action.payload];
    },
    getAllSkills: (state) => {
      return state.skills;
    },
    addSkill: (state, action: PayloadAction<any>) => {
      state.skills = [...state.skills, action.payload];
    },
    addSkillInSelectedSkills: (state, action: PayloadAction<any>) => {
      state.selectedSkills = [...state.selectedSkills, action.payload];
    },
    getSelectedSkills: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedSkills;
    },
    setSelectedSkill: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedSkills = [...state.selectedSkills, action.payload];
    },
    removeSelectedSkill: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedSkills = state.selectedSkills.filter((item: string) => item !== action.payload);
    },
    resetSkillsSlice: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setSkills,
  getAllSkills,
  addSkill,
  getSelectedSkills,
  setSelectedSkill,
  removeSelectedSkill,
  resetSkillsSlice,
  addSkillInSelectedSkills,
} = skillsSlice.actions;

export default skillsSlice.reducer;
