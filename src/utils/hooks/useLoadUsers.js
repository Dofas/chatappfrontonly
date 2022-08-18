import { useEffect, useState, useRef } from "react";
import { UserService } from "../UserService/UserService";

export function useLoadUsers(team, userId) {
  const [members, setMembers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!team || !userId) return;

    cancelRequest.current = false;
    (async () => {
      try {
        setIsLoading(true);
        const membersResponse = await UserService.fetchTeamMembers(team);

        const lastMessages = await UserService.getLastMessages(userId);

        if (!lastMessages?.length || !membersResponse.length) return;
        const lastMessagesInTeam = membersResponse?.[0].members.flatMap(
          (member) =>
            lastMessages.filter((message) => message.sender === member)
        );
        const membersWithInfo = await Promise.all(
          lastMessagesInTeam.map(async (message) => {
            const sender = await UserService.findUser(message.sender);
            const messageInfo = await UserService.getMessageInfo(
              message.messageId
            );
            return {
              id: sender?.id,
              senderName: `${sender?.firstName} ${sender?.lastName}`,
              senderAvatar: sender?.avatar,
              messageContent: messageInfo?.[0].content,
              status: messageInfo?.[0].status,
              type: messageInfo?.[0].type,
              time: messageInfo?.[0].sendTime,
              userStatus: sender?.status,
              dateOfBirth: sender?.dateOfBirthday,
              nickName: sender?.nickName,
              number: sender?.number,
              location: sender?.location,
              languages: sender?.languages,
              gender: sender?.gender,
              email: sender?.email,
            };
          })
        );
        if (cancelRequest.current) return;
        setIsLoading(false);
        setMembers(membersWithInfo);
        setIsError(false);
      } catch (e) {
        if (cancelRequest.current) return;
        console.log(`Error while load users ${e.message}`);
        setIsLoading(false);
        setIsError(true);
      }
    })();

    return () => {
      cancelRequest.current = true;
    };
  }, [team, userId]);

  return { members, isLoading, isError };
}
