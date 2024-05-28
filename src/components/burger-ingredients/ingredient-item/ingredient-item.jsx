import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import { useModal } from "../../../hooks/useModal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import itemStyles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";

export default function IngredientItem(props) {
  const onClick = () => {
    props.onClick(props.info);
  };

  return (
    <li className={itemStyles.cart} onClick={onClick}>
      <Counter count={1} size="small" />
      <img className="ml-1 mr-1" src={props.info.image} alt={props.info.name}></img>
      <div className={itemStyles.price}>
        <CurrencyIcon type="primary" />
        <p className="m-1 text_type_main-default">{props.info.price}</p>
      </div>
      <p className="text_type_main-default">{props.info.name}</p>
    </li>
  );
}

IngredientItem.propTypes = {
  info: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired,
};
