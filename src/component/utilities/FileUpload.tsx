// FileUpload.tsx
import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../api/firebase";
import UploadButtonGroup from "../UploadButtonGroup";
import FileInput from "../FileInput";
import TextInput from "../TextInput";

interface Props {
  setUrl: (url: string) => void;
  fileLocation: string;
}

const FileUpload = ({ setUrl, fileLocation }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [showFileUpload, setShowFileUpload] = useState(true);

  useEffect(() => {
    if (file) {
      setUploadStatus("uploading");
      const storageRef = ref(
        storage,
        `${fileLocation}/${Date.now() + file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (_) => {
          // Optional: Update progress state here if you want to show a progress bar
        },
        (error) => {
          console.error("Error while uploading:", error);
          setUploadStatus("error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            setUploadStatus("success");
          });
        }
      );
    }
  }, [file, fileLocation, setUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col justify-start">
      <UploadButtonGroup
        showFileUpload={showFileUpload}
        setShowFileUpload={setShowFileUpload}
      />
      {showFileUpload ? (
        <FileInput
          handleFileChange={handleFileChange}
          uploadStatus={uploadStatus}
        />
      ) : (
        <TextInput setUrl={setUrl} />
      )}
    </div>
  );
};

export default FileUpload;
