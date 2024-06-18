import { useSelector } from "react-redux";
import { store } from "../services/store";

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
