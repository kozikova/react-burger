import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { FC } from "react";

const AppHeader: FC = () => {
  return (
    <header className={appHeaderStyles.app_header}>
      <nav className={appHeaderStyles.nav}>
        <NavLink to="/" className={appHeaderStyles.menu_button}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? `primary` : `secondary`} />
              <p
                className={
                  isActive
                    ? `${appHeaderStyles.label} text_color_active`
                    : `${appHeaderStyles.label} text_color_inactive`
                }
              >
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink to="/feed" className={appHeaderStyles.menu_button}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? `primary` : `secondary`} />
              <p
                className={
                  isActive
                    ? `${appHeaderStyles.label} text_color_active`
                    : `${appHeaderStyles.label} text_color_inactive`
                }
              >
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
      </nav>
      <div className={appHeaderStyles.box_top_bottom}>
        <Logo />
      </div>
      <NavLink to="/profile" className={appHeaderStyles.menu_button}>
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? `primary` : `secondary`} />
            <p
              className={
                isActive
                  ? `${appHeaderStyles.label} text_color_active`
                  : `${appHeaderStyles.label} text_color_inactive`
              }
            >
              Личный кабинет
            </p>
          </>
        )}
      </NavLink>
    </header>
  );
};

export default AppHeader;
