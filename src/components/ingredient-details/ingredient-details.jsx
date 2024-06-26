import ingredientStyles from "./ingredient-details.module.css";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { open, close } from "../../services/ingredientDetails";

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { ingredientId } = useParams();
  useEffect(() => {
    const ingredient = ingredients.find((item) => item._id === ingredientId);

    if (ingredient) {
      dispatch(open(ingredient));
    }
  }, [dispatch, ingredients, ingredientId]);

  const info = useSelector((store) => store.ingredientDetails.info);

  return (
    <div className={ingredientStyles.ingredient_details_wrapper}>
      {info && (
        <div>
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
      )}
    </div>
  );
}
