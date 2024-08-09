import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getIngredientsApi, TIngredientsResponse } from "../utils/burger-api";
import { IIngredientType } from "../utils/types";

type TInitialState = {
  ingredients: IIngredientType[];
  loading: boolean;
  error: string | null;
};

export const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const getIngredients = createAsyncThunk("ingredients/getIngredients", async () => {
  return await getIngredientsApi();
});

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  selectors: {
    selectAllIngredients: (state) => state.ingredients,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectAllIngredients } = ingredientsSlice.selectors;
