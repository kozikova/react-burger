import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import profileDetailsStyles from "./profile-details.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { patchUserAction } from "../../../services/userData";

export const ProfileDetails = () => {
  const user = useSelector((store) => store.userData.user);
  const [profileState, setProfileState] = useState({});
  const [buttonVisible, setButtonVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      profileState.name !== user.name ||
      profileState.email !== user.email ||
      profileState.password
    ) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [profileState, user.name, user.email]);

  useEffect(() => {
    if (user.name && user.email) {
      setProfileState({ name: user.name, email: user.email });
    }
  }, [user.name, user.email]);

  const onCancel = () => {
    setProfileState({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUserAction(profileState));
  };

  const onEmailChange = (e) => {
    setProfileState({ ...profileState, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setProfileState({ ...profileState, password: e.target.value });
  };

  const onNameChange = (e) => {
    setProfileState({ ...profileState, name: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className={profileDetailsStyles.wrapper}>
      <Input
        placeholder={"Имя"}
        onChange={onNameChange}
        icon={"EditIcon"}
        value={profileState?.name || ""}
        name={"name"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onEmailChange}
        value={profileState?.email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={profileState?.password || ""}
        name={"password"}
        icon="EditIcon"
      />
      {buttonVisible && (
        <div className={profileDetailsStyles.row}>
          <Button onClick={onCancel} htmlType="button" type="secondary" size="medium">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
