import React, { useRef } from "react";
import PaperClipImg from "../../../../assets/images/paperClip.jpg";
import "./type-message-input.css";

const TypeMessageContainer = () => {
  const messageInputRef = useRef();
  const onPaperClipClick = () => console.log("paper clip image clicked");
  //todo: can i set empty string for a ref ????
  const onSendBtnClick = () => {
    console.log(`message with content ${messageInputRef.current.value} send`);
    messageInputRef.current.value = "";
  };

  return (
    <div className={"type-message-container"}>
      <img
        src={PaperClipImg}
        alt="paperClip"
        className={"paper-clip-img"}
        onClick={onPaperClipClick}
      />
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
