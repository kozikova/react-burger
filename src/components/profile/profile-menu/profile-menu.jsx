import { NavLink } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../services/userData";
import { useNavigate } from "react-router-dom";

export function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAction);
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <NavLink
        className={({ isActive }) =>
          `${styles.inactive} ${isActive ? styles.active : ""}`
        }
        to="profile"
        end
      >
        Профиль
      </NavLink>
      <NavLink
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        to="orders"
        end
      >
        История заказов
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
