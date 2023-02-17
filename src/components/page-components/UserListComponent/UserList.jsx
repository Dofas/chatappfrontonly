import React, { useEffect, useState } from "react";
import UserListHeader from "../../ui-components/UserListHeaderComponent/UserListHeader";
import UserListContent from "../../ui-components/UserListContentComponent/UserListContent";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeChannel,
  allTeams,
} from "../../../state/activeChannelState/atomActiveChannelState";
import { usersList } from "../../../state/activeUserListState/atomActiveUserListState";
import "./user-list.scss";
import Spinner from "../../ui-components/SpinnerComponent/Spinner";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import { sidebarState } from "../../../state/responsiveState/atomSideBarState";
import { UserService } from "../../../utils/UserService/UserService";

const UserList = ({ socket }) => {
  const [activeTeam, setActiveTeam] = useRecoilState(activeChannel);
  const [users, setUsers] = useRecoilState(usersList);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const setAllExistedTeams = useSetRecoilState(allTeams);
  const { innerWidth } = useCalculateWindowSize();
  const setIsSidebar = useSetRecoilState(sidebarState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeSidebarState = () => {
    setIsSidebar((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      if (activeTeam?.users) {
        Promise.all(
          activeTeam.users.map(async (user) => {
            const userInfo = await UserService.findUser(
              user,
              localStorage.getItem("auth")
            );
            return userInfo;
          })
        )
          .then((data) => setUsers(data))
          .catch((error) => {
            setIsError(true);
            console.log(`Error while loading usersInfo ${error.message}`);
          })
          .finally(() => setIsLoading(false));
      }
    })();

    //eslint-disable-next-line
  }, [activeTeam?.users]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("upd-team-user", (updatedUsers) => {
        setAllExistedTeams(updatedUsers.teams);
        if (updatedUsers.isEmptyUsers) {
          setActiveTeam("");
          return;
        }
        if (
          !updatedUsers.isEmptyUsers &&
          activeTeam.name === updatedUsers.name
        ) {
          if (selectedUser.nickName === updatedUsers.nickNameToTDelete) {
            setSelectedUser("");
          }
          const newUsers =
            users?.length > 0
              ? users.filter(
                  (user) => user.nickName !== updatedUsers.nickNameToTDelete
                )
              : [];
          const activeTeam = updatedUsers.teams.filter(
            (team) => updatedUsers.name === team.name
          )[0];
          setActiveTeam(activeTeam);
          setUsers(newUsers);
        }
      });
    }
  }, [
    socket.current,
    activeTeam,
    selectedUser,
    users,
    setActiveTeam,
    setAllExistedTeams,
    setSelectedUser,
    setUsers,
  ]);

  const userListContent = (
    <div
      className={
        innerWidth > 790
          ? "user-list-container"
          : !!selectedUser
          ? "user-list-container display-hidden"
          : "user-list-container full-width"
      }
    >
      {isError ? (
        <span className="title">Problems with load members</span>
      ) : activeTeam?.users ? (
        <>
          <UserListHeader />
          <UserListContent socket={socket} />
        </>
      ) : (
        <div className="empty-user-list-text">
          <div className="sidebar-toggle" onClick={changeSidebarState}>
            <span className="arrow-left">&#8592;</span>
            <span>Open channel list</span>
          </div>
          <span>You need some team to see members there</span>
        </div>
      )}
    </div>
  );

  return isLoading ? <Spinner /> : userListContent;
};

export default UserList;
