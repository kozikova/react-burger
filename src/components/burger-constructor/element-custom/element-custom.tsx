import elementStyles from "./element-custom.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IIngredientType, IIngredientTypeWithKey } from "../../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import React, { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNewPosition } from "../../../services/burgerConstructor";
import { v4 as uuidv4 } from "uuid";
import { Identifier } from "dnd-core";

type TElementCustomProps = {
  bun: IIngredientType | null;
  item: IIngredientTypeWithKey | null;
  typeIsTop: boolean | null;
  bunOrMainType: boolean;
  deleteItem: ((key: string) => void) | undefined;
  index: number;
};

type TDragObject = {
  key: string;
  index: number;
};

type TDropCollectedProps = {
  handlerId: Identifier | null;
};

type TDragCollectedProps = {
  isDrag: boolean;
};

export const ElementCustom: FC<TElementCustomProps> = ({
  bun,
  item,
  typeIsTop,
  bunOrMainType,
  deleteItem,
  index,
}) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

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

  const [{ isDrag }, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
    type: "sortable",
    item: () => ({ key: item!.key, index }),
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleClose = () => {
    deleteItem!(item!.key);
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
        price={bun!.price}
        thumbnail={bun!.image_mobile}
      />
    </li>
  ) : (
    <li
      ref={ref}
      data-handler-id={handlerId}
      className={`${
        item
          ? isDrag
            ? elementStyles.item_dragable_opacity
            : elementStyles.item_dragable
          : elementStyles.item_empty
      }`}
      key={item ? item.key : "0"}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item ? item?.name : "Выберите начинку"}
        price={item!.price}
        thumbnail={item!.image_mobile}
        handleClose={handleClose}
      />
    </li>
  );
};
