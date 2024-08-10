import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus, IWebsocketOrderResponse } from "../utils/types";

type TInitialState = {
  websocketOrderResponse: IWebsocketOrderResponse | null;
  status: WebsocketStatus;
  connectionError: string | null;
};

export const initialState: TInitialState = {
  websocketOrderResponse: null,
  status: WebsocketStatus.OFFLINE,
  connectionError: null,
};

export const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    wsProfileConnecting(state) {
      state.status = WebsocketStatus.CONNECTING;
      state.connectionError = null;
    },
    wsProfileOpen(state) {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsProfileClose(state) {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsProfileMessage(state, action: PayloadAction<IWebsocketOrderResponse>) {
      state.websocketOrderResponse = action.payload;
    },
    wsProfileError(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
  },
});

export const {
  wsProfileConnecting,
  wsProfileOpen,
  wsProfileClose,
  wsProfileMessage,
  wsProfileError,
} = profileOrdersSlice.actions;
