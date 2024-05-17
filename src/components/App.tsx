import React from "react";
import AppHeader from "./app-header/app-header";
import styles from "./App.module.css";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import { ingredients } from "../utils/data";

function App() {  
  const [currentIngredients] = React.useState(ingredients);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main>
        <section className="wrapper-columns-center">
          <BurgerIngredients ingredientList={currentIngredients}/>          
          <BurgerConstructor selectedList={currentIngredients}/>          
        </section>
      </main>
    </div>
  );
}

export default App;
