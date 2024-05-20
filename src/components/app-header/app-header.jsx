import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.app_header}>
      <nav className={appHeaderStyles.nav}>
        <button type="button" className={appHeaderStyles.menu_button}>
          <BurgerIcon type="primary" />
          <p className={appHeaderStyles.label}>Конструктор</p>
        </button>
        <button type="button" className={appHeaderStyles.menu_button}>
          <ListIcon type="secondary" />
          <p className={`${appHeaderStyles.label} text_color_inactive`}>Лента заказов</p>
        </button>
      </nav>
      <Logo className={appHeaderStyles.box_top_bottom} />
      <button type="button" className={appHeaderStyles.menu_button}>
        <ProfileIcon type="secondary" />
        <p className={`${appHeaderStyles.label} text_color_inactive`}>Личный кабинет</p>
      </button>
    </header>
  );
}
