import React from "react";
import "./file-input.scss";

const FileInput = ({ text, onChange, testId }) => {
  return (
    <div className="file-input-container">
      <button className="file-input-button">{text}</button>
      <input
        data-testid={testId}
        type="file"
        onChange={(e) => onChange(e.target.files[0])}
        className="file-input-input"
      />
    </div>
  );
};

export default FileInput;
