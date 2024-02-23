import React from "react";

interface ImageUploaderProps {
  setUrl: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setUrl }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (loadEvent) => {
        // Ensure the result is not undefined before trying to set the state.
        const result = loadEvent.target?.result;
        if (typeof result === "string" || result instanceof ArrayBuffer) {
          // setImageSrc(result);
          setUrl(result as string);
        } else {
          // Handle the case where result is undefined or not of the expected type.
          console.error("FileReader did not load the file as expected.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
