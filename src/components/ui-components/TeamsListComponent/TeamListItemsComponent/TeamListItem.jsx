import React from "react";

const TeamListItem = ({ team, onClickTeam, activeTeam, teamMembers }) => {
  return (
    <li
      title={team}
      onClick={() => onClickTeam(team)}
      className={activeTeam.name === team ? "active-team" : ""}
    >
      <div className="team-name">#{team}</div>
      <div className="team-members-count" data-testid="members-count">
        {teamMembers.length}
      </div>
    </li>
  );
};

export default TeamListItem;
