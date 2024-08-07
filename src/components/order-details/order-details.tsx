import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "./order-details.module.css";
import useAppSelector from "../../hooks/useAppSelector";

export default function OrderDetails() {
  const orderFromApi = useAppSelector((store) => store.orderDetails.orderFromApi);

  return (
    <div className={orderStyles.order_wrapper}>
      <p className="text_type_digits-large mt-10">{orderFromApi!.order.number}</p>
      <p className="text_type_main-medium mt-10">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
