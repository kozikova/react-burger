import React from "react";
import styles from "./home.module.css";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import { getIngredients } from "../../services/burgerIngredients";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Home() {
  const { loading, error, ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <main>
      {loading && "Загрузка..."}
      {!loading && error && <p>Ошибка: {error}</p>}
      {!loading && !error && ingredients.length && (
        <section className="wrapper-columns-center">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      )}
    </main>
  );
}

export default Home;
