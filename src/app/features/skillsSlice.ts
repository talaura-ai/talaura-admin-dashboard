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
      if (Array.isArray(action.payload)) {
        state.skills = Array.from(new Set(action.payload));
      } else {
        state.skills = action.payload;
      }
    },
    getAllSkills: (state) => {
      return state.skills;
    },
    addSkill: (state, action: PayloadAction<any>) => {
      const finalSkills = new Set([...state.skills, action.payload]);
      state.skills = Array.from(finalSkills);
    },
    addSkillInSelectedSkills: (state, action: PayloadAction<any>) => {
      const finalSkills = new Set([...state.selectedSkills, action.payload]);

      state.selectedSkills = Array.from(finalSkills);
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
      if (Array.isArray(action.payload)) {
        state.selectedSkills = Array.from(new Set(action.payload));
      } else {
        const finalSkills = new Set([...state.selectedSkills, action.payload]);
        state.selectedSkills = Array.from(finalSkills);
      }
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
