import React, { useEffect, useRef, useState } from "react";
import "./messages-list.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedUserState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";
import MessageListItem from "./MessageListItem";
import { UserService } from "../../../../utils/UserService/UserService";
import Spinner from "../../SpinnerComponent/Spinner";
import uuid from "react-uuid";
import { allMessages } from "../../../../state/messagesState/atomMessages";

const MessagesList = ({ setIsError, socket }) => {
  const selectedUser = useRecoilValue(selectedUserState);
  const activeUser = useRecoilValue(activeUserInfo);
  const [messages, setMessages] = useRecoilState(allMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!activeUser?.id || !selectedUser?.id) return;
    const users = { from: activeUser.id, to: selectedUser.id };
    setIsLoading(true);
    UserService.getAllMessages(users)
      .then((resp) => {
        setIsError(false);
        setMessages(resp);
      })
      .catch((error) => {
        setIsError(true);
        console.log(`Error while loading messages ${error.message}`);
      })
      .finally(() => setIsLoading(false));
  }, [activeUser, selectedUser, setMessages, setIsLoading, setIsError]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (newMessage) => {
        setArrivalMessages({
          message: { ...newMessage.message, file: newMessage.file },
          sender: newMessage.from,
        });
      });
    }
  }, [socket.current, setArrivalMessages]);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, setMessages]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return isLoading ? (
    <Spinner />
  ) : messages?.length ? (
    <div className="messages-list-container">
      {messages.map((message) => (
        <MessageListItem
          selectedUser={selectedUser}
          key={uuid()}
          activeUser={activeUser}
          text={message.message.text}
          time={message.message.sendTime}
          sender={message.sender}
          file={message.message.file}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  ) : (
    <div className="position-center">You have no messages with this user</div>
  );
};

export default MessagesList;
