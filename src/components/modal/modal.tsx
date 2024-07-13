import React, { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");
type ModalProps = {
  title?: string;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const escHandler = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    },
    [props]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, [props, escHandler]);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.modal}>
        <div className={modalStyles.title_wrapper}>
          <p className="text_type_main-large">{props.title}</p>
          <button className={modalStyles.close_button} onClick={props.onClose}>
            <CloseIcon type={"primary"} />
          </button>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.onClose} />
    </>,
    modalRoot!
  );
};

export default Modal;
