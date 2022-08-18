import "./modal.css";
import React from "react";

const Modal = ({ children, onClose }) => {
  const stopProp = (e) => e.stopPropagation();

  return (
    <React.Fragment>
      <div className={"modal-container"} onClick={onClose}>
        <div className={"modal"} onClick={stopProp}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
