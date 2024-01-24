interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadStatus: "idle" | "uploading" | "success" | "error";
}

const FileInput = ({ handleFileChange, uploadStatus }: Props) => {
  return (
    <div className=" mt-1 flex w-full justify-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className={`w-full cursor-pointer rounded-md px-4 py-2 text-center text-sm text-white ${
          uploadStatus === "success"
            ? "bg-green-500"
            : uploadStatus === "error"
            ? "bg-red-500"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Upload File
      </label>
      {/* Add progress bar or spinner based on uploadStatus */}
    </div>
  );
};

export default FileInput;
