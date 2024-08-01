import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burgerIngredients";
import { burgerConstructorSlice } from "./burgerConstructor";
import { ingredientDetailsSlice } from "./ingredientDetails";
import { orderDetailsSlice } from "./orderDetails";
import { userSlice } from "./userData";
import { feedSlice, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./feed";
import { socketMiddleware } from "./socketMiddleware";
import { wsConnect, wsDisconnect } from "./actions";
import {
  profileOrdersSlice,
  wsProfileClose,
  wsProfileConnecting,
  wsProfileError,
  wsProfileMessage,
  wsProfileOpen,
} from "./profileOrders";

const feedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

const profileOrdersMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsProfileConnecting,
  onOpen: wsProfileOpen,
  onClose: wsProfileClose,
  onError: wsProfileError,
  onMessage: wsProfileMessage,
});

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  userData: userSlice.reducer,
  feed: feedSlice.reducer,
  profileOrders: profileOrdersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware, profileOrdersMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type RootReducer = ReturnType<typeof rootReducer>;
