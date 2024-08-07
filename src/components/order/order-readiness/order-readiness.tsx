import useAppSelector from "../../../hooks/useAppSelector";
import { useMemo } from "react";
import readinessStyles from "./order-readiness.module.css";

export const OrderReadiness = () => {
  const orderResponse = useAppSelector((store) => store.feed.websocketOrderResponse);

  const { readyOrders, inProgressOrders } = useMemo(() => {
    let readyOrders = [] as Array<number>;
    let inProgressOrders = [] as Array<number>;
    if (!orderResponse) {
      return { readyOrders, inProgressOrders };
    }

    orderResponse.orders.forEach((order) => {
      if (order.status === "done") {
        readyOrders.push(order.number);
      } else if (order.status === "pending") {
        inProgressOrders.push(order.number);
      }
    });
    return { readyOrders, inProgressOrders };
  }, [orderResponse]);

  return (
    <div className={readinessStyles.wrapper}>
      <div className={`${readinessStyles.onlineDashboard}`}>
        <div className={readinessStyles.column}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={readinessStyles.statisticBoard}>
            {readyOrders.slice(0, 10).map((orderNumber, index) => (
              <span
                className="text text_type_main-medium"
                style={{ color: `#00cccc` }}
                key={index}
              >
                {orderNumber}
              </span>
            ))}
          </div>
        </div>
        <div className={readinessStyles.column}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={readinessStyles.statisticBoard}>
            {inProgressOrders.slice(0, 10).map((orderNumber, index) => (
              <span className="text text_type_main-medium" key={index}>
                {orderNumber}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за всё время</p>
        <span className="text text_type_digits-large">{orderResponse?.total}</span>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня</p>
        <span className="text text_type_digits-large">{orderResponse?.totalToday}</span>
      </div>
    </div>
  );
};
