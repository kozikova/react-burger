import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {
  const escHandler = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    },
    [props]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, [escHandler]);

  React.useEffect(() => {
    document.getElementById("close").addEventListener("click", props.onClose, false);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.modal}>
        <div className={modalStyles.title_wrapper}>
          <p className="text_type_main-large">{props.title}</p>
          <div id="close" className={modalStyles.close_button}>
            <CloseIcon />
          </div>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.onClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
