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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ids }),
  }).then(getResponse);
};
