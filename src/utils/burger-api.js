import { normaApi } from "./urls";

export const getIngredientsApi = () => {
  return fetch(`${normaApi}/ingredients`).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.statusText);
  });
};
