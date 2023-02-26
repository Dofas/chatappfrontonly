import React from "react";
import { useRecoilValue } from "recoil";
import {
  isSelectedUserInfoState,
  selectedUserState,
} from "../../../state/selectedUserState/atomSelectedUserState";
import "./selected-user.scss";
import SelectedUserHeader from "../../ui-components/SelectedUserHeaderComponent/SelectedUserHeader";
import SelectedUserInfo from "../../ui-components/SelectedUserInfoComponent/SelectedUserInfo";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";

const SelectedUser = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const isSelectedUserInfoStateValue = useRecoilValue(isSelectedUserInfoState);
  const { innerWidth } = useCalculateWindowSize();

  return (
    isSelectedUserInfoStateValue &&
    selectedUser?.id &&
    innerWidth > 1330 && (
      <div className="selected-user-container">
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
      </div>
    )
  );
};

export default SelectedUser;
