import React from "react";
import "./groups-list-items.css";

const GroupsListItems = ({ groups }) => {
  return groups?.length ? (
    <ul className={"groups-list-items-container"}>
      {groups.map((group) => (
        <li key={group} title={group}>
          #{group}
        </li>
      ))}
    </ul>
  ) : (
    <div className={"empty-groups-list"}>Create or join to the group</div>
  );
};

export default React.memo(GroupsListItems);
