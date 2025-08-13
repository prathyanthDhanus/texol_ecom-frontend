import React from "react";
import type { TextAreaProps } from "./types";
import "./styles.css";

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  error,
  className = "",
  validationSchema,
  ...props
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        className={`textarea-field ${error ? "error" : ""}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default TextArea;
