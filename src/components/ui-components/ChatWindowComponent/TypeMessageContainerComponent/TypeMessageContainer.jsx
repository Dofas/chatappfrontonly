import React, { useState } from "react";
import PaperClipImg from "../../../../assets/images/paperClip.jpg";
import "./type-message-input.scss";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedUserState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";
import { UserService } from "../../../../utils/UserService/UserService";
import { allMessages } from "../../../../state/messagesState/atomMessages";
import jwt_decode from "jwt-decode";

function getCurrentTime() {
  const now = new Date();
  const currentMinutes =
    now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes();
  const currentHours =
    now.getHours() > 12 && now.getHours() < 23
      ? { hours: now.getHours(), format: "am" }
      : { hours: now.getHours(), format: "pm" };
  return currentHours.hours + ":" + currentMinutes + currentHours.format;
}

const TypeMessageContainer = ({ socket }) => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);
  const [isSettings, setIsSettings] = useState(false);
  const [messages, setMessages] = useRecoilState(allMessages);
  const [uploadedImage, setUploadImage] = useState("");
  const [message, setMessage] = useState("");

  const closeIsSettings = () => setIsSettings(false);
  const triggerSettings = () => setIsSettings(!isSettings);
  const ref = useClickOutside(closeIsSettings);

  const onSendBtnClick = async () => {
    if (!activeUser?.id || !selectedUser?.id || !message) return;

    const messageData = {
      from: activeUser.id,
      to: selectedUser.id,
      sender: activeUser.id,
      message: { text: message, sendTime: getCurrentTime() },
      file: new File(["emptyFile"], "emptyFile.txt", {
        type: "text/plain",
      }),
      isRead: false,
    };
    if (!localStorage.getItem("auth")) return;
    const decoded = jwt_decode(localStorage.getItem("auth"));
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      await UserService.getRefreshToken();
    }
    await UserService.createMessage(messageData).then(() => {
      socket.current.emit("send-msg", { ...messageData, file: undefined });
      const newMessages = [...messages, messageData];
      setMessages(newMessages);
      setMessage("");
    });
  };

  const onUploadImage = async (event) => {
    const messageData = {
      from: activeUser.id,
      to: selectedUser.id,
      sender: activeUser.id,
      message: { text: event.target.files[0].name, sendTime: getCurrentTime() },
      file: event.target.files[0],
      isRead: false,
    };
    if (!localStorage.getItem("auth")) return;
    const decoded = jwt_decode(localStorage.getItem("auth"));
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      await UserService.getRefreshToken();
    }
    await UserService.createMessage(messageData).then((messageResp) => {
      socket.current.emit("send-msg", {
        ...messageData,
        file: messageResp.fileName,
      });
      const newMessages = [
        ...messages,
        {
          ...messageData,
          message: { ...messageData.message, file: messageResp.fileName },
        },
      ];
      setMessages(newMessages);
      setUploadImage("");
      closeIsSettings();
    });
  };

  const onSettingClick = (e) => {
    e.stopPropagation();
    triggerSettings();
  };

  const onKeyDownTypeMessageInput = async (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      await onSendBtnClick();
    }
  };

  return (
    <div className="type-message-container">
      <div
        className="paper-clip-container"
        data-testid="paper-clip-btn"
        onClick={onSettingClick}
        ref={ref}
      >
        <img src={PaperClipImg} alt="paperClip" className="paper-clip-img" />
        {isSettings && (
          <div
            className="type-message-settings"
            onClick={(e) => e.stopPropagation()}
          >
            <div>Select image</div>
            <input
              type={"file"}
              name={"myImage"}
              onChange={onUploadImage}
              value={uploadedImage}
              data-testid="upload-image-input"
            />
          </div>
        )}
      </div>
      <textarea
        className="type-message-input"
        placeholder="Type your message…"
        value={message}
        contentEditable={false}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(event) => onKeyDownTypeMessageInput(event)}
      />
      <button
        className="send-message-button"
        onClick={onSendBtnClick}
        data-testid="send-message-button"
      >
        Send
      </button>
    </div>
  );
};

export default TypeMessageContainer;
