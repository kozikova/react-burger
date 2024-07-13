import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

type ModalOverlayProps = {
  closeModal: () => void;
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div
      id="closeLayout"
      onClick={props.closeModal}
      className={modalOverlayStyles.half_transparent_overlay}
    />
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
