import { combineReducers } from 'redux';
import adminReducer from './features/adminSlice';
import assessmentProfilesReducer from './features/assessmentProfiles';
import assessmentsReducer from './features/assessmentsSlice';
import inviteCandidateReducer from './features/inviteCandidateSlice';
import moduleReducer from './features/moduleSlice';
import questionsReducer from './features/questions';
import skillsReducer from './features/skillsSlice';
import { assessmentProfilesApi } from './services/assessmentProfiles';
import { assessmentApi } from './services/assessments';
import { authApi } from './services/auth';
import { candidatesApi } from './services/candidates';

export const rootReducers = combineReducers({
  admin: adminReducer,
  assessments: assessmentsReducer,
  assessmentProfles: assessmentProfilesReducer,
  skills: skillsReducer,
  modules: moduleReducer,
  questions: questionsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [assessmentApi.reducerPath]: assessmentApi.reducer,
  [assessmentProfilesApi.reducerPath]: assessmentProfilesApi.reducer,
  inviteCandidate: inviteCandidateReducer,
  // [authApi.reducerPath]: authApi.reducer,
  // [assessmentApi.reducerPath]: assessmentApi.reducer,
  // [assessmentProfilesApi.reducerPath]: assessmentProfilesApi.reducer,
  [candidatesApi.reducerPath]: candidatesApi.reducer,
});
