interface Props {
  onNewParagraph: () => void;
  onNewSubheading: () => void;
  onNewImage: () => void;
}

const AddComponentButtons = ({
  onNewImage,
  onNewParagraph,
  onNewSubheading,
}: Props) => {
  const className =
    "bg-gray-200 px-1 py-0.5 text-xs text-gray-800 transition-all duration-300 ease-in-out hover:bg-blue-300 rounded-md";

  return (
    <div className="flex items-center justify-center gap-2">
      <button className={className} onClick={onNewSubheading}>
        subheading
      </button>
      <button className={className} onClick={onNewParagraph}>
        paragraph
      </button>
      <button className={className} onClick={onNewImage}>
        image
      </button>
    </div>
  );
};

export default AddComponentButtons;
