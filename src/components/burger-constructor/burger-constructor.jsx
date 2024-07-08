import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import constructorStyles from "./burger-constructor.module.css";
import { useModal } from "../../hooks/useModal";
import {
  addBun,
  addItem,
  deleteItem,
  clear,
  total,
} from "../../services/burgerConstructor";
import { postOrder } from "../../services/orderDetails";
import { ElementCustom } from "./element-custom/element-custom";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router";

export default function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector((store) => store.burgerConstructor.bun);
  const items = useSelector((store) => store.burgerConstructor.items);
  const { loading, error, orderFromApi } = useSelector((state) => state.orderDetails);

  const user = useSelector((store) => store.userData.user);

  useEffect(() => {
    dispatch(total());
  }, [dispatch, bun, items]);

  const getNewTotal = useSelector((store) => store.burgerConstructor.totalPrice);

  const [, dropTargetRef] = useDrop({
    accept: "dndContainer",
    drop: (item) => dropDispachActions(item),
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  });

  const dropDispachActions = (item) => {
    if (item.type === "bun") {
      dispatch(addBun(item));
    } else {
      dispatch(addItem(item));
    }
  };

  const onDeleteItem = (key) => {
    dispatch(deleteItem(key));
  };

  const postAndOpenOrder = () => {
    if (user) {
      dispatch(postOrder([bun._id, ...items.map((item) => item._id), bun?._id]));
      openModal();
    } else {
      navigate("/login");
    }
  };

  const closeAndClearOrder = () => {
    dispatch(clear());
    closeModal();
  };

  return (
    <div className={constructorStyles.layout}>
      <ul ref={dropTargetRef} className={constructorStyles.without_padding}>
        <ElementCustom bun={bun} item={null} typeIsTop={true} bunOrMainType={true} />
        <div className={constructorStyles.constructor_y_scrollable}>
          {items.length ? (
            items.map((item, index) => (
              <ElementCustom
                bun={null}
                item={item}
                typeIsTop={null}
                bunOrMainType={false}
                deleteItem={onDeleteItem}
                index={index}
                key={item?.key}
              />
            ))
          ) : (
            <ElementCustom
              bun={null}
              item={null}
              typeIsTop={null}
              bunOrMainType={false}
              key={"0"}
            />
          )}
        </div>

        <ElementCustom bun={bun} item={null} type={false} bunOrMainType={true} />
      </ul>
      <div className={constructorStyles.footer}>
        <div className={constructorStyles.total}>
          <p className="m-1 text_type_main-large">{getNewTotal}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={postAndOpenOrder}>
          Оформить заказ
        </Button>
        {isModalOpen && (
          <Modal title="" onClose={closeAndClearOrder}>
            <div>
              {loading && "Загрузка..."}
              {!loading && error && <p>Ошибка: {error}</p>}
              {!loading && !error && orderFromApi.success && <OrderDetails />}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
