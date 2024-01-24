import React from "react";

interface Props {
  showFileUpload: boolean;
  setShowFileUpload: (showFileUpload: boolean) => void;
}

const UploadButtonGroup = ({ showFileUpload, setShowFileUpload }: Props) => {
  const handleShowFileUploadOption = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowFileUpload(true);
  };

  const handleShowLinkUploadOption = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowFileUpload(false);
  };

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-md border border-blue-400">
      <button
        className={`w-full p-2 text-center text-blue-800 ${
          !showFileUpload ? "bg-blue-100" : ""
        }`}
        onClick={handleShowLinkUploadOption}
      >
        Link
      </button>
      <button
        className={`w-full p-2 text-center text-blue-800 ${
          showFileUpload ? "bg-blue-100" : ""
        }`}
        onClick={handleShowFileUploadOption}
      >
        File Upload
      </button>
    </div>
  );
};

export default UploadButtonGroup;
