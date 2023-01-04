import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./chat.scss";
import ChatWindow from "../../ui-components/ChatWindowComponent/ChatWindow";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";

const Chat = ({ socket }) => {
  const selectedUser = useRecoilValue(selectedUserState);
  const [isError, setIsError] = useState(false);

  const { innerWidth } = useCalculateWindowSize();

  return (
    <div
      className={
        innerWidth > 790
          ? "chat-container"
          : !!selectedUser
          ? "chat-container"
          : "chat-container display-hidden"
      }
    >
      {isError ? (
        <span className="title">Problems with load messages</span>
      ) : selectedUser ? (
        <>
          <ChatWindow setIsError={setIsError} socket={socket} />
        </>
      ) : (
        <div className="chat-empty-text">Select user to see chat with him</div>
      )}
    </div>
  );
};

export default Chat;
