import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

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

export default ModalOverlay;
