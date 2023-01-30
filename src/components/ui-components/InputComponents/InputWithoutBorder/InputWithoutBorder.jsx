import React from "react";
import "./input-without-border.scss";

const InputWithoutBorder = ({
  value,
  onChange,
  id,
  labelText,
  testId,
  type,
  onKeyDown,
}) => {
  return (
    <div className="input-container-text-only">
      <input
        data-testid={testId}
        id={id}
        placeholder="&nbsp;"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};

export default InputWithoutBorder;
