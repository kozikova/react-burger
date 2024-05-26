import { normaApi } from "./urls";

export const getIngredientsApi = (onSuccess, onError) => {
  return fetch(`${normaApi}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((data) => onSuccess(data["data"]))
    .catch((e) => onError(e));
};
