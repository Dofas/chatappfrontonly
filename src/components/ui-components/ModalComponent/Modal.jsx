import "./modal.scss";
import React from "react";
import classNames from 'classnames';

const Modal = ({ children, onClose, className }) => {
  const stopProp = (e) => e.stopPropagation();

  return (
    <React.Fragment>
      <div className={classNames(className, "modal-container")} onClick={onClose}>
        <div className="modal" onClick={stopProp}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
