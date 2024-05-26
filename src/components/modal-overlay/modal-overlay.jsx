import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
  const onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      props.closeModal();
    }
  };

  React.useEffect(() => {
    document.getElementById("closeLayout").addEventListener("click", onOverlayClick, false);
  }, []);

  return <div id="closeLayout" className={modalOverlayStyles.half_transparent_overlay} />;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
