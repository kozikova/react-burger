import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import constructorStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

export default function BurgerConstructor(props) {
  const [show, setShow] = React.useState(false);

  const getNewTotal = React.useMemo(() => {
    return props.selectedList.reduce(
      (prevValue, currentValue) => prevValue + currentValue.price,
      0
    );
  }, [props.selectedList]);

  const buns = React.useMemo(() => {
    return props.selectedList.filter((item) => item.type === "bun");
  }, [props.selectedList]);

  const notBuns = React.useMemo(() => {
    return props.selectedList.filter((item) => item.type !== "bun");
  }, [props.selectedList]);

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <div className={constructorStyles.layout}>
      <ul className={constructorStyles.without_padding}>
        {buns.slice(0, 1).map((item) => (
          <div className={constructorStyles.bun_container} key={item._id}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={item.name + "(верх)"}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
        ))}
        <div className={constructorStyles.constructor_y_scrollable}>
          {notBuns.map((item) => (
            <div className={constructorStyles.dragable} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </div>
          ))}
        </div>
        {buns.slice(0, 1).map((item) => (
          <div className={constructorStyles.bun_container} key={item._id}>
            <ConstructorElement
              key={item._id}
              type="bottom"
              isLocked={true}
              text={item.name + " (низ)"}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
        ))}
      </ul>
      <div className={constructorStyles.footer}>
        <div className={constructorStyles.total}>
          <p className="m-1 text_type_main-large">{getNewTotal}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div style={{ overflow: "hidden" }}>
          <Button htmlType="button" type="primary" size="large" onClick={() => setShow(true)}>
            Оформить заказ
          </Button>
          {show && (
            <Modal title="" onClose={handleCloseModal}>
              <OrderDetails />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  selectedList: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
