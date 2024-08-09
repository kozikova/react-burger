import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IIngredientType } from "../utils/types";

type TInitialState = {
  info: IIngredientType | null;
};

export const initialState: TInitialState = {
  info: null,
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    open: (state, action) => {
      state.info = action.payload;
    },
    close: (state, action) => {
      state.info = null;
    },
  },
});

export const { open, close } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
