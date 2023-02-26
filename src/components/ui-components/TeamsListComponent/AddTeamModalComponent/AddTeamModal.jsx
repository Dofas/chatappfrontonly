import "./add-team-modal.scss";
import Modal from "../../ModalComponent/Modal";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allTeams,
  allUsers,
} from "../../../../state/activeChannelState/atomActiveChannelState";
import { UserService } from "../../../../utils/UserService/UserService";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";
import InputWithBorderBottom from "../../InputComponents/InputWithBorderBottom/InputWithBorderBottom";
import jwt_decode from "jwt-decode";
import CloseIcon from "../../../../assets/images/modal-close.svg";

export const validateSpecSymbols = (stringToCheck) => {
  return (
    String(stringToCheck)
      .toLowerCase()
      .match(/[!-\/:-@[-`{-~]/gm) === null
  );
};

const AddTeamModal = ({ isModal, closeModal, socket }) => {
  const [teamName, setTeamName] = useState();
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useRecoilState(allUsers);
  const activeUser = useRecoilValue(activeUserInfo);

  const [teams, setTeams] = useRecoilState(allTeams);

  const saveTeam = async () => {
    if (
      teamName === "" ||
      !validateSpecSymbols(teamName) ||
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
      name: teamName,
      users: [activeUser.id, ...checkedUsers],
    };
    if (!localStorage.getItem("auth")) return;
    const decoded = jwt_decode(localStorage.getItem("auth"));
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      await UserService.getRefreshToken();
    }
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
    <Modal show={isModal} onClose={closeModal} className='create-team-modal'>
      <div>
        <div className='team-list-modal-header'>Create team</div>
        <img
            src={CloseIcon}
            // data-testid="close-add-team-modal-btn"
            onClick={closeModal}
            className="modal-close-btn"
        />
      </div>

      <div className="team-modal-content">
        <InputWithBorderBottom
          id="add-team-modal-team-name"
          value={teamName}
          onChange={setTeamName}
          labelText="Type team name"
          className="modal-input"
          testId="team-name-input"
        />
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
        {isError && (
            <div className="team-modal-error-text">
              You can not create empty team name
              or use space or spec symbols
            </div>
        )}
      </div>
      <div className="team-modal-footer">
        <button
            className="modal-cancel-btn"
            onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="modal-save-btn"
          onClick={saveTeam}
          data-testid="team-save-btn"
        >
          Create team
        </button>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
