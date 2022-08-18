import { useEffect, useState, useRef } from "react";
import { UserService } from "../UserService/UserService";

export function useLoadChannels(userId) {
  const [teams, setTeams] = useState(null);
  const [groups, setGroups] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!userId) return;

    cancelRequest.current = false;
    (async () => {
      try {
        setIsLoading(true);
        const channelsResponse = await UserService.fetchChannels(userId);

        let teamsWithMembers = [];
        if (channelsResponse?.teams?.length) {
          teamsWithMembers = await UserService.fetchTeamsMembers(
            channelsResponse.teams
          );
        }

        if (cancelRequest.current) return;
        setIsLoading(false);
        setTeams(teamsWithMembers);
        setGroups(
          channelsResponse?.groups?.length ? channelsResponse.groups : []
        );
        setIsError(false);
      } catch (e) {
        if (cancelRequest.current) return;
        console.log(`Error while load channels ${e.message}`);
        setIsLoading(false);
        setIsError(true);
      }
    })();

    return () => {
      cancelRequest.current = true;
    };
  }, [userId]);

  return { teams, groups, isLoading, isError };
}
