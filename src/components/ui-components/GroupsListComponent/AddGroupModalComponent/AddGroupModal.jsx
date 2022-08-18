import "./add-group-modal.css";
import Modal from "../../ModalComponent/Modal";
import { useRef } from "react";

const AddGroupModal = ({ isModal, closeModal }) => {
  const groupNameInputRef = useRef(null);

  const saveGroupName = () => {
    console.log("Added group with name", groupNameInputRef.current.value);
    closeModal();
  };

  return (
    <Modal show={isModal} onClose={closeModal}>
      <div
        data-testid={"close-add-group-modal-btn"}
        onClick={closeModal}
        className={"modal-close-btn"}
      />
      <div className={"group-modal-content"}>
        <div>Type group name</div>
        <input ref={groupNameInputRef} className={"modal-input"} />
        <div onClick={saveGroupName} className={"modal-save-btn"}>
          Save group
        </div>
      </div>
    </Modal>
  );
};

export default AddGroupModal;
