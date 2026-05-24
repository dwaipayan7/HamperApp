import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import snackbarReducer from "../slices/snackbarSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedSnackBarSlice = persistReducer(persistConfig, snackbarReducer);

export const store = configureStore({
  reducer: {
    snackbar: persistedSnackBarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
