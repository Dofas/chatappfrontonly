import React, { useRef, useState } from "react";
import PaperClipImg from "../../../../assets/images/paperClip.jpg";
import "./type-message-input.css";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";

const TypeMessageContainer = () => {
  const [isSettings, setIsSettings] = useState(false);
  const [uploadedImage, setUploadImage] = useState(null);

  const closeIsSettings = () => setIsSettings(false);
  const triggerSettings = () => setIsSettings(!isSettings);
  const messageInputRef = useRef();

  const ref = useClickOutside(closeIsSettings);

  const onPaperClipClick = () => console.log("paper clip image clicked");
  //todo: can i set empty string for a ref ????
  const onSendBtnClick = () => {
    console.log(`message with content ${messageInputRef.current.value} send`);
    messageInputRef.current.value = "";
  };

  const onUploadImage = (event) => {
    console.log(`Uploaded image: ${event.target.files[0]}`);
    setUploadImage(event.target.files[0]);
  };

  return (
    <div className={"type-message-container"}>
      <div className={"paper-clip-container"} onClick={triggerSettings}>
        <img
          src={PaperClipImg}
          alt="paperClip"
          className={"paper-clip-img"}
          onClick={onPaperClipClick}
        />
        {isSettings && (
          <div className={"type-message-settings"} ref={ref}>
            <div>Select image</div>
            <input type={"file"} name={"myImage"} onChange={onUploadImage} />
          </div>
        )}
      </div>
      <input
        className={"type-message-input"}
        placeholder={"Type your message…"}
        ref={messageInputRef}
      />
      <button className={"send-message-button"} onClick={onSendBtnClick}>
        Send
      </button>
    </div>
  );
};

export default TypeMessageContainer;
