import {
  feedSlice,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
  initialState,
} from "./feed";
import { WebsocketStatus } from "../utils/types";

describe("feed", () => {
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
    expect(feedSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handle wsOpen", () => {
    const result = feedSlice.reducer(initialState, wsOpen());

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("handle wsConnecting", () => {
    const result = feedSlice.reducer(initialState, wsConnecting());

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("handle wsClose", () => {
    const state = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
    };
    const result = feedSlice.reducer(state, wsClose());

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("handle wsError", () => {
    const error = "Test error";

    const result = feedSlice.reducer(initialState, wsError(error));

    expect(result).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  it("handle wsMessage", () => {
    const result = feedSlice.reducer(initialState, wsMessage(websocketOrderResponse));

    expect(result).toEqual({
      ...initialState,
      websocketOrderResponse: websocketOrderResponse,
    });
  });
});
