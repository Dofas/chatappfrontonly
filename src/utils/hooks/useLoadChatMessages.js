import { useEffect, useState, useRef } from "react";
import { UserService } from "../UserService/UserService";

export function useLoadChatMessages(senderId, userId) {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!userId || !senderId) return;

    cancelRequest.current = false;
    (async () => {
      try {
        setIsLoading(true);
        const messagesResponse = await UserService.getAllMessages(
          senderId,
          userId
        );

        if (!messagesResponse?.length) {
          setIsLoading(false);
          setIsError(false);
          setMessages([]);
          return;
        }

        const messagesWithInfo = await Promise.all(
          messagesResponse.map(async (message) => {
            const messageInfo = await UserService.getMessageInfo(
              message.messageId
            );
            return {
              messageText: messageInfo?.[0].content,
              messageTime: messageInfo?.[0].sendTime,
              sender: message.sender,
            };
          })
        );

        if (cancelRequest.current) return;
        setIsLoading(false);
        setMessages(messagesWithInfo?.length ? messagesWithInfo : []);
        setIsError(false);
      } catch (e) {
        if (cancelRequest.current) return;
        console.log(`Error while load messages ${e.message}`);
        setIsLoading(false);
        setIsError(true);
      }
    })();

    return () => {
      cancelRequest.current = true;
    };
  }, [userId, senderId]);

  return { messages, isLoading, isError };
}
