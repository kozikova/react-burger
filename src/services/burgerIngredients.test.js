import { ingredientsSlice, initialState, getIngredients } from "./burgerIngredients";

describe("ingredientsSlice", () => {
  const testIngredient = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  };

  test("should return the initial state", () => {
    expect(ingredientsSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("loadIngredients.pending", () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("loadIngredients.rejected", () => {
    const action = { type: getIngredients.rejected.type, payload: "Test error" };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: "Test error" });
  });

  it("loadIngredients.fullfilled", () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: { data: [testIngredient, testIngredient] },
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [testIngredient, testIngredient],
    });
  });
});
