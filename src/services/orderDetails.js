import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderApi } from "../utils/burger-api";

const initialState = {
  orderFromApi: {},
  loading: false,
  error: null,
};

export const postOrder = createAsyncThunk(
  "postOrder/handleAndPlaceOrder",
  async (itemIds) => {
    return await postOrderApi(itemIds);
  }
);

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderFromApi = action.payload;
      })
      .addCase(postOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
