import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "WEBSOCKET_CONNECT">("WEBSOCKET_CONNECT");
export const wsDisconnect = createAction("WEBSOCKET_DISCONNECT");
