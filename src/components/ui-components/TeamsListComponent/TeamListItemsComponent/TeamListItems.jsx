import React from "react";
import "./team-list-items.scss";
import TeamListItem from "./TeamListItem";

const TeamListItems = ({ teams, activeTeam, setActiveTeam }) => {
  const onClickItem = (chosenTeam) => setActiveTeam(chosenTeam);

  return teams && teams.length ? (
    <ul className="team-list-items-container">
      {teams.map((team) => (
        <TeamListItem
          key={team.name}
          team={team.name}
          onClickTeam={() => onClickItem(team)}
          activeTeam={activeTeam}
          teamMembers={team.users}
        />
      ))}
    </ul>
  ) : (
    <div className="empty-team-list">Create or join to team</div>
  );
};

export default React.memo(TeamListItems);
