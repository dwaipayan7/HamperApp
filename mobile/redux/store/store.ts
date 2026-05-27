import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import snackbarReducer from "../slices/snackbarSlice";
import AuthSlice from "../slices/AuthSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistConfigAuth = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedSnackBarSlice = persistReducer(persistConfig, snackbarReducer);
const persistedAuthSlice = persistReducer(persistConfigAuth, AuthSlice);

export const store = configureStore({
  reducer: {
    snackbar: persistedSnackBarSlice,
    auth: persistedAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
