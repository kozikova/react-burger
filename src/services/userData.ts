import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserApi,
  loginApi,
  registerApi,
  logoutApi,
  patchUser,
  passwordResetApi,
  passwordResetResetApi,
  IUser,
  IPasswordReset,
  IMessage,
  IUserAuth,
  IUserResponse,
} from "../utils/burger-api";

type TInitialState = {
  user: IUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
};

const initialState: TInitialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
  message: null,
};

export const authUser = createAsyncThunk<IUserResponse>("user/getAuthUser", async () => {
  return await getUserApi();
});

export const loginAction = createAsyncThunk<IUserResponse, Omit<IUser, "name">>(
  "user/login",
  async (arg: Omit<IUser, "name">) => {
    return await loginApi(arg);
  }
);

export const logoutAction = createAsyncThunk("user/logout", async () => {
  return await logoutApi();
});

export const patchUserAction = createAsyncThunk<IUserAuth, IUser>(
  "user/patchUser",
  async (arg) => {
    return await patchUser(arg);
  }
);

export const passwordResetAction = createAsyncThunk<IMessage, Pick<IUser, "email">>(
  "user/passwordReset",
  async (arg: Pick<IUser, "email">) => {
    return await passwordResetApi(arg);
  }
);

export const passwordResetResetAction = createAsyncThunk<IMessage, IPasswordReset>(
  "user/passwordResetReset",
  async (arg: IPasswordReset) => {
    return await passwordResetResetApi(arg);
  }
);

export const registerAction = createAsyncThunk<IUserResponse, IUser>(
  "user/register",
  async (arg: IUser) => {
    return await registerApi(arg);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(
        passwordResetResetAction.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(passwordResetResetAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordResetResetAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        passwordResetAction.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(passwordResetAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordResetAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(patchUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(patchUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(authUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
