import ingredientStyles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const info = useSelector((store) => store.ingredientDetails.info);
  return (
    <div className={ingredientStyles.ingredient_details_wrapper}>
      <img
        className={ingredientStyles.ingredient_image}
        src={info.image_large}
        alt={info.name}
      />
      <p className="text_type_main-medium mt-8">{info.name}</p>
      <div className={ingredientStyles.info_wrapper}>
        <div className={ingredientStyles.info_item}>
          <p>Калории,ккал</p>
          <p>{info.calories}</p>
        </div>
        <div className={ingredientStyles.info_item}>
          <p>Белки, г</p>
          <p>{info.proteins}</p>
        </div>
        <div className={ingredientStyles.info_item}>
          <p> Жиры, г</p>
          <p>{info.fat}</p>
        </div>
        <div className={ingredientStyles.info_item}>
          <p> Углеводы, г</p>
          <p>{info.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}
