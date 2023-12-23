// FileUpload.tsx
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebase";

interface Props {
  setUrl: (url: string) => void;
}

const FileUpload = ({ setUrl }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);
  const [showOne, setShowOne] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = (event: any) => {
    event.preventDefault();
    if (file) {
      const storageRef = ref(
        storage,
        `user-profiles/${Date.now() + file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setDone(true);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error while uploading:", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  const handleFileUpload = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowOne(false);
  };

  const handleLinkUpload = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowOne(true);
  };

  return (
    <div className="flex flex-col justify-start gap-2">
      <div className="w-full overflow-hidden rounded-xl">
        <div className="grid grid-cols-2 ">
          <button
            className={
              " w-full  text-center text-blue-800 " +
              (showOne ? " bg-blue-100 " : "")
            }
            onClick={handleLinkUpload}
          >
            Link
          </button>
          <button
            className={
              "w-full  text-center text-blue-800" +
              (!showOne ? " bg-blue-100 " : "")
            }
            onClick={handleFileUpload}
          >
            File Upload
          </button>
        </div>
        <div>
          {!showOne && (
            <div className="m-4 flex w-full justify-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />

              <label
                htmlFor="fileInput"
                className="w-fit cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
              >
                Upload File
              </label>
              <button
                onClick={uploadFile}
                className={
                  "w-fit rounded-md border  px-2 py-1 text-xs text-white" +
                  (done ? " bg-green-500 " : " bg-black ")
                }
              >
                {!done ? "Click here to upload" : "Uploaded"}
              </button>
            </div>
          )}
          {showOne && (
            <input
              type="text"
              name=""
              id=""
              onChange={(event) => setUrl(event.target.value)}
              className="my-4 w-1/2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
