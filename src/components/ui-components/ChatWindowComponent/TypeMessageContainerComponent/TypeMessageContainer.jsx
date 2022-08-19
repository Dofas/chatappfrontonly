import React, { useRef, useState } from "react";
import PaperClipImg from "../../../../assets/images/paperClip.jpg";
import "./type-message-input.css";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";

const TypeMessageContainer = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);
  const [isSettings, setIsSettings] = useState(false);
  const [uploadedImage, setUploadImage] = useState(null);

  const closeIsSettings = () => setIsSettings(false);
  const triggerSettings = () => setIsSettings(!isSettings);
  const messageInputRef = useRef();

  const ref = useClickOutside(closeIsSettings);

  //todo: can i set empty string for a ref ????
  const onSendBtnClick = () => {
    console.log(`message with content ${messageInputRef.current.value} send
    from ${activeUser?.id} to ${selectedUser?.id}`);
    messageInputRef.current.value = "";
  };

  const onUploadImage = (event) => {
    console.log(`Uploaded image: ${event.target.files[0].name}`);
    setUploadImage(event.target.files[0]);
    closeIsSettings();
  };

  const onSettingClick = (e) => {
    e.stopPropagation();
    triggerSettings();
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
              data-testid="upload-image-input"
            />
          </div>
        )}
      </div>
      <input
        className="type-message-input"
        placeholder={"Type your message…"}
        ref={messageInputRef}
      />
      <button className="send-message-button" onClick={onSendBtnClick}>
        Send
      </button>
    </div>
  );
};

export default TypeMessageContainer;
