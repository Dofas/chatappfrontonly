import React from "react";
import "./messages-list.css";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";

function checkIsImage(value) {
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  return imageRegex.test(value);
}

function removeWhiteSpaces(value) {
  return value.replace(/ /g, "");
}

const MessagesList = ({ messages }) => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);

  return messages?.length ? (
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
            {checkIsImage(message.messageText) ? (
              <div className={"messages-list-message-image-container"}>
                <a
                  download
                  href={"/images/".concat(
                    removeWhiteSpaces(message.messageText)
                  )}
                  className={"message-list-image-link-container"}
                >
                  <img
                    className={"message-list-image-link"}
                    src={"/images/".concat(
                      removeWhiteSpaces(message.messageText)
                    )}
                    alt="loadedImage"
                  />
                  <div className={"messages-list-message-time"}>
                    {message.messageTime}
                  </div>
                </a>
                <div className={"messages-list-message-image-info"}>
                  <div>{message.messageText}</div>
                  <a
                    download
                    href={"/images/".concat(
                      removeWhiteSpaces(message.messageText)
                    )}
                  >
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className={"messages-list-item-text"}>
                  {message.messageText}
                  <div className={"messages-list-message-time"}>
                    {message.messageTime}
                  </div>
                </div>
                <div
                  className={
                    message.sender === selectedUser.id
                      ? "triangle"
                      : "backup-triangle"
                  }
                />
              </>
            )}
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
    <div className={"position-center"}>You have no messages with this user</div>
  );
};

export default MessagesList;
