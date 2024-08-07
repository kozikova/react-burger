import { FC } from "react";
import { OrderItem } from "../order-item/order-item";
import useAppSelector from "../../../hooks/useAppSelector";
import { IWebsocketOrder } from "../../../utils/types";
import orderListStyles from "./order-list.module.css";

type TOrderListProps = {
  fromProfile: boolean;
};

export const OrderList: FC<TOrderListProps> = ({ fromProfile }) => {
  const allOrders = useAppSelector((state) => state.feed.websocketOrderResponse?.orders);
  const profileOrders = useAppSelector(
    (state) => state.profileOrders.websocketOrderResponse?.orders
  );
  const orders = fromProfile ? profileOrders : allOrders;

  if (!orders || orders.length === 0) {
    return <p>Нет данных</p>;
  }

  return (
    <section className={orderListStyles.wrapper}>
      <ul className={orderListStyles.ul}>
        {orders.map((order: IWebsocketOrder) => (
          <OrderItem order={order} key={order._id} fromProfile={fromProfile} />
        ))}
      </ul>
    </section>
  );
};
