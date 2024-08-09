import {
  profileOrdersSlice,
  wsProfileClose,
  wsProfileConnecting,
  wsProfileError,
  wsProfileMessage,
  wsProfileOpen,
  initialState,
} from "./profileOrders";
import { WebsocketStatus } from "../utils/types";

describe("profileOrders", () => {
  const websocketOrderResponse = {
    success: true,
    orders: [
      {
        _id: "66b52841119d45001b4fe900",
        ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e"],
        status: "done",
        name: "Флюоресцентный люминесцентный бургер",
        createdAt: "2024-08-08T20:19:13.411Z",
        updatedAt: "2024-08-08T20:19:13.834Z",
        number: 48918,
      },
      {
        _id: "66b5279b119d45001b4fe8fb",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Space флюоресцентный био-марсианский бургер",
        createdAt: "2024-08-08T20:16:27.625Z",
        updatedAt: "2024-08-08T20:16:28.115Z",
        number: 48917,
      },
    ],
    total: 1200,
    totalToday: 100,
  };

  test("should return the initial state", () => {
    expect(profileOrdersSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handle wsProfileOpen", () => {
    const result = profileOrdersSlice.reducer(initialState, wsProfileOpen());

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("handle wsProfileConnecting", () => {
    const result = profileOrdersSlice.reducer(initialState, wsProfileConnecting());

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("handle wsProfileClose", () => {
    const state = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
    };
    const result = profileOrdersSlice.reducer(state, wsProfileClose());

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("handle wsProfileError", () => {
    const error = "Test error";

    const result = profileOrdersSlice.reducer(initialState, wsProfileError(error));

    expect(result).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  it("handle wsProfileMessage", () => {
    const result = profileOrdersSlice.reducer(
      initialState,
      wsProfileMessage(websocketOrderResponse)
    );

    expect(result).toEqual({
      ...initialState,
      websocketOrderResponse: websocketOrderResponse,
    });
  });
});
