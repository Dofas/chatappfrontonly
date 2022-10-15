import React, { useEffect } from "react";
import UserListHeader from "../../ui-components/UserListHeaderComponent/UserListHeader";
import UserListContent from "../../ui-components/UserListContentComponent/UserListContent";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeChannel } from "../../../state/activeChannelState/atomActiveChannelState";
import { useLoadUsers } from "../../../utils/hooks/useLoadUsers";
import Spinner from "../../ui-components/SpinnerComponent/Spinner";
import { usersList } from "../../../state/activeUserListState/atomActiveUserListState";
import "./user-list.css";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";

const UserList = () => {
  const activeTeam = useRecoilValue(activeChannel);
  const activeUser = useRecoilValue(activeUserInfo);
  const { members, isError, isLoading } = useLoadUsers(
    activeTeam,
    activeUser?.id
  );
  const setUsers = useSetRecoilState(usersList);
  const selectedUser = useRecoilValue(selectedUserState);
  const { innerWidth } = useCalculateWindowSize();

  useEffect(() => {
    if (members?.length) {
      setUsers(members);
    }
    //eslint-disable-next-line
  }, [members]);

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
      ) : members ? (
        <>
          <UserListHeader />
          <UserListContent />
        </>
      ) : (
        <div className="empty-user-list-text">
          You need some team to see members there
        </div>
      )}
    </div>
  );

  return isLoading ? <Spinner /> : userListContent;
};

export default UserList;
