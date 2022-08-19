import React from "react";
import "./messages-list.css";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";
import MessageListItem from "./MessageListItem";

const MessagesList = ({ messages }) => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);

  return messages?.length ? (
    <div className="messages-list-container">
      {messages.map((message) => (
        <MessageListItem
          key={message.messageText.concat(message.messageTime)}
          selectedUser={selectedUser}
          activeUser={activeUser}
          text={message.messageText}
          time={message.messageTime}
          sender={message.sender}
        />
      ))}
    </div>
  ) : (
    <div className="position-center">You have no messages with this user</div>
  );
};

export default MessagesList;
