import React from "react";

const SelectedUserInfo = ({
  nickName,
  email,
  phone,
  dob,
  gender,
  languages,
}) => {
  return (
    <div className="selected-user-info-container">
      <div>
        <div className="selected-user-info-block">
          <span>Nickname</span>
          <div title={nickName}>{nickName}</div>
        </div>
        <div className="selected-user-info-block">
          <span>Email</span>
          <div title={email}>{email}</div>
        </div>
        <div className="selected-user-info-block">
          <span>Phone Number</span>
          <div title={phone}>{phone}</div>
        </div>
      </div>
      <div>
        <div className="selected-user-info-block">
          <span>Date of birthday</span>
          <div title={dob}>{dob}</div>
        </div>
        <div className="selected-user-info-block">
          <span>Gender</span>
          <div title={gender}>{gender}</div>
        </div>
        <div className="selected-user-info-block">
          <span>Languages</span>
          <div title={languages.length <= 1 ? languages : languages.join(", ")}>
            {languages.length <= 1 ? languages : languages.join(", ")}
          </div>
        </div>
        <div
          onClick={() => console.log("profile link")}
          className="selected-user-profile-link"
        >
          Show full profile
        </div>
      </div>
    </div>
  );
};

export default SelectedUserInfo;
