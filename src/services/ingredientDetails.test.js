import { ingredientDetailsSlice, initialState, open, close } from "./ingredientDetails";

describe("ingredientDetails", () => {
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
    expect(ingredientDetailsSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handle open", () => {
    const result = ingredientDetailsSlice.reducer(initialState, open(testIngredient));
    expect(result).toEqual({
      ...initialState,
      info: testIngredient,
    });
  });

  it("handle close", () => {
    const result = ingredientDetailsSlice.reducer(initialState, close());
    expect(result).toEqual(initialState);
  });
});
