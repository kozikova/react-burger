import React, { ChangeEvent, FC, FormEvent, useEffect } from "react";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./login.module.css";
import { loginAction } from "../../services/userData";
import useAppDispatch from "../../hooks/useAppDispatch";

const Login: FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const dispatch = useAppDispatch();
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //на следующем спринте

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
};

export default Login;
