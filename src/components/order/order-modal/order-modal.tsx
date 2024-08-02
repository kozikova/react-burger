import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { FC } from "react";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useAppSelector from "../../../hooks/useAppSelector";
import {
  IIngredientType,
  IIngredientTypeWithCount,
  IWebsocketOrder,
} from "../../../utils/types";
import { useResolvedPath } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { wsConnect, wsDisconnect } from "../../../services/actions";
import { normaApi, webSocketApi } from "../../../utils/urls";
import orderModalStyles from "./order-modal.module.css";

export const OrderModal: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();
  const feedOrders = useAppSelector((state) => state.feed.websocketOrderResponse?.orders);
  const profileOrders = useAppSelector(
    (state) => state.profileOrders.websocketOrderResponse?.orders
  );
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);

  const match = useResolvedPath("").pathname;

  const [currentOrder, setCurrentOrder] = useState<IWebsocketOrder | undefined>(
    undefined
  );

  useEffect(() => {
   if (match.includes("profile")) {
      const rawToken = localStorage.getItem("accessToken");
      const token = rawToken!.split(" ")[1];
      dispatch(wsConnect(`${webSocketApi}/orders?token=${token}`));     
    }
    if (match.includes("feed")) {
      dispatch(wsConnect(`${webSocketApi}/orders/all`));
     
    }
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    if (match.includes("profile")) {  
      setCurrentOrder(
        profileOrders ? profileOrders.find((item) => item._id === number) : undefined
      );
    }
    if (match.includes("feed")) {
     
      setCurrentOrder(
        feedOrders ? feedOrders.find((item) => item._id === number) : undefined
      );
  }
   
  }, [feedOrders, match, number, profileOrders]);
  

  useEffect(() => {
    if (currentOrder) return;

    const url = `${normaApi}/orders/${number}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.orders && data.orders.length > 0) {
          setCurrentOrder(data.orders[0]);
        }
      })
      .catch((error) => {
        console.error("Ошибка :", error);
      });
  }, [number, currentOrder]);

  const { orderIngredients, totalPrice } = useMemo(() => {
    let totalPrice = 0 as number;
    const orderIngredients = [] as Array<IIngredientTypeWithCount>;

    currentOrder?.ingredients.forEach((item) => {
      const ingredient = ingredients.find((ingredient) => ingredient._id === item);
      if (ingredient) {
        if (!orderIngredients.find((i) => i._id === ingredient._id)) {
          orderIngredients.push({ ...ingredient, count: 1 });
          totalPrice += ingredient.price;
        } else {
          orderIngredients.forEach((i) => {
            if (i._id === ingredient._id) {
              i.count = i.count + 1;
              totalPrice += ingredient.price;
            }
          });
        }
      }
    });

    return { orderIngredients, totalPrice };
  }, [ingredients, currentOrder]);

  if (!currentOrder) {
    return <p>Заказ пока не загрузился...</p>;
  }

  return (
    <div className={orderModalStyles.wrapper}>
      <p className="text text_type_digits-default">{`#${currentOrder.number}`}</p>
      <div className={orderModalStyles.header}>        
        <p className="text text_type_main-medium">{currentOrder.name}</p>
        <p
          className={`${
            currentOrder.status === "done" ? orderModalStyles.done : ""
          } text text_type_main-default`}
        >
          {currentOrder.status === "done"
            ? "Выполнен"
            : currentOrder.status === "pending"
            ? "Готовится"
            : currentOrder.status === "created"
            ? "Создан"
            : "Выполнен"}
        </p>
        <p className="text text_type_main-medium">Состав:</p>
      </div>
      <ul className={orderModalStyles.list}>
        {orderIngredients.map((ingredient) => (
          <li key={ingredient._id} className={orderModalStyles.item}>
            <img
              className={orderModalStyles.ingredientIcon}
              src={ingredient.image_mobile}
              alt="Иконка"
            />
            <p className="text text_type_digits-default">{ingredient.name}</p>
            <div className={orderModalStyles.priceContainer}>
              <span className="text text_type_digits-default">{`${ingredient.count} x ${ingredient.price}`}</span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={orderModalStyles.footer}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(currentOrder.createdAt)}
        />
        <div className={orderModalStyles.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
