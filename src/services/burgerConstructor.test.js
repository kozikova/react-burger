import {
  addBun,
  addItem,
  burgerConstructorSlice,
  deleteItem,
  clear,
  initialState,
  total,
  setNewPosition,
} from "./burgerConstructor";

describe("burgerConstructor", () => {
  const testKey = "00000000-0000-0000-0000-000000000000";

  const testBun = {
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

  const testIngredient = {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  };

  test("should return the initial state", () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handle add bun", () => {
    const result = burgerConstructorSlice.reducer(initialState, addBun(testBun));
    expect(result).toEqual({
      ...initialState,
      bun: testBun,
    });
  });

  it("handle add item", () => {
    const result = burgerConstructorSlice.reducer(initialState, addItem(testIngredient));
    expect(result.items.length).toEqual(1);
    expect(result.items[0].key).toBeDefined();

    const key = result.items[0].key;

    expect(result).toEqual({
      ...initialState,
      items: [{ ...testIngredient, key: key }],
    });
  });

  it("handle delete item", () => {
    let state = {
      ...initialState,
      items: [{ ...testIngredient, key: testKey }],
    };

    const result = burgerConstructorSlice.reducer(state, deleteItem(testKey));

    expect(result).toEqual(initialState);
  });

  it("handle clear", () => {
    let state = {
      ...initialState,
      items: [{ ...testIngredient, key: testKey }],
      bun: testBun,
      totalPrice: 4500,
    };

    const result = burgerConstructorSlice.reducer(state, clear());

    expect(result).toEqual(initialState);
  });

  it("handle total", () => {
    let state = {
      ...initialState,
      items: [{ ...testIngredient, key: testKey }],
      bun: testBun,
    };

    const result = burgerConstructorSlice.reducer(state, total());

    expect(result).toEqual({ ...state, totalPrice: 3498 });
  });

  it("handle setNewPosition", () => {
    let state = {
      ...initialState,
      items: [
        { ...testIngredient, key: "00000000-0000-0000-0000-000000000000" },
        { ...testIngredient, key: "10000000-0000-0000-0000-000000000000" },
      ],
    };

    const payload = {
      dragIndex: 0,
      hoverIndex: 1,
    };

    const result = burgerConstructorSlice.reducer(state, setNewPosition(payload));

    expect(result).toEqual({
      ...initialState,
      items: [
        { ...testIngredient, key: "10000000-0000-0000-0000-000000000000" },
        { ...testIngredient, key: "00000000-0000-0000-0000-000000000000" },
      ],
    });
  });
});
