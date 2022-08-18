import React from "react";
import "./messages-list.css";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";

const MessagesList = ({ messages }) => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);

  return messages.length ? (
    <div className={"messages-list-container"}>
      {messages.map((message) => (
        <div
          key={message.messageText.concat(message.messageTime)}
          className={
            message.sender === selectedUser.id
              ? "messages-list-item messages-list-item-selected-user"
              : "messages-list-item messages-list-item-active-user"
          }
        >
          <div className={"messages-list-message-content"}>
            <div className={"messages-list-item-text"}>
              {message.messageText}
            </div>
            <div className={"messages-list-message-time"}>
              {message.messageTime}
            </div>
          </div>
          <div className={"messages-list-image-container"}>
            <img
              src={
                message.sender === selectedUser.id
                  ? selectedUser.senderAvatar
                  : activeUser.avatar
              }
              className={"messages-list-user-avatar"}
              alt={"avatar"}
            />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className={"position-center"}>
      You have no messages with this users
    </div>
  );
};

export default MessagesList;
