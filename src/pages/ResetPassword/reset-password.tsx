import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./reset-password.module.css";
import React, { ChangeEvent, FC, FormEvent, useEffect } from "react";
import { passwordResetResetAction } from "../../services/userData";
import useAppDispatch from "../../hooks/useAppDispatch";

const ResetPassword: FC = () => {
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //на следующем спринте

    dispatch(passwordResetResetAction({ password: password, token: code }));
    localStorage.setItem("resetPassword", "false");
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
          type="text"
          placeholder="Введите код из письма"
          onChange={onCodeChange}
          value={code}
          size="default"
          extraClass="mt-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
};

export default ResetPassword;
