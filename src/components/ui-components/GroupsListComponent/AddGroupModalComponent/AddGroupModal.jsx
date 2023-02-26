import "./add-group-modal.scss";
import Modal from "../../ModalComponent/Modal";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allGroups,
  allUsers,
} from "../../../../state/activeChannelState/atomActiveChannelState";
import { UserService } from "../../../../utils/UserService/UserService";
import { validateSpecSymbols } from "../../TeamsListComponent/AddTeamModalComponent/AddTeamModal";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";
import InputWithBorderBottom from "../../InputComponents/InputWithBorderBottom/InputWithBorderBottom";
import jwt_decode from "jwt-decode";

const AddGroupModal = ({ isModal, closeModal, socket }) => {
  const [isError, setIsError] = useState(false);
  const [groupName, setGroupName] = useState();
  const [users, setUsers] = useRecoilState(allUsers);
  const [groups, setGroups] = useRecoilState(allGroups);
  const activeUser = useRecoilValue(activeUserInfo);

  const saveGroup = async () => {
    if (
      groupName === "" ||
      !validateSpecSymbols(groupName) ||
      users.filter((user) => user.checked === true).length === 0
    ) {
      setIsError(true);
      return;
    }
    const checkedUsers = users
      .map((user) => (user.checked === true ? user.nickName : undefined))
      .filter((nick) => nick !== undefined);
    const group = {
      name: groupName,
      users: [activeUser.id, ...checkedUsers],
    };
    if (!localStorage.getItem("auth")) return;
    const decoded = jwt_decode(localStorage.getItem("auth"));
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      await UserService.getRefreshToken();
    }
    await UserService.createGroup(group);
    const newGroups = [group];
    socket.current.emit("add-group", newGroups);
    const fullGroups = [...groups, ...newGroups];
    setGroups(fullGroups);
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
        data-testid="close-add-group-modal-btn"
        onClick={closeModal}
        className="modal-close-btn"
      />
      <div className="group-modal-content">
        {isError && (
          <div className="group-modal-error-text">
            You can not create group with empty name <br />
            or use space or spec symbols
          </div>
        )}
        <div>There is only add group functional</div>
        <InputWithBorderBottom
          id="add-group-modal-team-name"
          value={groupName}
          onChange={setGroupName}
          labelText="Type group name"
          className="modal-input"
          testId="group-name-input"
        />
        <div
          onClick={saveGroup}
          className="modal-save-btn"
          data-testid="group-save-btn"
        >
          Save group
        </div>
      </div>
      <div className="group-modal-users-list">
        {!!users &&
          users.map(
            (user) =>
              user.id !== activeUser.id && (
                <div key={user.nickName} className="group-modal-user-item">
                  <input
                    data-testid="group-name-user-checkbox"
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
    </Modal>
  );
};

export default AddGroupModal;
