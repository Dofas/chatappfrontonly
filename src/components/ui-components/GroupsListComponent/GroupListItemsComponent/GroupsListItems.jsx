import React from "react";
import "./groups-list-items.css";
import GroupListItem from "./GroupListItem";

const GroupsListItems = ({ groups }) => {
  return groups?.length ? (
    <ul className="groups-list-items-container">
      {groups.map((group) => (
        <GroupListItem key={group.name} group={group.name} />
      ))}
    </ul>
  ) : (
    <div className="empty-groups-list">Create or join to the group</div>
  );
};

export default React.memo(GroupsListItems);
