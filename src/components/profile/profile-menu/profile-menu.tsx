import { NavLink } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { logoutAction } from "../../../services/userData";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";

export function ProfileMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <NavLink
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        to=""
        end
      >
        {({ isActive }) => (
          <span className={`${styles.link} ${isActive ? styles.active : ""}`}>
            Профиль
          </span>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        to="orders"
        end
      >
        {({ isActive }) => (
          <span className={`${styles.link} ${isActive ? styles.active : ""}`}>
            История заказов
          </span>
        )}
      </NavLink>
      <button className={`${styles.link} ${styles.button}`} onClick={onLogout}>
        Выход
      </button>
      <p className={styles.footer}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
