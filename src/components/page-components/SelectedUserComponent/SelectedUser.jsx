import React from "react";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./selected-user.css";

const SelectedUser = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  return (
    <div className={"selected-user-container"}>
      {selectedUser ? (
        <>
          <div className={"selected-user-avatar"}>
            <img alt={"avatar"} src={selectedUser?.senderAvatar} />
            <div
              className={"selected-user-name"}
              title={selectedUser?.senderName}
            >
              {selectedUser?.senderName}
            </div>
            <div
              className={"selected-user-location"}
              title={selectedUser?.location}
            >
              {selectedUser?.location}
            </div>
          </div>
          <div className={"selected-user-info-container"}>
            <div>
              <div className={"selected-user-info-block"}>
                <span>Nickname</span>
                <div title={selectedUser?.nickName}>
                  {selectedUser?.nickName}
                </div>
              </div>
              <div className={"selected-user-info-block"}>
                <span>Email</span>
                <div title={selectedUser?.email}>{selectedUser?.email}</div>
              </div>
              <div className={"selected-user-info-block"}>
                <span>Phone Number</span>
                <div title={selectedUser?.number}>{selectedUser?.number}</div>
              </div>
            </div>
            <div>
              <div className={"selected-user-info-block"}>
                <span>Date of birthday</span>
                <div title={selectedUser?.dateOfBirth}>
                  {selectedUser?.dateOfBirth}
                </div>
              </div>
              <div className={"selected-user-info-block"}>
                <span>Gender</span>
                <div title={selectedUser?.gender}>{selectedUser?.gender}</div>
              </div>
              <div className={"selected-user-info-block"}>
                <span>Languages</span>
                <div
                  title={
                    selectedUser?.languages?.length <= 1
                      ? selectedUser?.languages
                      : selectedUser?.languages.join(", ")
                  }
                >
                  {selectedUser?.languages?.length <= 1
                    ? selectedUser?.languages
                    : selectedUser?.languages.join(", ")}
                </div>
              </div>
              <div
                onClick={() => console.log("profile link")}
                className={"selected-user-profile-link"}
              >
                Show full profile
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={"selected-user-empty-text"}>
          Select user for seen info about him
        </div>
      )}
    </div>
  );
};

export default SelectedUser;
