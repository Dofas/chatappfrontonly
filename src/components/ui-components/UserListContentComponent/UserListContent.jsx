import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredUserList } from "../../../state/activeUserListState/selectorActiveUserListState";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./user-list-content.css";
import UserListContentItem from "./UserListContentItemComponent/UserListContentItem";

const UserListContent = () => {
  const users = useRecoilValue(filteredUserList);
  const [chosenUser, setChosenUser] = useRecoilState(selectedUserState);

  const setActiveUserClick = (e, user) => {
    setChosenUser(user);
  };
  return (
    <div className={"user-list-team-users"}>
      {users?.length ? (
        users.map((user) => (
          <UserListContentItem
            user={user}
            chosenUser={chosenUser}
            setChosenUser={setActiveUserClick}
            key={user.senderName.concat(user.messageContent)}
          />
        ))
      ) : (
        <div>No users matched</div>
      )}
    </div>
  );
};

export default UserListContent;
