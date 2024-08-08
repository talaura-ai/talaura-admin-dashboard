import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { formatAndUniqueSkills } from '../../helpers/utils';

const initialState: any = { skills: [], selectedSkills: [] };

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = formatAndUniqueSkills(action.payload);
    },
    getAllSkills: (state) => {
      return state.skills;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      state.skills = formatAndUniqueSkills([...state.skills, action.payload]);
    },
    addSkillInSelectedSkills: (state, action: PayloadAction<string>) => {
      state.selectedSkills = formatAndUniqueSkills([...state.skills, action.payload]);
    },
    getSelectedSkills: (state) => {
      state.selectedSkills;
    },
    setSelectedSkill: (state, action: PayloadAction<string[]>) => {
      state.selectedSkills = formatAndUniqueSkills(action.payload);
    },
    removeSelectedSkill: (state, action: PayloadAction<any>) => {
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
