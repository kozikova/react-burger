import { FC, useEffect } from "react";
import { wsConnect, wsDisconnect } from "../../services/actions";
import { webSocketApi } from "../../utils/urls";

import feedStyles from "./feed.module.css";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { OrderReadiness } from "../../components/order/order-readiness/order-readiness";
import { OrderList } from "../../components/order/order-list/order-list";

export const ALLORDERS_WEBSOCKET_URL = `${webSocketApi}/orders/all`;

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnect(ALLORDERS_WEBSOCKET_URL));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={feedStyles.wrapper}>
      <div>
        <h1 className={feedStyles.title}>Лента заказов</h1>
        <OrderList fromProfile={false} />
      </div>
      <div>
        <OrderReadiness />
      </div>
    </div>
  );
};
