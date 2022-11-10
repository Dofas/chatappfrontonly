import React from "react";

const SelectedUserHeader = ({ avatar, name, location, status }) => {
  return (
    <div className="selected-user-avatar">
      <div className="position-relative">
        <img alt="avatar" src={process.env.REACT_APP_API_URL + "/" + avatar} />
        {status && (
          <div
            className={
              status === "online"
                ? "on status"
                : status === "busy"
                ? "busy status"
                : "off status"
            }
          />
        )}
      </div>
      <div>
        <div className="selected-user-name" title={name}>
          {name}
        </div>
        <div className="selected-user-location" title={location}>
          {location}
        </div>
      </div>
    </div>
  );
};

export default SelectedUserHeader;
