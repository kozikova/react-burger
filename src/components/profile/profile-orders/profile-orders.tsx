import { useEffect } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { OrderList } from "../../order/order-list/order-list";
import profileOrderStyles from "./profile-orders.module.css";
import { wsConnect, wsDisconnect } from "../../../services/actions";
import { webSocketApi } from "../../../utils/urls";

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    dispatch(wsConnect(`${webSocketApi}/orders?token=${token}`));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={profileOrderStyles.wrapper}>
      <OrderList fromProfile={true} />
    </div>
  );
};
