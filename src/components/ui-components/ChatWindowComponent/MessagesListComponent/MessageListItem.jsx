import React, { useEffect, useMemo, useRef } from "react";
import { saveAs } from "file-saver";
import classNames from "classnames";

function getTextWidth(textToCheck) {
  const text = document.createElement("span");
  document.body.appendChild(text);

  text.style.font = "Avenir-Roman, serif";
  text.style.fontSize = 14 + "px";
  text.style.height = "auto";
  text.style.width = "auto";
  text.style.position = "absolute";
  text.style.whiteSpace = "no-wrap";
  text.innerHTML = textToCheck;

  const width =
    Math.ceil(text.offsetWidth) < 60 ? 60 : Math.ceil(text.offsetWidth);
  const formattedWidth = width * 1.7 + "px";

  document.body.removeChild(text);
  return parseInt(formattedWidth, 10) > 400 ? "400px" : formattedWidth;
}

const MessageListItem = ({
  selectedUser,
  activeUser,
  text,
  time,
  sender,
  file,
}) => {
  const messageRef = useRef();

  const downloadImage = (fileName) => {
    saveAs(process.env.REACT_APP_API_URL + "/" + fileName, text);
  };

  const calculatedWidth = useMemo(() => {
    return getTextWidth(text);
  }, [text]);

  useEffect(() => {
    if (!messageRef.current) return;
    if (messageRef.current.clientWidth !== calculatedWidth) {
      messageRef.current.style.width = "";
      messageRef.current.style.width = calculatedWidth;
    }
    if (
      parseInt(messageRef.current.scrollHeight, 10) <= 48 &&
      parseInt(messageRef.current.scrollHeight, 10) !== 21
    ) {
      messageRef.current.style.height = "";
      messageRef.current.style.height = "21px";
    } else {
      if (
        parseInt(messageRef.current.style.height, 10) !==
        parseInt(messageRef.current.scrollHeight, 10)
      ) {
        messageRef.current.style.height = "";
        messageRef.current.style.height =
          messageRef.current.scrollHeight + "px";
      }
    }
  }, [messageRef.current]);

  return (
    <div
      className={classNames(
        "messages-list-item",
        { "messages-list-item-selected-user": sender === selectedUser.id },
        { "messages-list-item-active-user": sender !== selectedUser.id }
      )}
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
                className={classNames(
                  "download-btn",
                  { "flex-end": sender === selectedUser.id },
                  { "flex-start": sender !== selectedUser.id }
                )}
              >
                Download
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="messages-list-item-user-name">
              <div>
                {sender === selectedUser.id
                  ? selectedUser.firstName.concat(" ", selectedUser.lastName)
                  : activeUser.name}
              </div>
              <div>{time}</div>
            </div>
            <div className="messages-list-item-text">
              <textarea
                className={"messages-list-message-text"}
                ref={messageRef}
                disabled
                defaultValue={text}
              ></textarea>
            </div>
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
