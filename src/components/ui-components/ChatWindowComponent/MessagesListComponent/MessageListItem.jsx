import React from "react";

function checkIsImage(value) {
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  return imageRegex.test(value);
}

function removeWhiteSpaces(value) {
  return value.replace(/ /g, "");
}

const MessageListItem = ({ selectedUser, activeUser, text, time, sender }) => {
  return (
    <div
      className={
        sender === selectedUser.id
          ? "messages-list-item messages-list-item-selected-user"
          : "messages-list-item messages-list-item-active-user"
      }
    >
      <div className="messages-list-message-content">
        {checkIsImage(text) ? (
          <div className="messages-list-message-image-container">
            <a
              download
              href={"/images/".concat(removeWhiteSpaces(text))}
              className="message-list-image-link-container"
            >
              <img
                className="message-list-image-link"
                src={"/images/".concat(removeWhiteSpaces(text))}
                alt="loadedImage"
              />
              <div className="messages-list-message-time">{time}</div>
            </a>
            <div className="messages-list-message-image-info">
              <div>{text}</div>
              <a download href={"/images/".concat(removeWhiteSpaces(text))}>
                Download
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="messages-list-item-text">
              {text}
              <div className="messages-list-message-time">{time}</div>
            </div>
            <div
              className={
                sender === selectedUser.id ? "triangle" : "backup-triangle"
              }
            />
          </>
        )}
      </div>
      <div className="messages-list-image-container">
        <img
          src={
            sender === selectedUser.id
              ? selectedUser.senderAvatar
              : activeUser.avatar
          }
          className="messages-list-user-avatar"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default MessageListItem;
