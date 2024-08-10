import { orderDetailsSlice, initialState, postOrder } from "./orderDetails";
describe("orderDetailsSlice", () => {
  const orderResponse = {
    success: true,
    order: {
      number: 111,
    },
    error: null,
  };

  test("should return the initial state", () => {
    expect(orderDetailsSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("postOrder.pending", () => {
    const action = { type: postOrder.pending.type };
    const state = orderDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("postOrder.rejected", () => {
    const action = { type: postOrder.rejected.type, payload: "Test error" };
    const state = orderDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: "Test error" });
  });

  it("postOrder.fullfilled", () => {
    const action = {
      type: postOrder.fulfilled.type,
      payload: orderResponse,
    };
    const state = orderDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderFromApi: orderResponse,
    });
  });
});
