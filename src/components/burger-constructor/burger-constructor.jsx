import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";

export default function BurgerConstructor(props) {
  const getNewTotal = () => {
    return props.selectedList.reduce(
      (prevValue, currentValue) => prevValue + currentValue.price,

      0
    );
  };

  return (
    <div className={constructorStyles.layout}>
      <ul className={constructorStyles.y_scrollable}>
        {props.selectedList
          .filter((item) => item.type === "bun")
          .slice(0, 1)
          .map((item) => (
            <ConstructorElement
              key={item._id}
              type="top"
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))}
        {props.selectedList
          .filter((item) => item.type !== "bun")
          .map((item) => (
            <ConstructorElement
              key={item._id}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))}
        {props.selectedList
          .filter((item) => item.type === "bun")
          .slice(0, 1)
          .map((item) => (
            <ConstructorElement
              key={item._id}
              type="bottom"
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))}
      </ul>
      <div className={constructorStyles.footer}>
        <div className={constructorStyles.total}>
          <p className="m-1 text_type_main-large">{getNewTotal()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  selectedList: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ).isRequired,
};
