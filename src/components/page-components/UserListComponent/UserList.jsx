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

const UserList = () => {
  const activeTeam = useRecoilValue(activeChannel);
  const activeUser = useRecoilValue(activeUserInfo);
  const { members, isError, isLoading } = useLoadUsers(
    activeTeam,
    activeUser?.id
  );
  const setUsers = useSetRecoilState(usersList);
  useEffect(() => {
    if (members?.length) {
      setUsers(members);
    }
    //eslint-disable-next-line
  }, [members]);

  const userListContent = (
    <div className="user-list-container">
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
