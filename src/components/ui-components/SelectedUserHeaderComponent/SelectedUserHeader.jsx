import React from "react";

const SelectedUserHeader = ({ avatar, name, location }) => {
  return (
    <div className="selected-user-avatar">
      <img alt="avatar" src={avatar} />
      <div className="selected-user-name" title={name}>
        {name}
      </div>
      <div className="selected-user-location" title={location}>
        {location}
      </div>
    </div>
  );
};

export default SelectedUserHeader;
