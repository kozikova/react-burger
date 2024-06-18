import { PropTypes, shape } from "prop-types";
import { v4 as uuidv4 } from "uuid";

export const ingredientType = shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const ingredientTypeWithKey = shape({
  ...ingredientType,
  key: (PropTypes.string = uuidv4()),
});

export default ingredientType;
