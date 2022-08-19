import React from "react";
import "./team-list-items.css";

const TeamListItems = ({ teams, activeTeam, setActiveTeam }) => {
  const onClickItem = (chosenTeam) => setActiveTeam(chosenTeam);
  return teams && teams.length ? (
    <ul className="team-list-items-container">
      {teams.map((team) => (
        <li
          key={team.team}
          title={team.team}
          onClick={() => onClickItem(team.team)}
          className={activeTeam === team.team ? "active-team" : ""}
        >
          <div className="team-name">#{team.team}</div>
          <div className="team-members-count" data-testid="members-count">
            {team.members.length}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="empty-team-list">Create or join to team</div>
  );
};

export default React.memo(TeamListItems);
