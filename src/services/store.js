import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burgerIngredients";
import { burgerConstructorSlice } from "./burgerConstructor";
import { ingredientDetailsSlice } from "./ingredientDetails";
import { orderDetailsSlice } from "./orderDetails";
import { userSlice } from "./userData";

/*const preloadedState = {
  burgerConstructor: { items: [], bun: null },
  ingredients: { ingredients: [], loading: false, error: false },
  ingredientDetails: { info: {} },
  orderDetails: {},
};*/

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    userData: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  //preloadedState,
});
