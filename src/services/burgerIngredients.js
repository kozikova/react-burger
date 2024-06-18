import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsApi } from "../utils/burger-api";

const initialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    return (await getIngredientsApi()).data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  selectors: {
    selectAllIngredients: (state) => state.ingredients,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectAllIngredients } = ingredientsSlice.selectors;
