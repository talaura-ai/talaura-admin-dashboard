import adminReducer from "./features/adminSlice";
import { authApi } from "./services/auth";
import { combineReducers } from "redux";
import assessmentsReducer from "./features/assessmentsSlice";
import assessmentProfilesReducer from "./features/assessmentProfiles";
import { assessmentApi } from "./services/assessments";
import { assessmentProfilesApi } from "./services/assessmentProfiles";
import skillsReducer from "./features/skillsSlice";

export const rootReducers = combineReducers({
  admin: adminReducer,
  assessments: assessmentsReducer,
  assessmentProfles: assessmentProfilesReducer,
  skills : skillsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [assessmentApi.reducerPath]: assessmentApi.reducer,
  [assessmentProfilesApi.reducerPath]: assessmentProfilesApi.reducer,
});
