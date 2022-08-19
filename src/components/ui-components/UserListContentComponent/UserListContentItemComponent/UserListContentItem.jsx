import React, { useState } from "react";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";

const UserListContentItem = ({ user, chosenUser, setChosenUser }) => {
  const [isSettings, setIsSettings] = useState(false);
  const closeSettingsModal = () => setIsSettings(false);
  const triggerSettingsModal = () => setIsSettings(!isSettings);

  const ref = useClickOutside(closeSettingsModal);

  const onSettingClick = (e) => {
    e.stopPropagation();
    triggerSettingsModal();
  };

  const onDeleteUserClick = (e) => {
    e.stopPropagation();
    console.log(`deleted user with id ${user.id}`);
    closeSettingsModal();
  };

  return (
    <div
      className={
        chosenUser?.id === user.id
          ? "user-list-team-user user-list-active-team-user"
          : "user-list-team-user"
      }
      onClick={(e) => setChosenUser(e, user)}
    >
      <div className={"position-relative"}>
        <img
          className={"user-list-team-user-avatar"}
          src={user.senderAvatar}
          alt={"avt"}
        />
        <div
          className={
            user.userStatus === "online"
              ? "on status"
              : user.userStatus === "busy"
              ? "busy status"
              : "off status"
          }
        />
      </div>
      <div className={"user-list-team-user-info"}>
        <div className={"user-list-team-user-name"}>
          <div title={user.senderName}>{user.senderName}</div>
          <div
            onClick={onSettingClick}
            className={"position-relative"}
            ref={ref}
          >
            <div className={"dot delete-action"} />
            <div className={"dot delete-action"} />
            <div className={"dot delete-action"} />
            {isSettings && (
              <div
                className={"user-list-item-setting"}
                onClick={onDeleteUserClick}
              >
                delete user
              </div>
            )}
          </div>
        </div>
        <div className={"user-list-team-user-messages"}>
          <div>{user.messageContent}</div>
          <div className={"user-list-team-user-time"}>{user.time}</div>
        </div>
      </div>
    </div>
  );
};

export default UserListContentItem;
