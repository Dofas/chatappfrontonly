import React from "react";
import TypeMessageContainer from "./TypeMessageContainerComponent/TypeMessageContainer";
import MessagesList from "./MessagesListComponent/MessagesList";

const ChatWindow = ({ messages }) => {
  return (
    <>
      <MessagesList messages={messages} />
      <TypeMessageContainer />
    </>
  );
};

export default ChatWindow;