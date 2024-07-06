import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.app_header}>
      <nav className={appHeaderStyles.nav}>
        <NavLink to="/" className={appHeaderStyles.menu_button}>
          {({ isActive }) => (
            <button type="button" className={appHeaderStyles.menu_button}>
              <BurgerIcon type="primary" />
              <p
                className={
                  isActive
                    ? `${appHeaderStyles.label} text_color_active`
                    : `${appHeaderStyles.label} text_color_inactive`
                }
              >
                Конструктор
              </p>
            </button>
          )}
        </NavLink>
        <NavLink to="/feed" className={appHeaderStyles.menu_button}>
          {({ isActive }) => (
            <button type="button" className={appHeaderStyles.menu_button}>
              <ListIcon type="secondary" />
              <p
                className={
                  isActive
                    ? `${appHeaderStyles.label} text_color_active`
                    : `${appHeaderStyles.label} text_color_inactive`
                }
              >
                Лента заказов
              </p>
            </button>
          )}
        </NavLink>
      </nav>
      <Logo className={appHeaderStyles.box_top_bottom} />
      <NavLink to="/profile" className={appHeaderStyles.menu_button}>
        {({ isActive }) => (
          <button type="button" className={appHeaderStyles.menu_button}>
            <ProfileIcon type="secondary" />
            <p
              className={
                isActive
                  ? `${appHeaderStyles.label} text_color_active`
                  : `${appHeaderStyles.label} text_color_inactive`
              }
            >
              Личный кабинет
            </p>
          </button>
        )}
      </NavLink>
    </header>
  );
}
