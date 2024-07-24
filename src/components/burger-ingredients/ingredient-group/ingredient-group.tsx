import groupStyles from "./ingredient-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { IIngredientType } from "../../../utils/types";
import { getIngredientCounts } from "../../../services/burgerConstructor";
import { useSelector } from "react-redux";
import { FC } from "react";

type TIngredientGroupProps = {
  list: IIngredientType[];
};

export const IngredientGroup: FC<TIngredientGroupProps> = (props) => {
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
};

export default IngredientGroup;
