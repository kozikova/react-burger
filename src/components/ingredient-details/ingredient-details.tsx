import ingredientStyles from "./ingredient-details.module.css";
import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { open, close } from "../../services/ingredientDetails";
import { IIngredientType } from "../../utils/types";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

export const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const { ingredientId } = useParams();
  useEffect(() => {
    const ingredient = ingredients.find(
      (item: IIngredientType) => item._id === ingredientId
    );

    if (ingredient) {
      dispatch(open(ingredient));
    }
  }, [dispatch, ingredients, ingredientId]);

  const info = useAppSelector((store) => store.ingredientDetails.info);

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
};

export default IngredientDetails;
