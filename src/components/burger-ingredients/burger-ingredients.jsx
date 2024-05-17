import React from "react";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredient-group/ingredient-group";
import PropTypes from "prop-types";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");

  return (
    <div className={ingredientsStyles.layout}>
      <p className="text text_type_main-medium pt-10 pb-5">Соберите бургер</p>
      <div className="wrapper-columns">
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={ingredientsStyles.y_scrollable}>
        <IngredientGroup
          list={props.ingredientList.filter((item) => {
            return item.type === "bun";
          })}
          categoryName="Булки"
        />
        <IngredientGroup
          list={props.ingredientList.filter((item) => {
            return item.type === "sauce";
          })}
          categoryName="Соусы"
        />
        <IngredientGroup
          list={props.ingredientList.filter((item) => {
            return item.type === "main";
          })}
          categoryName="Начинки"
        />
      </ul>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredientList: PropTypes.arrayOf(
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
