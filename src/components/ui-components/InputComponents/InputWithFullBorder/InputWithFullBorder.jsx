import React from "react";
import "./input-with-full-border.scss";

const InputWithFullBorder = ({
  id,
  value,
  onChange,
  labelText,
  testId,
  type,
  className,
}) => {
  return (
    <div className="input-container-border-full">
      <input
        value={value}
        data-testid={testId}
        id={id}
        className={className}
        placeholder="&nbsp;"
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{labelText}</label>
      <span className="input-border-full" />
    </div>
  );
};

export default InputWithFullBorder;
