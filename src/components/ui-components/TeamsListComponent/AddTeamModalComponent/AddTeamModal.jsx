import "./add-team-modal.css";
import Modal from "../../ModalComponent/Modal";
import { useRef, useState } from "react";

const AddTeamModal = ({ isModal, closeModal }) => {
  const teamNameInputRef = useRef(null);
  const [isError, setIsError] = useState(false);

  const saveTeam = () => {
    if (teamNameInputRef.current.value === "") {
      setIsError(true);
      return;
    }
    console.log("Added team with name", teamNameInputRef.current.value);
    setIsError(false);
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
        {isError && (
          <div className={"team-modal-error-text"}>
            You can not create team with empty name
          </div>
        )}
        <div>Type team name</div>
        <input ref={teamNameInputRef} className={"modal-input"} />
        <div
          className={"modal-save-btn"}
          onClick={saveTeam}
          data-testid={"team-save-btn"}
        >
          Create team
        </div>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
