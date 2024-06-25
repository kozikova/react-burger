import React from "react";
import AppHeader from "./../app-header/app-header";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./../../pages/Home/home";
import { getIngredients } from "../../services/burgerIngredients";
import { useAppDispatch } from "../../hooks/useAppDispatch";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
