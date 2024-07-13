import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import React, { ChangeEvent, FC, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./forgot-password.module.css";
import { passwordResetAction } from "../../services/userData";

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmitReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //на следующем спринте
    //@ts-ignore
    dispatch(passwordResetAction({ email }));
    localStorage.setItem("resetPassword", "true");
    navigate("/reset-password");
  };

  return (
    <main>
      <form onSubmit={onSubmitReset} className={styles.wrapper}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <EmailInput
          placeholder={"Укажите e-mail"}
          onChange={onEmailChange}
          value={email}
          size={"default"}
          extraClass="mt-6"
          isIcon={false}
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
          Восстановить
        </Button>
        <p className={styles.inactive_label}>
          Вспомнили пароль?
          <Link to={"/login"}> Войти</Link>
        </p>
      </form>
    </main>
  );
};

export default ForgotPassword;
