import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [],
  bun: null,
  totalPrice: 0,
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addItem: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },

      prepare: (item) => {
        return { payload: { ...item, key: uuidv4() } };
      },
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    clear: (state, action) => {
      state.bun = null;
      state.items = [];
      state.totalPrice = 0;
    },
    total: (state, action) => {
      state.totalPrice =
        (state.bun ? state.bun.price * 2 : 0) +
        state.items.reduce(
          (prevValue, currentValue) => prevValue + currentValue.price,
          0
        );
    },
    setNewPosition: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const items = [...state.items];
      items.splice(hoverIndex, 0, items.splice(dragIndex, 1)[0]);
      state.items = items;
    },
  },
});

export const getIngredientCounts = createSelector(
  (state) => ({
    ingredients: state.ingredients.ingredients,
    items: state.burgerConstructor.items,
    bun: state.burgerConstructor.bun,
  }),
  ({ ingredients, items, bun }) => {
    const itemFullArray = [bun?._id, ...items.map((item) => item._id), bun?._id];
    console.log("selector");
    return ingredients.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        [currentValue._id]: itemFullArray.filter((item) => item === currentValue._id)
          .length,
      };
    }, {});
  }
);

export const { addBun, addItem, deleteItem, clear, total, setNewPosition } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
