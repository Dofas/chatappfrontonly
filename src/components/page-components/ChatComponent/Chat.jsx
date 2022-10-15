import React from "react";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import "./chat.css";
import { useLoadChatMessages } from "../../../utils/hooks/useLoadChatMessages";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import ChatWindow from "../../ui-components/ChatWindowComponent/ChatWindow";
import Spinner from "../../ui-components/SpinnerComponent/Spinner";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";

const Chat = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);
  const { messages, isError, isLoading } = useLoadChatMessages(
    selectedUser?.id,
    activeUser?.id
  );

  const { innerWidth } = useCalculateWindowSize();

  const messagesContent = (
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
      ) : messages ? (
        <>
          <ChatWindow messages={messages} />
        </>
      ) : (
        <div className="chat-empty-text">Select user to see chat with him</div>
      )}
    </div>
  );

  return isLoading ? <Spinner /> : messagesContent;
};

export default Chat;
