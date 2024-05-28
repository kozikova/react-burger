import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import ingredientType from "./../../utils/types";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");
  const [currentItem, setCurrentItem] = React.useState();
  const { isModalOpen, openModal, closeModal } = useModal();

  const onItemClick = (item) => {
    setCurrentItem(item);
    openModal();
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
      <ul className={ingredientsStyles.y_scrollable}>
        <IngredientGroup
          list={props.ingredientList.filter((item) => {
            return item.type === "bun";
          })}
          categoryName="Булки"
          onItemClick={onItemClick}
        />
        <IngredientGroup
          list={props.ingredientList.filter((item) => {
            return item.type === "sauce";
          })}
          categoryName="Соусы"
          onItemClick={onItemClick}
        />
        <IngredientGroup
          list={props.ingredientList.filter((item) => {
            return item.type === "main";
          })}
          categoryName="Начинки"
          onItemClick={onItemClick}
        />
      </ul>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails info={currentItem} />
        </Modal>
      )}
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredientList: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
