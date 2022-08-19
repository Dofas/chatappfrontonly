import "./add-group-modal.css";
import Modal from "../../ModalComponent/Modal";
import { useRef, useState } from "react";

const AddGroupModal = ({ isModal, closeModal }) => {
  const [isError, setIsError] = useState(false);
  const groupNameInputRef = useRef(null);

  const saveGroupName = () => {
    if (groupNameInputRef.current.value === "") {
      setIsError(true);
      return;
    }
    console.log("Added group with name", groupNameInputRef.current.value);
    setIsError(false);
    closeModal();
  };

  return (
    <Modal show={isModal} onClose={closeModal}>
      <div
        data-testid="close-add-group-modal-btn"
        onClick={closeModal}
        className="modal-close-btn"
      />
      <div className="group-modal-content">
        {isError && (
          <div className="group-modal-error-text">
            You can not create group with empty name
          </div>
        )}
        <div>Type group name</div>
        <input ref={groupNameInputRef} className="modal-input" />
        <div
          onClick={saveGroupName}
          className="modal-save-btn"
          data-testid="group-save-btn"
        >
          Save group
        </div>
      </div>
    </Modal>
  );
};

export default AddGroupModal;
