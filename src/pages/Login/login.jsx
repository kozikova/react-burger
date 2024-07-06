import React, { useEffect } from "react";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { loginAction } from "../../services/userData";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const dispatch = useDispatch();
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
    navigate(state ? state.from : "/");
  };

  return (
    <main>
      <form onSubmit={onSubmitLogin} className={styles.wrapper}>
        <h1 className={styles.title}>Вход</h1>
        <EmailInput
          placeholder={"E-mail"}
          onChange={onEmailChange}
          value={email}
          size={"default"}
          extraClass="mt-6"
          isIcon={false}
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={"password"}
          placeholder={"Пароль"}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-16">
          Войти
        </Button>
        <p className={styles.inactive_label}>
          Вы — новый пользователь?
          <Link to={"/register"}> Зарегистрироваться</Link>
        </p>
        <p className={styles.inactive_label}>
          Забыли пароль?
          <Link to={"/forgot-password"}> Восстановить пароль</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
