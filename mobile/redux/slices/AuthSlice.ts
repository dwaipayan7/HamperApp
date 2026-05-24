// import { TSnackbarVariant } from "@/types";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store/store";
// import ApiUtility, { IApiResponse } from "../../utils/api";

// export interface INameId {
//   name: string;
//   id: string;
// }
// interface company {
//   id: string;
//   name: string;
//   isDefault: boolean;
//   branches: {
//     id: string;
//     name: string;
//     isDefault: boolean;
//   }[];
// }

// interface IAuthState {
//   fcmToken: string;
//   isAuthenticated: boolean;
//   token: string;
//   initialAuthLoading: boolean;
//   id: string;
//   name: string;
//   email: string;
//   tokenExpiry: number;
//   message: string;
//   messageStatus: boolean;
//   snackbarVariant: TSnackbarVariant;
// }

// const initialState: IAuthState = {
//   fcmToken: "",
//   id: "",
//   name: "",
//   email: "",
//   tokenExpiry: 0,
//   isAuthenticated: false,
//   token: "",
//   initialAuthLoading: false,
//   message: "",
//   messageStatus: false,
//   snackbarVariant: "info",
// };

// export const SLICE_NAME = "auth";

// export const loginUser = createAsyncThunk(
//   `${SLICE_NAME}/login`,
//   async (
//     { email, password }: { email: string; password: string },
//     thunkApi,
//   ) => {
//     try {
//       const state = thunkApi.getState() as RootState;
//       //getting the fcm Token
//       const fcmToken = state.auth.fcmToken as any;

//       // console.log('The fcm Token is: ', fcmToken);

//       const response = await ApiUtility.post<IApiResponse<IAuthState>>(
//         `/Auth/Login`,
//         {
//           userName: email,
//           password,
//           fcm_Token: {
//             token: fcmToken || "",
//             medium: 1,
//           },
//         },
//       );

//       // console.log("The Response is: ", response);

//       if (!response?.status) {
//         return thunkApi.rejectWithValue(response);
//       }

//       return response;
//     } catch (error: any) {
//       return thunkApi.rejectWithValue(error?.response?.data || "Login failed");
//     }
//   },
// );

// export const logout = createAsyncThunk(
//   `${SLICE_NAME}/logout`,
//   async (
//     {
//       fcmToken,
//     }: {
//       fcmToken: string;
//     },
//     thunkApi,
//   ) => {
//     const response = await ApiUtility.post<IApiResponse<IAuthState>>(
//       `/Auth/Logout`,
//       {
//         fcmToken: fcmToken,
//       },
//     );
//     if (!response) {
//       return thunkApi.rejectWithValue(response);
//     }
//     console.log("The ForgotPassword Data is: ", response);
//     return response;
//   },
// );

// const authSlice = createSlice({
//   name: `${SLICE_NAME}`,
//   initialState: initialState,
//   reducers: {
//     setLogout: (state) => {
//       state.isAuthenticated = false;
//       state.token = "";
//       state.fcmToken = "";
//     },

//     setClearAuthState: (state) => {
//       state.token = "";
//       state.isAuthenticated = false;
//       state.fcmToken = "";
//     },
//     setFCMToken: (state, action) => {
//       state.fcmToken = action.payload;
//     },
//     setMessage: (
//       state,
//       action: PayloadAction<{
//         message: string;
//         messageStatus: boolean;
//         snackbarVariant?: TSnackbarVariant;
//       }>,
//     ) => {
//       state.message = action.payload.message;
//       state.messageStatus = action.payload.messageStatus;
//       state.snackbarVariant = action.payload.snackbarVariant || "info";
//     },
//     clearMessage: (state) => {
//       state.message = "";
//       state.messageStatus = false;
//       state.initialAuthLoading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(logout.fulfilled, (state) => {
//       state.initialAuthLoading = false;
//       state.isAuthenticated = false;
//       state.token = "";
//       state.fcmToken = "";
//       state.email = "";
//       state.name = "";
//       state.id = "";
//     });

//     builder.addCase(logout.rejected, (state, action) => {
//       state.initialAuthLoading = false;
//       state.isAuthenticated = false;
//       state.messageStatus = true;
//       state.message = action?.payload?.message;
//       state.token = "";
//       // state.message = action.payload;
//       // state.messageStatus = !!action.payload?.message;
//       state.snackbarVariant = "warning";
//     });
//     builder.addCase(loginUser.pending, (state) => {
//       state.initialAuthLoading = true;
//     });
//     builder.addCase(loginUser.fulfilled, (state, { payload }) => {
//       state.isAuthenticated = true;
//       state.token = payload?.result?.token || "";
//       state.email = payload?.result?.email || "";
//       state.name = payload?.result?.name || "";
//       state.id = payload?.result?.id || "";

//       state.tokenExpiry = payload?.result?.tokenExpiry || 0;
//       state.initialAuthLoading = false;
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       state.initialAuthLoading = false;
//       state.isAuthenticated = false;
//       state.messageStatus = true;
//       state.message = action?.payload?.message;
//       state.token = "";
//       // state.message = action.payload;
//       // state.messageStatus = !!action.payload?.message;
//       state.snackbarVariant = "warning";
//     });
//   },
// });
// export const {
//   setClearAuthState,
//   setFCMToken,
//   setMessage,
//   clearMessage,
//   setLogout,
// } = authSlice.actions;

// export default authSlice.reducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state[SLICE_NAME].isAuthenticated;
// export const empId = (state: RootState) => state[SLICE_NAME].id;
// export const selectInitialAuthLoading = (state: RootState) =>
//   state[SLICE_NAME].initialAuthLoading;
// export const selectAuthToken = (state: RootState) => state[SLICE_NAME].token;
// export const selectFCMToken = (state: RootState) => state[SLICE_NAME].fcmToken;
// export const selectCurrentUsername = (state: RootState) =>
//   state[SLICE_NAME].name;
