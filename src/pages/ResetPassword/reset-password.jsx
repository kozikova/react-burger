import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./reset-password.module.css";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { passwordResetResetAction } from "../../services/userData";

function ResetPassword() {
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCodeChange = (e) => {
    setCode(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitReset = (e) => {
    e.preventDefault();
    dispatch(passwordResetResetAction({ password: password, token: code }));
    localStorage.setItem("resetPassword", false);
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("resetPassword") !== "true") {
      navigate("/forgot-password");
    }
  }, [navigate]);

  return (
    <main>
      <form onSubmit={onSubmitReset} className={styles.wrapper}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <PasswordInput
          onChange={onPasswordChange}
          placeholder={"Введите новый пароль"}
          value={password}
          name={"password"}
          extraClass="mt-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onCodeChange}
          value={code}
          size={"default"}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
          Сохранить
        </Button>
        <p className={styles.inactive_label}>
          Вспомнили пароль?
          <Link to={"/login"}> Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default ResetPassword;
