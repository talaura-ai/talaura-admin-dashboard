import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { rootReducers } from "./rootReducers";
import { assessmentApi } from "./services/assessments";
import { assessmentProfilesApi } from "./services/assessmentProfiles";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin"],
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
      .concat(assessmentProfilesApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
