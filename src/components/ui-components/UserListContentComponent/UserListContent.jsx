import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredUserList } from "../../../state/activeUserListState/selectorActiveUserListState";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./user-list-content.css";
import UserListContentItem from "./UserListContentItemComponent/UserListContentItem";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import { UserService } from "../../../utils/UserService/UserService";

const UserListContent = ({ socket }) => {
  const users = useRecoilValue(filteredUserList);
  const [chosenUser, setChosenUser] = useRecoilState(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);

  const setActiveUserClick = async (e, user) => {
    setChosenUser(user);
    const users = { from: activeUser.id, to: user.id };
    UserService.updateReadStatus(users).catch((error) => {
      console.log(`Error while loading messages ${error.message}`);
    });
  };

  return (
    <div className="user-list-team-users">
      {users?.length ? (
        users.map(
          (user) =>
            user.id !== activeUser.id && (
              <UserListContentItem
                user={user}
                chosenUser={chosenUser}
                setChosenUser={setActiveUserClick}
                key={user.nickName}
                socket={socket}
              />
            )
        )
      ) : (
        <div>No users matched</div>
      )}
    </div>
  );
};

export default React.memo(UserListContent);
