import React from "react";
import "./radion-button.scss";

const RadioButton = ({ value, checked, onChange, labelText }) => {
  return (
    <div className="label-radio-button-container">
      <label className="label-radio-button">
        <input
          type="radio"
          value={value}
          checked={checked}
          className="input-radio-button"
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="radio-button" />
      </label>
      <span onClick={() => onChange(value)}>{labelText}</span>
    </div>
  );
};

export default RadioButton;
