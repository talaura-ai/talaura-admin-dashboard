import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';
import { rootReducers } from './rootReducers';
import { assessmentProfilesApi } from './services/assessmentProfiles';
import { assessmentApi } from './services/assessments';
import { authApi } from './services/auth';
import { candidatesApi } from './services/candidates';

const persistConfig = {
  key: 'root1',
  storage,
  whitelist: ['admin', 'inviteCandidate', 'assessments'],
  // blacklist: ["admin"]
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// ...

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(thunk)
      .concat(authApi.middleware)
      .concat(assessmentApi.middleware)
      .concat(assessmentProfilesApi.middleware)
      .concat(assessmentProfilesApi.middleware)
      .concat(candidatesApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
