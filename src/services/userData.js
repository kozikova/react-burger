import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserApi,
  loginApi,
  registerApi,
  logoutApi,
  patchUser,
  passwordResetApi,
  passwordResetResetApi,
} from "../utils/burger-api";

const initialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
};

export const authUser = createAsyncThunk("user/getAuthUser", async () => {
  return await getUserApi();
});

export const loginAction = createAsyncThunk("user/login", async (arg) => {
  return await loginApi(arg);
});

export const logoutAction = createAsyncThunk("user/logout", async () => {
  return await logoutApi();
});

export const patchUserAction = createAsyncThunk("user/patchUser", async (arg) => {
  return await patchUser(arg);
});

export const passwordResetAction = createAsyncThunk("user/passwordReset", async (arg) => {
  return await passwordResetApi(arg);
});

export const passwordResetResetAction = createAsyncThunk(
  "user/passwordResetReset",
  async (arg) => {
    return await passwordResetResetApi(arg);
  }
);

export const registerAction = createAsyncThunk("user/register", async (arg) => {
  return await registerApi(arg);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(passwordResetResetAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(passwordResetResetAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordResetResetAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(passwordResetAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(passwordResetAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordResetAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(patchUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(patchUserAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
