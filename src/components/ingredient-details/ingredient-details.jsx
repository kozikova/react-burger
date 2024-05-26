import ingredientStyles from "./ingredient-details.module.css";
import ingredientType from "../../utils/types";

export default function IngredientDetails(props) {
  return (
    <div className={ingredientStyles.ingredient_details_wrapper}>
      <img
        className={ingredientStyles.ingredient_image}
        src={props.info.image_large}
        alt={props.info.name}
      />
      <p className="text_type_main-medium mt-8">{props.info.name}</p>
      <div className={ingredientStyles.info_wrapper}>
        <div className={ingredientStyles.info_item}>
          <p>Калории,ккал</p>
          <p>{props.info.calories}</p>
        </div>
        <div className={ingredientStyles.info_item}>
          <p>Белки, г</p>
          <p>{props.info.proteins}</p>
        </div>
        <div className={ingredientStyles.info_item}>
          <p> Жиры, г</p>
          <p>{props.info.fat}</p>
        </div>
        <div className={ingredientStyles.info_item}>
          <p> Углеводы, г</p>
          <p>{props.info.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  info: ingredientType.isRequired,
};
