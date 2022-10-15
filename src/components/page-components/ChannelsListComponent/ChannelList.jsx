import React, { useEffect } from "react";
import "./channel-list.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import { useLoadChannels } from "../../../utils/hooks/useLoadChannels";
import Spinner from "../../ui-components/SpinnerComponent/Spinner";
import TeamsList from "../../ui-components/TeamsListComponent/TeamsList";
import GroupsList from "../../ui-components/GroupsListComponent/GroupsList";
import { activeChannel } from "../../../state/activeChannelState/atomActiveChannelState";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";
import { sidebarState } from "../../../state/responsiveState/atomSideBarState";
import { useClickOutside } from "../../../utils/hooks/useClickOutside";

const ChannelList = () => {
  const activeUser = useRecoilValue(activeUserInfo);
  const [activeTeam, setActiveTeam] = useRecoilState(activeChannel);
  const { teams, groups, isLoading, isError } = useLoadChannels(activeUser.id);
  const [isSidebar, setIsSidebar] = useRecoilState(sidebarState);
  const { innerWidth } = useCalculateWindowSize();
  const closeSidebar = () => setIsSidebar(false);
  const ref = useClickOutside(closeSidebar);

  useEffect(() => {
    if (teams?.length && !activeTeam) {
      setActiveTeam(teams[0].team);
    }
    //eslint-disable-next-line
  }, [teams]);

  const channelsListContent = (
    <div
      ref={ref}
      className={
        innerWidth >= 1030
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
            />
            <GroupsList groups={groups} />
          </>
        )
      )}
    </div>
  );

  return isLoading ? <Spinner /> : channelsListContent;
};

export default React.memo(ChannelList);
