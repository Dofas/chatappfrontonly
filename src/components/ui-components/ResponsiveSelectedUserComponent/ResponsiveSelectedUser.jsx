import React, { useState } from "react";
import "./responsive-selected-user.css";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import SelectedUserHeader from "../SelectedUserHeaderComponent/SelectedUserHeader";
import SelectedUserInfo from "../SelectedUserInfoComponent/SelectedUserInfo";

const ResponsiveSelectedUser = () => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const changeCollapse = () => setIsCollapsed((prev) => !prev);

  const disSelectUser = () => setSelectedUser("");

  return (
    <div className="responsive-selected-user-container">
      <div className="responsive-selected-user-header-container">
        <div>
          <span className="arrow" onClick={disSelectUser}>
            &#8592;
          </span>
          <SelectedUserHeader
            avatar={selectedUser?.senderAvatar}
            name={selectedUser?.senderName}
            location={selectedUser?.location}
            status={selectedUser?.userStatus}
          />
        </div>
        <span className="arrow" onClick={changeCollapse}>
          &#8595;
        </span>
      </div>
      {isCollapsed && (
        <SelectedUserInfo
          nickName={selectedUser?.nickName}
          email={selectedUser?.email}
          phone={selectedUser?.number}
          dob={selectedUser?.dateOfBirth}
          gender={selectedUser?.gender}
          languages={selectedUser?.languages}
        />
      )}
    </div>
  );
};

export default ResponsiveSelectedUser;
