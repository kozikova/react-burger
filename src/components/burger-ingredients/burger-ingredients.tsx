import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredient-group/ingredient-group";
import { IIngredientType } from "../../utils/types";
import useAppSelector from "../../hooks/useAppSelector";

export const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);

  const [current, setCurrent] = React.useState("bun");

  const scrollAreaRef = React.useRef<HTMLUListElement>(null);
  const bunTitle = React.useRef<HTMLHeadingElement>(null);
  const sauceTitle = React.useRef<HTMLHeadingElement>(null);
  const mainTitle = React.useRef<HTMLHeadingElement>(null);

  const setActiveTab = () => {
    const scrollableAreaTop = scrollAreaRef.current!.getBoundingClientRect().top;

    const bun = Math.abs(
      bunTitle.current!.getBoundingClientRect().bottom - scrollableAreaTop
    );
    const sauce = Math.abs(
      sauceTitle.current!.getBoundingClientRect().bottom - scrollableAreaTop
    );
    const main = Math.abs(
      mainTitle.current!.getBoundingClientRect().bottom - scrollableAreaTop
    );

    if (bun < sauce && bun < main) {
      setCurrent("bun");
    } else if (sauce < bun && sauce < main) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

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
      <ul
        className={ingredientsStyles.y_scrollable}
        ref={scrollAreaRef}
        onScroll={setActiveTab}
      >
        <p className="text text_type_main-default mt-10" ref={bunTitle}>
          Булки
        </p>
        <IngredientGroup
          list={ingredients.filter((item: IIngredientType) => {
            return item.type === "bun";
          })}
        />
        <p className="text text_type_main-default mt-10" ref={sauceTitle}>
          Соусы
        </p>
        <IngredientGroup
          list={ingredients.filter((item: IIngredientType) => {
            return item.type === "sauce";
          })}
        />
        <p className="text text_type_main-default mt-10" ref={mainTitle}>
          Начинки
        </p>
        <IngredientGroup
          list={ingredients.filter((item: IIngredientType) => {
            return item.type === "main";
          })}
        />
      </ul>
    </div>
  );
};

export default BurgerIngredients;
