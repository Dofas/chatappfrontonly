import "./add-team-modal.css";
import Modal from "../../ModalComponent/Modal";
import { useRef } from "react";

const AddTeamModal = ({ isModal, closeModal }) => {
  const teamNameInputRef = useRef(null);

  const saveTeam = () => {
    console.log("Added team with name", teamNameInputRef.current.value);
    closeModal();
  };

  return (
    <Modal show={isModal} onClose={closeModal}>
      <div
        data-testid={"close-add-team-modal-btn"}
        onClick={closeModal}
        className={"modal-close-btn"}
      />
      <div className={"team-modal-content"}>
        <div>Type team name</div>
        <input ref={teamNameInputRef} className={"modal-input"} />
        <div className={"modal-save-btn"} onClick={saveTeam}>
          Create team
        </div>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
