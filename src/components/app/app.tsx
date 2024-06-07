import React from "react";
import AppHeader from "./../app-header/app-header";
import styles from "./app.module.css";
import BurgerConstructor from "./../burger-constructor/burger-constructor";
import BurgerIngredients from "./../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../services/burgerIngredients";
import ingredientType from "./../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useAppDispatch();
  const { loading, error, ingredients } = useAppSelector(
    (state) => state.ingredients
  );

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <AppHeader />
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
    </div>
  );
}

export default App;
