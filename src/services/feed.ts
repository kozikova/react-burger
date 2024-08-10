import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WebsocketStatus,
  IWebsocketOrder,
  IWebsocketOrderResponse,
} from "../utils/types";

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

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING;
      state.connectionError = null;
    },
    wsOpen(state) {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsClose(state) {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsMessage(state, action: PayloadAction<IWebsocketOrderResponse>) {
      state.websocketOrderResponse = action.payload;
    },
    wsError(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsMessage, wsError } = feedSlice.actions;
