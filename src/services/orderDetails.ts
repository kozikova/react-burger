import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderApi, TOrder, TPostOrderResponse } from "../utils/burger-api";

type TInitialState = {
  orderFromApi: TPostOrderResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  orderFromApi: null,
  loading: false,
  error: null,
};

export const postOrder = createAsyncThunk(
  "postOrder/handleAndPlaceOrder",
  async (itemIds: string[]) => {
    return await postOrderApi(itemIds);
  }
);

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  selectors: {},
  reducers: {},
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
        state.error = action.payload as string;
      });
  },
});
