import React from "react";
import AppHeader from "./../app-header/app-header";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./../../pages/Home/home";
import Login from "../../pages/Login/login";
import Profile from "./../../pages/Profile/profile";
import Modal from "../modal/modal";
import IngredientDetails from "./../ingredient-details/ingredient-details";
import { getIngredients } from "../../services/burgerIngredients";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Register from "../../pages/Register/register";
import ForgotPassword from "../../pages/ForgotPassword/forgot-password";
import ResetPassword from "../../pages/ResetPassword/reset-password";
import NotFound from "../../pages/NotFound/not-found";
import { Feed } from "../../pages/Feed/feed";
import { ProfileOrders } from "../profile/profile-orders/profile-orders";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { ProfileDetails } from "../profile/profile-details/profile-details";
import { authUser } from "../../services/userData";
import { OrderModal } from "../order/order-modal/order-modal";

function App() {
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    appDispatch(getIngredients());
    appDispatch(authUser());
  }, [appDispatch]);

  const onItemClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<OnlyAuth component={<ProfileDetails />} />} />
          <Route
            path="/profile/orders"
            element={<OnlyAuth component={<ProfileOrders />} />}
          />          
        </Route>
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
        <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderModal />} />} />
        <Route path="/feed">
          <Route index element={<Feed />} />
          <Route path="/feed/:number" element={<OrderModal />} />
        </Route>        
        <Route path="*" element={<NotFound />} />
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
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={onItemClose}>
                <OrderModal />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal onClose={onItemClose}>
                <OnlyAuth component={<OrderModal />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
