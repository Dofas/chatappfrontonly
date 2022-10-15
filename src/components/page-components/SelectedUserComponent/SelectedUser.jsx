import React from "react";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./selected-user.css";
import SelectedUserHeader from "../../ui-components/SelectedUserHeaderComponent/SelectedUserHeader";
import SelectedUserInfo from "../../ui-components/SelectedUserInfoComponent/SelectedUserInfo";

const SelectedUser = () => {
  const selectedUser = useRecoilValue(selectedUserState);

  return (
    <div className="selected-user-container">
      {selectedUser ? (
        <>
          <SelectedUserHeader
            avatar={selectedUser?.senderAvatar}
            name={selectedUser?.senderName}
            location={selectedUser?.location}
          />
          <SelectedUserInfo
            nickName={selectedUser?.nickName}
            email={selectedUser?.email}
            phone={selectedUser?.number}
            dob={selectedUser?.dateOfBirth}
            gender={selectedUser?.gender}
            languages={selectedUser?.languages}
          />
        </>
      ) : (
        <div className="selected-user-empty-text">
          Select user to see info about him
        </div>
      )}
    </div>
  );
};

export default SelectedUser;
