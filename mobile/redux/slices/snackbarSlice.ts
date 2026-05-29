import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TSnackbarVariant = "success" | "error" | "warning" | "info";

interface SnackbarState {
  message: string;
  visible: boolean;
  variant: TSnackbarVariant;
}

const initialState: SnackbarState = {
  message: "",
  visible: false,
  variant: "success",
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
      state.visible = true;
      state.variant = action.payload.variant ?? "success";
    },
    setMessage: (
      state,
      action: PayloadAction<{
        message: string;
        messageStatus?: boolean;
        variant?: TSnackbarVariant;
      }>,
    ) => {
      state.message = action.payload.message;
      state.visible = action.payload.messageStatus ?? true;
      state.variant = action.payload.variant ?? "success";
    },
    hideSnackbar: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, setMessage, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
