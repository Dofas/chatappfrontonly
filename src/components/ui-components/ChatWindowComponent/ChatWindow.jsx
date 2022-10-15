import React from "react";
import TypeMessageContainer from "./TypeMessageContainerComponent/TypeMessageContainer";
import MessagesList from "./MessagesListComponent/MessagesList";
import ResponsiveSelectedUser from "../ResponsiveSelectedUserComponent/ResponsiveSelectedUser";

const ChatWindow = ({ messages }) => {
  return (
    <>
      <ResponsiveSelectedUser />
      <MessagesList messages={messages} />
      <TypeMessageContainer />
    </>
  );
};

export default ChatWindow;
