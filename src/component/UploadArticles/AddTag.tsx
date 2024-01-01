import React from "react";

interface Props {
  tag: string;
  onSetTag: React.Dispatch<React.SetStateAction<string>>;
  onHandleAddTag: () => void;
}

const AddTag = ({ onSetTag, tag, onHandleAddTag }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Add a tag"
        className="border p-2"
        onChange={(e) => onSetTag(e.target.value)}
        value={tag}
      />
      <button
        type="button"
        onClick={onHandleAddTag}
        className="flex min-w-fit justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Add tag
      </button>
    </div>
  );
};

export default AddTag;
