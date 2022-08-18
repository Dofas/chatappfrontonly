import React from "react";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";

const UserListContentItem = ({ user, chosenUser, setChosenUser }) => {
  const [ref, isClickOutsideSettings, setIsClickOutsideSettings] =
    useClickOutside(false);

  const onSettingClick = (e) => {
    e.stopPropagation();
    setIsClickOutsideSettings(true);
  };

  const onDeleteUserClick = (e) => {
    e.stopPropagation();
    console.log(`deleted user with id ${user.id}`);
    setIsClickOutsideSettings(false);
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
          <div>{user.senderName}</div>
          <div onClick={onSettingClick} className={"position-relative"}>
            <div className={"dot delete-action"} />
            <div className={"dot delete-action"} />
            <div className={"dot delete-action"} />
            {isClickOutsideSettings && (
              <div
                className={"user-list-item-setting"}
                onClick={onDeleteUserClick}
                ref={ref}
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
