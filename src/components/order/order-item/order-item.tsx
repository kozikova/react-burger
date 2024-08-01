import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useAppSelector from "../../../hooks/useAppSelector";
import orderItemStyles from "./order-item.module.css";
import { IIngredientType, IWebsocketOrder } from "../../../utils/types";

type TOrderItemProps = {
  order: IWebsocketOrder;
  fromProfile: boolean;
};

export const OrderItem: FC<TOrderItemProps> = ({ order, fromProfile }) => {
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const location = useLocation();

  const { orderIngredients, totalPrice } = useMemo(() => {
    let totalPrice = 0 as number;
    const orderIngredients = [] as Array<IIngredientType>;

    order.ingredients.forEach((item) => {
      const ingredient = ingredients.find((ingredient) => ingredient._id === item);
      if (ingredient) {
        orderIngredients.push(ingredient);
        totalPrice += ingredient.price;
      }
    });

    return { orderIngredients, totalPrice };
  }, [ingredients, order.ingredients]);

  return (
    <li className={orderItemStyles.container}>
      <Link
        to={order._id}
        state={{ background: location, totalPrice: totalPrice }}
        className={orderItemStyles.link}
      >
        <div className={orderItemStyles.wrapper}>
          <div className={orderItemStyles.numberWrapper}>
            <p className={orderItemStyles.numberTitle}>{`#${order?.number}`}</p>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order?.createdAt)}
            />
          </div>
          <p className={orderItemStyles.title}>{order.name}</p>
          {fromProfile && (
            <p className={orderItemStyles.status}>
              {order.status === "done"
                ? "Выполнен"
                : order.status === "pending"
                ? "Готовится"
                : order.status === "created"
                ? "Создан"
                : "Выполнен"}
            </p>
          )}
          <div className={orderItemStyles.orderInfo}>
            <div className={orderItemStyles.orderIcons}>
              {orderIngredients.slice(0, 5).map((ingredient, index) => (
                <div
                  key={index}
                  className={orderItemStyles.icon}
                  style={{ zIndex: 5 - index, left: `-${15 * index}px` }}
                >
                  <img
                    className={orderItemStyles.iconImage}
                    src={ingredient.image_mobile}
                    alt="Иконки"
                  />
                </div>
              ))}
              {orderIngredients.length > 5 && (
                <span
                  className={`${orderItemStyles.numberIcon} text text_type_main-default`}
                >{`+${orderIngredients.length - 5}`}</span>
              )}
            </div>
            <div className={orderItemStyles.price}>
              <p className={orderItemStyles.numberTitle}>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
