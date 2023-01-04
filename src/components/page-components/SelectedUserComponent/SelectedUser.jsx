import React from "react";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./selected-user.scss";
import SelectedUserHeader from "../../ui-components/SelectedUserHeaderComponent/SelectedUserHeader";
import SelectedUserInfo from "../../ui-components/SelectedUserInfoComponent/SelectedUserInfo";

const SelectedUser = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  return (
    <div className="selected-user-container">
      {selectedUser?.id ? (
        <>
          <SelectedUserHeader
            avatar={selectedUser?.avatar}
            name={selectedUser?.firstName + " " + selectedUser?.lastName}
            location={selectedUser?.location}
          />
          <SelectedUserInfo
            nickName={selectedUser?.nickName}
            email={selectedUser?.email}
            phone={selectedUser?.number}
            dob={selectedUser?.dateOfBirthday}
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
