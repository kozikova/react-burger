import { normaApi } from "./urls";

interface ISuccessObject {
  success: true;
}

interface IMessage extends ISuccessObject {
  message: string | null;
}

interface IUser {
  email: string;
  name: string;
  password: string;
}

interface IPasswordReset {
  token: string;
  password: string;
}

interface IUserAuth extends ISuccessObject {
  user: IUser;
}

interface IUserResponse extends IUserAuth {
  accessToken: string;
  refreshToken: string;
}

type TMessageObject = {
  message?: string;
};

const getResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }

  /* if (res.success) {
    return res;
  }*/

  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: ISuccessObject) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res}`);
};

export const getIngredientsApi = () => {
  return fetch(`${normaApi}/ingredients`).then(getResponse);
};

export const postOrderApi = (ids: string[]) => {
  return fetch(`${normaApi}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken") as string,
    },
    body: JSON.stringify({ ingredients: ids }),
  }).then(getResponse);
};

//На экране /forgot-password пользователь вводит адрес электронной почты и нажимает кнопку «Восстановить»
export const passwordResetApi = (arg: Pick<IUser, "email">) => {
  return fetch(`${normaApi}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: arg.email }),
  })
    .then(getResponse<IMessage>)
    .then((messageData: IMessage) => {
      if (!messageData.success) {
        return Promise.reject(messageData);
      }
      return messageData;
    });
};

//На экране /reset-password пользователь вводит новый пароль и код из имейла, а после нажимает кнопку «Сохранить».
export const passwordResetResetApi = (arg: IPasswordReset) => {
  return fetch(`${normaApi}/password-reset/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: arg.token,
      password: arg.password,
    }),
  })
    .then(getResponse<IMessage>)
    .then((messageData: IMessage) => {
      if (!messageData.success) {
        return Promise.reject(messageData);
      }
      return messageData;
    });
};

//На экране /register .
export const registerApi = (arg: IUser) => {
  return fetch(`${normaApi}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      name: arg.name,
      email: arg.email,
      password: arg.password,
    }),
  })
    .then(getResponse<IUserResponse>)
    .then((registerData: IUserResponse) => {
      if (!registerData.success) {
        return Promise.reject(registerData);
      }
      localStorage.setItem("refreshToken", registerData.refreshToken);
      localStorage.setItem("accessToken", registerData.accessToken);
      return registerData;
    });
};

//На экране /login .
export const loginApi = (arg: Omit<IUser, "name">) => {
  return fetch(`${normaApi}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: arg.email,
      password: arg.password,
    }),
  })
    .then(getResponse<Omit<IUserResponse, "user">>)
    .then((loginData: Omit<IUserResponse, "user">) => {
      if (!loginData.success) {
        return Promise.reject(loginData);
      }
      localStorage.setItem("refreshToken", loginData.refreshToken);
      localStorage.setItem("accessToken", loginData.accessToken);
      return loginData;
    });
};

//на экране /logout
export const logoutApi = () => {
  return fetch(`${normaApi}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(getResponse<IMessage>)
    .then((messageData: IMessage) => {
      if (!messageData.success) {
        return Promise.reject(messageData);
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return messageData;
    });
};

export const refreshToken = () => {
  return fetch(`${normaApi}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(getResponse<Omit<IUserResponse, "user">>)
    .then((refreshData: Omit<IUserResponse, "user">) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await getResponse(res);
  } catch (err) {
    console.log(err);
    if ((err as TMessageObject).message === "jwt expired") {
      const refreshData = await refreshToken();
      const headers = options.headers as Record<string, string>;
      headers.authorization = refreshData.accessToken;
      options.headers = headers;
      const res = await fetch(url, options);
      return await getResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserApi = () => {
  //if (localStorage.getItem("refreshToken") || localStorage.getItem("accessToken"))
  return fetchWithRefresh<IUserResponse>(`${normaApi}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("accessToken") as string,
    },
  });

  //return { user: null };
};

export const patchUser = (arg: IUser) => {
  return fetch(`${normaApi}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") as string,
    },
    body: JSON.stringify({
      name: arg.name,
      email: arg.email,
      password: arg.password,
    }),
  }).then(getResponse);
};
