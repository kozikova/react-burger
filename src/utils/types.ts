import { v4 as uuidv4 } from "uuid";

export interface IIngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IIngredientTypeWithKey extends IIngredientType {
  key: string;
}

export interface IIngredientTypeWithCount extends IIngredientType {
  count: number;
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface IWebsocketOrder {
  _id: string;
  status: "done" | "pending" | "created";
  ingredients: Array<string>;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IWebsocketOrderResponse {
  success: boolean;
  orders: Array<IWebsocketOrder>;
  total: number;
  totalToday: number;
}
