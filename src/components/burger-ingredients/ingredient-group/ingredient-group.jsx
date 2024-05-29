import groupStyles from "./ingredient-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";

export default function IngredientGroup(props) {
  return (
    <div className={groupStyles.layout}>
      <p className="text text_type_main-default mt-10">{props.categoryName}</p>
      <ul className={groupStyles.ingredients_grid}>
        {props.list.map((item) => (
          <IngredientItem info={item} key={item._id} onClick={props.onItemClick} />
        ))}
      </ul>
    </div>
  );
}

IngredientGroup.propTypes = {
  categoryName: PropTypes.string,
  list: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
