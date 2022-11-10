import React from "react";
import TypeMessageContainer from "./TypeMessageContainerComponent/TypeMessageContainer";
import MessagesList from "./MessagesListComponent/MessagesList";
import ResponsiveSelectedUser from "../ResponsiveSelectedUserComponent/ResponsiveSelectedUser";

const ChatWindow = ({ setIsError, socket }) => {
  return (
    <>
      <ResponsiveSelectedUser socket={socket} />
      <MessagesList setIsError={setIsError} socket={socket} />
      <TypeMessageContainer socket={socket} />
    </>
  );
};

export default ChatWindow;
