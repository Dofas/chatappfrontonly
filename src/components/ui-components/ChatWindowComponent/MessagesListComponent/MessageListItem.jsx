import React from "react";
import { saveAs } from "file-saver";

const MessageListItem = ({
  selectedUser,
  activeUser,
  text,
  time,
  sender,
  file,
}) => {
  const downloadImage = (fileName) => {
    saveAs(process.env.REACT_APP_API_URL + "/" + fileName, text);
  };

  return (
    <div
      className={
        sender === selectedUser.id
          ? "messages-list-item messages-list-item-selected-user"
          : "messages-list-item messages-list-item-active-user"
      }
    >
      <div className="messages-list-message-content">
        {!!file ? (
          <div className="messages-list-message-image-container">
            <div
              className="messages-list-download-image"
              onClick={() => downloadImage(file)}
            >
              <img
                className="message-list-image-link"
                src={process.env.REACT_APP_API_URL + "/" + file}
                alt="loadedImage"
              />
              <div className="messages-list-message-time">{time}</div>
            </div>
            <div className="messages-list-message-image-info">
              <div>{text}</div>
              <button
                onClick={() => downloadImage(file)}
                className="download-btn"
                style={
                  sender === selectedUser.id
                    ? { alignSelf: "flex-end" }
                    : { alignSelf: "flex-start" }
                }
              >
                Download
              </button>
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
              ? process.env.REACT_APP_API_URL + "/" + selectedUser.avatar
              : process.env.REACT_APP_API_URL + "/" + activeUser.avatar
          }
          className="messages-list-user-avatar"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default MessageListItem;
