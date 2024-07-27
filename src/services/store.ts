import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burgerIngredients";
import { burgerConstructorSlice } from "./burgerConstructor";
import { ingredientDetailsSlice } from "./ingredientDetails";
import { orderDetailsSlice } from "./orderDetails";
import { userSlice } from "./userData";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    userData: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
