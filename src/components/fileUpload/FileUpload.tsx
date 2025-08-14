import React, {  useCallback } from "react";
import type { ChangeEvent } from "react";
import "./FileUpload.css";


interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  onChange: (files: File[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = "*",
  onChange,
  className = "",
}) => {
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const filesArray = Array.from(e.target.files);
        onChange(filesArray);
      }
    },
    [onChange]
  );

  return (
    <div className={`file-upload-container ${className}`}>
      <label className="file-upload-label">
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="file-upload-input"
        />
        <span className="file-upload-button">Choose Files</span>
      </label>
    </div>
  );
};

export default FileUpload;