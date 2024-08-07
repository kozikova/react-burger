import React, { ChangeEvent, FC, FormEvent, useEffect } from "react";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { registerAction } from "../../services/userData";
import useAppDispatch from "../../hooks/useAppDispatch";

const Register: FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //на следующем спринте

    dispatch(registerAction({ name, password, email }));
    navigate("/login");
  };

  return (
    <main>
      <form onSubmit={onSubmitRegister} className={styles.wrapper}>
        <h1 className={styles.title}>Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onNameChange}
          value={name}
          size={"default"}
          extraClass="mt-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
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
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
          Зарегистрироваться
        </Button>
        <p className={styles.inactive_label}>
          Уже зарегистрированы?
          <Link to={"/login"}> Войти</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
