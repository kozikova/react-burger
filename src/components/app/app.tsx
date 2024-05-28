import React from "react";
import AppHeader from "./../app-header/app-header";
import styles from "./app.module.css";
import BurgerConstructor from "./../burger-constructor/burger-constructor";
import BurgerIngredients from "./../burger-ingredients/burger-ingredients";
import { ingredients } from "../../utils/data";
import { getIngredientsApi } from "../../utils/burger-api";
import ingredientType from "./../../utils/types";

function App() {
  const [currentIngredients, setCurrentIngredients] = React.useState(ingredients);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getIngredientsApi()
      .then((res) => {
        setCurrentIngredients(res.data);
      })
      .catch((e: Error) => {
        console.log(e);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main>
        {isLoading && "Загрузка..."}
        {isError && "Произошла ошибка"}
        {!isLoading && !isError && currentIngredients.length && (
          <section className="wrapper-columns-center">
            <BurgerIngredients ingredientList={currentIngredients} />
            <BurgerConstructor selectedList={currentIngredients} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
