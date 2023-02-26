import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredUserList } from "../../../state/activeUserListState/selectorActiveUserListState";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./user-list-content.scss";
import UserListContentItem from "./UserListContentItemComponent/UserListContentItem";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import { UserService } from "../../../utils/UserService/UserService";
import jwt_decode from "jwt-decode";

const UserListContent = ({ socket }) => {
  const users = useRecoilValue(filteredUserList);
  const [chosenUser, setChosenUser] = useRecoilState(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);

  const setActiveUserClick = async (e, user) => {
    setChosenUser(user);
    const users = { from: activeUser.id, to: user.id };
    if (!localStorage.getItem("auth")) {
      window.location.replace("/chatapp/login");
    }
    const decoded = jwt_decode(localStorage.getItem("auth"));
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      await UserService.getRefreshToken();
    }
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
