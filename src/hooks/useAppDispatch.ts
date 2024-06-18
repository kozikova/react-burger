import { useDispatch } from "react-redux";
import { store } from "../services/store";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
