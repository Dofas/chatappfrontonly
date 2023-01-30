import React from "react";
import "./input-with-border-bottom.scss";

const InputWithBorderBottom = ({ id, value, onChange, labelText, testId }) => {
  return (
    <div className="input-container-border-bottom">
      <input
        data-testid={testId}
        id={id}
        placeholder="&nbsp;"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{labelText}</label>
      <span className="input-border" />
    </div>
  );
};

export default InputWithBorderBottom;
