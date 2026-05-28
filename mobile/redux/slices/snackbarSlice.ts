// snackbarSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SnackbarVariant = "success" | "error" | "warning" | "info";

interface SnackbarState {
  visible: boolean;
  message: string;
  variant: SnackbarVariant;
}

const initialState: SnackbarState = {
  visible: false,
  message: "",
  variant: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        variant?: SnackbarVariant;
      }>,
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.variant = action.payload.variant || "info";
    },

    hideSnackbar: (state) => {
      state.visible = false;
      state.message = "";
      state.variant = "info";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
