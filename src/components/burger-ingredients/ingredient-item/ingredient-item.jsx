import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemStyles from "./ingredient-item.module.css";
import PropTypes from "prop-types";

export default function IngredientItem(props) {
  return <li className={itemStyles.cart}>
    <Counter count={1} size="small" />
    <img className="ml-1 mr-1" src={props.info.image} alt={props.info.name}></img>
    <div className={itemStyles.price}>
    <CurrencyIcon type="primary" /><p className="m-1 text_type_main-default">{props.info.price}</p>
    </div>
    <p className="text_type_main-default">{props.info.name}</p>
  </li>;
}

IngredientItem.propTypes = {
  info: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }).isRequired,
};
