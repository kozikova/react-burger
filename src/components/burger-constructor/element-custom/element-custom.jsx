import elementStyles from "./element-custom.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType, { ingredientTypeWithKey } from "../../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import React from "react";
import { useDispatch } from "react-redux";
import { setNewPosition } from "../../../services/burgerConstructor";
import { v4 as uuidv4 } from "uuid";

export const ElementCustom = ({
  bun,
  item,
  typeIsTop,
  bunOrMainType,
  deleteItem,
  index,
}) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "sortable",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      dispatch(setNewPosition({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "sortable",
    item: () => ({ key: item?.key, index }),
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleClose = () => {
    deleteItem(item?.key);
  };

  return bunOrMainType ? (
    <li
      className={`${bun ? elementStyles.bun_container : elementStyles.bun_empty}`}
      key={(bun ? bun._id : "") + (typeIsTop ? "(верх)" : "(низ)")}
    >
      <ConstructorElement
        type={typeIsTop ? "top" : "bottom"}
        isLocked={true}
        text={bun ? `${bun?.name} ${typeIsTop ? "(верх)" : "(низ)"}` : "Выберите булку"}
        price={bun?.price}
        thumbnail={bun?.image_mobile}
      />
    </li>
  ) : (
    <li
      ref={ref}
      data-handler-id={handlerId}
      className={`${
        item
          ? isDragging
            ? elementStyles.item_dragable_opacity
            : elementStyles.item_dragable
          : elementStyles.item_empty
      }`}
      key={item ? item.key : "0"}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item ? item?.name : "Выберите начинку"}
        price={item?.price}
        thumbnail={item?.image_mobile}
        handleClose={handleClose}
      />
    </li>
  );
};

ElementCustom.propTypes = {
  bun: ingredientType,
  item: ingredientType,
  typeIsTop: PropTypes.bool,
  bunOrMainType: PropTypes.bool,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
};
