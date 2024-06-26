import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import { useModal } from "../../../hooks/useModal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import itemStyles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";
import { useDrag } from "react-dnd";

export default function IngredientItem(props) {
  const location = useLocation();

  const ingredientId = props.info["_id"];
  const onClick = () => {
    props.onClick(props.info);
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "dndContainer",
    item: props.info,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li className={itemStyles.cart}>
      {props.count > 0 ? <Counter count={props.count} size="small" /> : ""}
      <Link
        key={ingredientId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        ref={dragRef}
        className={`${isDragging ? itemStyles.cart_opacity : itemStyles.cart} ${
          itemStyles.link
        }`}
      >
        <img className="ml-1 mr-1" src={props.info.image} alt={props.info.name}></img>
        <div className={itemStyles.price}>
          <CurrencyIcon type="primary" />
          <p className="m-1 text_type_main-default">{props.info.price}</p>
        </div>
        <p className="text_type_main-default">{props.info.name}</p>
      </Link>
    </li>
  );
}

IngredientItem.propTypes = {
  info: ingredientType.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
};
