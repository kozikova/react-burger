import groupStyles from "./ingredient-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";

export default function IngredientGroup(props) {
  return (
    <div className={groupStyles.layout}>
      <p className="text text_type_main-default mt-10">
        {props.categoryName}
      </p>
      <ul className={groupStyles.ingredients_grid}>
        {props.list.map((item) => (
          <IngredientItem info={item} key={item._id}/>
        ))}
      </ul>
    </div>
  );
}

IngredientGroup.propTypes = {
  categoryName: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ).isRequired,
};
