import groupStyles from "./ingredient-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";
import { getIngredientCounts } from "../../../services/burgerConstructor";
import { useSelector } from "react-redux";

export default function IngredientGroup(props) {
  const countObject = useSelector(getIngredientCounts);

  return (
    <div className={groupStyles.layout}>
      <ul className={groupStyles.ingredients_grid}>
        {props.list.map((item) => (
          <IngredientItem info={item} key={item._id} count={countObject[item._id]} />
        ))}
      </ul>
    </div>
  );
}

IngredientGroup.propTypes = {
  list: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
