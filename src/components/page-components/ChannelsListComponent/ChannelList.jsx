import React, { useEffect, useState } from "react";
import "./channel-list.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import Spinner from "../../ui-components/SpinnerComponent/Spinner";
import TeamsList from "../../ui-components/TeamsListComponent/TeamsList";
import {
  activeChannel,
  allGroups,
  allTeams,
} from "../../../state/activeChannelState/atomActiveChannelState";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";
import { sidebarState } from "../../../state/responsiveState/atomSideBarState";
import { useClickOutside } from "../../../utils/hooks/useClickOutside";
import { UserService } from "../../../utils/UserService/UserService";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import jwt_decode from "jwt-decode";

const ChannelList = ({ socket }) => {
  const [activeTeam, setActiveTeam] = useRecoilState(activeChannel);
  const [teams, setTeams] = useRecoilState(allTeams);
  const [groups, setGroups] = useRecoilState(allGroups);
  const activeUser = useRecoilValue(activeUserInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSidebar, setIsSidebar] = useRecoilState(sidebarState);
  const { innerWidth } = useCalculateWindowSize();
  const closeSidebar = () => setIsSidebar(false);
  const ref = useClickOutside(closeSidebar);

  useEffect(() => {
    if (teams?.length && !activeTeam) {
      setActiveTeam(teams[0]);
    }
    //eslint-disable-next-line
  }, [teams]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("upd-team", (newTeams) => {
        const fullTeams = [...teams, ...newTeams];
        setTeams(fullTeams);
      });

      socket.current.on("upd-group", (newGroups) => {
        const fullGroups = [...groups, ...newGroups];
        setGroups(fullGroups);
      });
    }
  }, [socket.current, setTeams, setGroups, teams, groups]);

  useEffect(() => {
    if (!activeUser?.id) return;
    (async () => {
      setIsLoading(true);
      if (!localStorage.getItem("auth")) {
        window.location.replace("/chatapp/login");
      }
      const decoded = jwt_decode(localStorage.getItem("auth"));
      const currentDate = new Date();
      if (decoded.exp * 1000 < currentDate.getTime()) {
        await UserService.getRefreshToken();
      }
      UserService.getTeams(activeUser?.id)
        .then((respTeams) => {
          setIsError(false);
          setTeams(respTeams);
        })
        .catch(() => {
          console.log(`Error while loading teams`);
          setIsError(true);
        });
      UserService.getGroups(activeUser?.id)
        .then((respGrp) => {
          setIsError(false);
          setGroups(respGrp);
        })
        .catch(() => {
          console.log(`Error while loading teams`);
          setIsError(true);
        });
      setIsLoading(false);
    })();
  }, [setTeams, setGroups, activeUser]);

  //todo: to activate groups uncomment GroupList component
  const channelsListContent = (
    <div
      ref={ref}
      className={
        innerWidth >= 1110
          ? "channel-list-container"
          : isSidebar
          ? "channel-list-container position-absolute"
          : "channel-list-container display-none"
      }
    >
      {isError ? (
        <span className="title">Problems with load teams and groups</span>
      ) : (
        teams &&
        groups && (
          <>
            <TeamsList
              teams={teams}
              activeTeam={activeTeam}
              setActiveTeam={setActiveTeam}
              socket={socket}
            />
            {/*<GroupsList groups={groups} socket={socket} />*/}
          </>
        )
      )}
    </div>
  );

  return isLoading ? <Spinner /> : channelsListContent;
};

export default React.memo(ChannelList);
