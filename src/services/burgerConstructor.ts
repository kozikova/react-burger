import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IIngredientType, IIngredientTypeWithKey } from "../utils/types";
import { RootState } from "./store";

type TInitialState = {
  items: IIngredientTypeWithKey[];
  bun: IIngredientTypeWithKey | null;
  totalPrice: number;
};

export const initialState: TInitialState = {
  items: [],
  bun: null,
  totalPrice: 0,
};

interface ICountObject {
  [name: string]: number;
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<IIngredientTypeWithKey>) => {
      state.bun = action.payload;
    },
    addItem: {
      reducer: (state, action: PayloadAction<IIngredientTypeWithKey>) => {
        state.items.push(action.payload);
      },

      prepare: (item: IIngredientType) => {
        return { payload: { ...item, key: uuidv4() } };
      },
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    clear: (state) => {
      state.bun = null;
      state.items = [];
      state.totalPrice = 0;
    },
    total: (state) => {
      state.totalPrice =
        (state.bun ? state.bun.price * 2 : 0) +
        state.items.reduce(
          (prevValue, currentValue) => prevValue + currentValue.price,
          0
        );
    },
    setNewPosition: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const items = [...state.items];
      items.splice(hoverIndex, 0, items.splice(dragIndex, 1)[0]);
      state.items = items;
    },
  },
});

export const getIngredientCounts = createSelector(
  (state: RootState) => ({
    ingredients: state.ingredients.ingredients,
    items: state.burgerConstructor.items,
    bun: state.burgerConstructor.bun,
  }),
  ({ ingredients, items, bun }) => {
    const itemFullArray = [
      bun?._id,
      ...items.map((item: IIngredientType) => item._id),
      bun?._id,
    ];
    return ingredients.reduce(
      (accumulator: ICountObject, currentValue: IIngredientType) => {
        return {
          ...accumulator,
          [currentValue._id]: itemFullArray.filter((item) => item === currentValue._id)
            .length,
        };
      },
      {} as ICountObject
    );
  }
);

export const { addBun, addItem, deleteItem, clear, total, setNewPosition } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
