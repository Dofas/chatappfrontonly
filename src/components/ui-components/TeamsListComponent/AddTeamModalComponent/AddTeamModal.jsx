import "./add-team-modal.scss";
import Modal from "../../ModalComponent/Modal";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allTeams,
  allUsers,
} from "../../../../state/activeChannelState/atomActiveChannelState";
import { UserService } from "../../../../utils/UserService/UserService";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";

export const validateSpecSymbols = (stringToCheck) => {
  return (
    String(stringToCheck)
      .toLowerCase()
      .match(/[!-\/:-@[-`{-~]/gm) === null
  );
};

const AddTeamModal = ({ isModal, closeModal, socket }) => {
  const teamNameInputRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useRecoilState(allUsers);
  const activeUser = useRecoilValue(activeUserInfo);
  const [teams, setTeams] = useRecoilState(allTeams);

  const saveTeam = async () => {
    if (
      teamNameInputRef.current.value === "" ||
      !validateSpecSymbols(teamNameInputRef.current.value) ||
      users.filter((user) => user.checked === true).length === 0 ||
      !activeUser?.id
    ) {
      setIsError(true);
      return;
    }
    const checkedUsers = users
      .map((user) => (user.checked === true ? user.nickName : undefined))
      .filter((nick) => nick !== undefined);
    const team = {
      name: teamNameInputRef.current.value,
      users: [activeUser.id, ...checkedUsers],
    };
    await UserService.createTeam(team);
    const newTeams = [team];
    socket.current.emit("add-team", newTeams);
    const fullTeams = [...teams, ...newTeams];
    setTeams(fullTeams);
    setIsError(false);
    closeModal();
  };

  const updateUser = (nick) => {
    const updatedUsers = users.map((user) =>
      user.nickName === nick ? { ...user, checked: !user.checked } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Modal show={isModal} onClose={closeModal}>
      <div
        data-testid="close-add-team-modal-btn"
        onClick={closeModal}
        className="modal-close-btn"
      />
      <div className="team-modal-content">
        {isError && (
          <div className="team-modal-error-text">
            You can not create empty team name <br />
            or use space or spec symbols
          </div>
        )}
        <div>Type team name</div>
        <input
          ref={teamNameInputRef}
          className="modal-input"
          data-testid="team-name-input"
        />
        <div
          className="modal-save-btn"
          onClick={saveTeam}
          data-testid="team-save-btn"
        >
          Create team
        </div>
        <div className="team-modal-users-list">
          {!!users &&
            users.map(
              (user) =>
                user.id !== activeUser.id && (
                  <div key={user.nickName} className="team-modal-user-item">
                    <input
                      data-testid="team-name-user-checkbox"
                      type="checkbox"
                      checked={user.checked}
                      onChange={() => updateUser(user.nickName)}
                    />
                    <div style={{ marginLeft: 5 }}>
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
