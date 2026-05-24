import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSnackbarVariant } from "@/types";

interface SnackbarState {
  message: string;
  visible: boolean;
  variant: TSnackbarVariant;
}

const initialState: SnackbarState = {
  message: "",
  visible: false,
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
        variant?: TSnackbarVariant;
      }>,
    ) => {
      state.message = action.payload.message;

      state.variant = action.payload.variant || "info";

      state.visible = true;
    },

    hideSnackbar: (state) => {
      state.visible = false;

      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
