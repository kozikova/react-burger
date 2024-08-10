import {
  userSlice,
  initialState,
  setUser,
  setIsAuthChecked,
  logoutAction,
  passwordResetResetAction,
  passwordResetAction,
  patchUserAction,
  registerAction,
  loginAction,
  authUser,
} from "./userData";
describe("user", () => {
  const testUser = {
    email: "llll@mail.ru",
    name: "Alice",
    password: "1qwerty",
  };

  test("should return the initial state", () => {
    expect(userSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handle setUser", () => {
    const result = userSlice.reducer(initialState, setUser(testUser));
    expect(result).toEqual({
      ...initialState,
      user: testUser,
    });
  });

  it("handle setIsAuthChecked", () => {
    const result = userSlice.reducer(initialState, setIsAuthChecked(true));
    expect(result).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it("logoutAction.fullfilled", () => {
    const action = {
      type: logoutAction.fulfilled.type,
    };

    const state = {
      ...initialState,
      user: testUser,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      user: null,
    });
  });

  it("passwordResetResetAction.fullfilled", () => {
    const testMessage = {
      message: "success",
    };

    const action = {
      type: passwordResetResetAction.fulfilled.type,
      payload: testMessage,
    };

    const state = {
      ...initialState,
      loading: true,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      message: testMessage.message,
    });
  });

  it("passwordResetResetAction.pending", () => {
    const action = {
      type: passwordResetResetAction.pending.type,
    };

    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("passwordResetResetAction.rejected", () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: passwordResetResetAction.rejected.type,
      payload: "Test Error",
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: action.payload,
    });
  });

  it("passwordResetAction.fullfilled", () => {
    const testMessage = {
      message: "success",
    };

    const action = {
      type: passwordResetAction.fulfilled.type,
      payload: testMessage,
    };

    const state = {
      ...initialState,
      loading: true,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      message: testMessage.message,
    });
  });

  it("passwordResetAction.pending", () => {
    const action = {
      type: passwordResetAction.pending.type,
    };

    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("passwordResetAction.rejected", () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: passwordResetAction.rejected.type,
      payload: "Test Error",
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: action.payload,
    });
  });

  it("patchUserAction.fullfilled", () => {
    const testUserResponse = {
      user: testUser,
    };

    const action = {
      type: patchUserAction.fulfilled.type,
      payload: testUserResponse,
    };

    const state = {
      ...initialState,
      loading: true,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      user: testUser,
    });
  });

  it("patchUserAction.pending", () => {
    const action = {
      type: patchUserAction.pending.type,
    };

    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("patchUserAction.rejected", () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: patchUserAction.rejected.type,
      payload: "Test Error",
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: action.payload,
    });
  });

  it("registerAction.fullfilled", () => {
    const testUserResponse = {
      user: testUser,
    };

    const action = {
      type: registerAction.fulfilled.type,
      payload: testUserResponse,
    };

    const state = {
      ...initialState,
      loading: true,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      user: testUser,
      isAuthChecked: true,
    });
  });

  it("registerAction.pending", () => {
    const action = {
      type: registerAction.pending.type,
    };

    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("registerAction.rejected", () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: registerAction.rejected.type,
      payload: "Test Error",
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: action.payload,
    });
  });

  it("loginAction.fullfilled", () => {
    const testUserResponse = {
      user: testUser,
    };

    const action = {
      type: loginAction.fulfilled.type,
      payload: testUserResponse,
    };

    const state = {
      ...initialState,
      loading: true,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      user: testUser,
      isAuthChecked: true,
    });
  });

  it("loginAction.pending", () => {
    const action = {
      type: loginAction.pending.type,
    };

    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("loginAction.rejected", () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: loginAction.rejected.type,
      payload: "Test Error",
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: action.payload,
    });
  });

  it("authUser.fullfilled", () => {
    const testUserResponse = {
      user: testUser,
    };

    const action = {
      type: authUser.fulfilled.type,
      payload: testUserResponse,
    };

    const state = {
      ...initialState,
      loading: true,
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      user: testUser,
      isAuthChecked: true,
    });
  });

  it("authUser.pending", () => {
    const action = {
      type: authUser.pending.type,
    };

    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("authUser.rejected", () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: authUser.rejected.type,
      payload: "Test Error",
    };

    const result = userSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: action.payload,
    });
  });
});
