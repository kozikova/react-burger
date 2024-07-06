import { normaApi } from "./urls";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredientsApi = () => {
  return fetch(`${normaApi}/ingredients`).then(getResponse);
};

export const postOrderApi = (ids) => {
  return fetch(`${normaApi}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({ ingredients: ids }),
  }).then(getResponse);
};

//На экране /forgot-password пользователь вводит адрес электронной почты и нажимает кнопку «Восстановить»
export const passwordResetApi = (email) => {
  return fetch(`${normaApi}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  })
    .then(getResponse)
    .then((messageData) => {
      if (!messageData.success) {
        return Promise.reject(messageData);
      }
      return messageData;
    });
};

//На экране /reset-password пользователь вводит новый пароль и код из имейла, а после нажимает кнопку «Сохранить».
export const passwordResetResetApi = (password, token) => {
  return fetch(`${normaApi}/password-reset/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
      password: password,
    }),
  })
    .then(getResponse)
    .then((messageData) => {
      if (!messageData.success) {
        return Promise.reject(messageData);
      }
      return messageData;
    });
};

//На экране /register .
export const registerApi = (arg) => {
  return fetch(`${normaApi}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      name: arg.name,
      email: arg.email,
      password: arg.password,
    }),
  })
    .then(getResponse)
    .then((registerData) => {
      if (!registerData.success) {
        return Promise.reject(registerData);
      }
      localStorage.setItem("refreshToken", registerData.refreshToken);
      localStorage.setItem("accessToken", registerData.accessToken);
      return registerData;
    });
};

//На экране /login .
export const loginApi = (arg) => {
  return fetch(`${normaApi}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: arg.email,
      password: arg.password,
    }),
  })
    .then(getResponse)
    .then((loginData) => {
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
  return fetch(`${normaApi}/password-reset/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(getResponse)
    .then((messageData) => {
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
    .then(getResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await getResponse(res);
  } catch (err) {
    console.log(err);
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await getResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserApi = () => {
  if (localStorage.getItem("refreshToken") || localStorage.getItem("accessToken"))
    return fetchWithRefresh(`${normaApi}/auth/user`, {
      Method: "GET",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }).then(getResponse);

  return { user: null };
};

export const patchUser = (name, email, password) => {
  return fetchWithRefresh(`${normaApi}/auth/user`, {
    Method: "PATCH",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(getResponse);
};
