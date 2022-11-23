import React, { useEffect, useState } from "react";
import "./responsive-selected-user.css";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import SelectedUserHeader from "../SelectedUserHeaderComponent/SelectedUserHeader";
import SelectedUserInfo from "../SelectedUserInfoComponent/SelectedUserInfo";

const ResponsiveSelectedUser = ({ socket }) => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const changeCollapse = () => setIsCollapsed((prev) => !prev);

  const disSelectUser = (event) => {
    event.stopPropagation();
    setSelectedUser("");
  };

  useEffect(() => {
    socket.current.on("upd-status", (newStatus) => {
      if (selectedUser.nickName === newStatus.nickName) {
        setSelectedUser({ ...selectedUser, status: newStatus.status });
      }
    });
  }, [socket.current, selectedUser, setSelectedUser]);

  return (
    selectedUser?.id && (
      <div className="responsive-selected-user-container">
        <div
          className="responsive-selected-user-header-container"
          onClick={changeCollapse}
          data-testid="collapse-user-info"
        >
          <div onClick={(event) => disSelectUser(event)}>
            <span className="arrow responsive-900">&#8592;</span>
            <SelectedUserHeader
              avatar={selectedUser?.avatar}
              name={selectedUser?.firstName + " " + selectedUser?.lastName}
              location={selectedUser?.location}
              status={selectedUser?.status}
            />
          </div>
        </div>
        {isCollapsed && (
          <SelectedUserInfo
            nickName={selectedUser?.nickName}
            email={selectedUser?.email}
            phone={selectedUser?.number}
            dob={selectedUser?.dateOfBirthday}
            gender={selectedUser?.gender}
            languages={selectedUser?.languages}
          />
        )}
      </div>
    )
  );
};

export default ResponsiveSelectedUser;
