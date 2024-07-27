import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import profileDetailsStyles from "./profile-details.module.css";
import { patchUserAction } from "../../../services/userData";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";

type TProfileDetails = {
  name: string;
  email: string;
  password: string;
};

export const ProfileDetails = () => {
  const user = useAppSelector((store) => store.userData.user);
  const [profileState, setProfileState] = useState<TProfileDetails>({
    name: "",
    email: "",
    password: "",
  });
  const [buttonVisible, setButtonVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      profileState!.name !== user!.name ||
      profileState!.email !== user!.email ||
      profileState!.password
    ) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [profileState, user]);

  useEffect(() => {
    if (user!.name && user!.email && user!.password) {
      setProfileState({ name: user!.name, email: user!.email, password: user!.password });
    }
  }, [user]);

  const onCancel = () => {
    setProfileState({
      name: user!.name,
      email: user!.email,
      password: "",
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchUserAction(profileState));
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileState({ ...profileState, email: e.target.value });
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileState({ ...profileState, password: e.target.value });
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
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
