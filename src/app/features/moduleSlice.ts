import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IModuleType } from '../../helpers/types';

const initialState: {
  modules: IModuleType[];
  selectedModules: IModuleType[];
} = {
  modules: [],
  selectedModules: [],
};

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.modules = [...action.payload.modules];
    },
    addModule: (state, action: PayloadAction<IModuleType>) => {
      const moduleToAdd = state.modules.find((m: { name: any }) => m.name === action.payload.name);
      if (moduleToAdd) {
        state.selectedModules = [...state.selectedModules, moduleToAdd];
      }
    },
    addModuleInModulesAndSelectedModules: (state, action: PayloadAction<any>) => {
      state.selectedModules = [...state.selectedModules, action.payload];
      state.modules = [...state.modules, action.payload];
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
    setModuleSkill: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const selectedModule = state.selectedModules.find((module: any) => {
        return module.name === action.payload.name;
      });
      if (selectedModule) {
        selectedModule.skills.push(action.payload.skill);
      }
    },
    removeModuleSkill: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const selectedModule = state.selectedModules.find((module: any) => {
        return module.name === action.payload.name;
      });
      if (selectedModule) {
        selectedModule.skills = selectedModule.skills.filter(
          (s: any) => s !== action.payload.skill,
        );
      }
    },
    updateWeightage: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const selectedModule = state.selectedModules.find((module: any) => {
        return module.name === action.payload.name;
      });
      if (selectedModule) {
        selectedModule.Weightage = action.payload.Weightage;
      }
    },
    addQuestionToModule: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const selectedModule = state.selectedModules.find((module: IModuleType) => {
        return module.name === action.payload.name;
      });
      if (selectedModule) {
        selectedModule.question = action.payload.question;
      }
    },
    updateDuration: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const selectedModule = state.selectedModules.find((module: any) => {
        return module.name === action.payload.name;
      });
      if (selectedModule) {
        selectedModule.time = action.payload.time;
      }
    },
    resetModulesSlice: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setModules,
  addModule,
  setSelectedModule,
  removeSelectedModule,
  setModuleSkill,
  removeModuleSkill,
  updateWeightage,
  addQuestionToModule,
  resetModulesSlice,
  updateDuration,
  addModuleInModulesAndSelectedModules,
} = modulesSlice.actions;

export default modulesSlice.reducer;
