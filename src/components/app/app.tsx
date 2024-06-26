import React from "react";
import AppHeader from "./../app-header/app-header";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./../../pages/Home/home";
import Modal from "../modal/modal";
import IngredientDetails from "./../ingredient-details/ingredient-details";
import { getIngredients } from "../../services/burgerIngredients";
import { useAppDispatch } from "../../hooks/useAppDispatch";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const onItemClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={onItemClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
