import React from "react";
import "./check-box.scss";

const CheckBox = ({ checked, value, onChange, labelText, testId }) => {
  return (
    <div className="check-box-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="checkbox-input"
        />
        <span className="checkbox-img" />
      </label>
      <span onClick={() => onChange(value)} data-testid={testId}>
        {labelText}
      </span>
    </div>
  );
};

export default CheckBox;
