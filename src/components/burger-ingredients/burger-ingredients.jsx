import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredient-group/ingredient-group";
import { open, close } from "../../services/ingredientDetails";
import PropTypes from "prop-types";

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const [current, setCurrent] = React.useState("bun");
  const { isModalOpen, openModal, closeModal } = useModal();

  const scrollAreaRef = React.useRef();
  const bunTitle = React.useRef();
  const sauceTitle = React.useRef();
  const mainTitle = React.useRef();

  const onItemClick = (item) => {
    dispatch(open(item));
    openModal();
  };

  const onItemClose = (item) => {
    dispatch(close());
    closeModal();
  };

  const setActiveTab = () => {
    const scrollableAreaTop = scrollAreaRef.current.getBoundingClientRect().top;

    const bun = Math.abs(
      bunTitle.current.getBoundingClientRect().bottom - scrollableAreaTop
    );
    const sauce = Math.abs(
      sauceTitle.current.getBoundingClientRect().bottom - scrollableAreaTop
    );
    const main = Math.abs(
      mainTitle.current.getBoundingClientRect().bottom - scrollableAreaTop
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
          list={ingredients.filter((item) => {
            return item.type === "bun";
          })}
          onItemClick={onItemClick}
        />
        <p className="text text_type_main-default mt-10" ref={sauceTitle}>
          Соусы
        </p>
        <IngredientGroup
          list={ingredients.filter((item) => {
            return item.type === "sauce";
          })}
          onItemClick={onItemClick}
        />
        <p className="text text_type_main-default mt-10" ref={mainTitle}>
          Начинки
        </p>
        <IngredientGroup
          list={ingredients.filter((item) => {
            return item.type === "main";
          })}
          onItemClick={onItemClick}
        />
      </ul>
      {/* {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={onItemClose}>
          <IngredientDetails />
        </Modal>
      )} */}
    </div>
  );
}
