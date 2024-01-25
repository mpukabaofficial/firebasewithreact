interface Props {
  article: { type: string; value: string }[];
  preview: boolean;
  onSetPreview: (preview: boolean) => void;
}

const PreviewArticle = ({ article, preview, onSetPreview }: Props) => {
  return (
    <div className="absolute left-0 right-0 top-0 flex min-h-[100vh] items-center justify-center bg-black bg-opacity-40">
      <div className="m-4 w-full max-w-[1024px] bg-white px-8 py-16 ">
        <div className="my-8 flex w-full justify-end border-b-2 border-gray-700">
          <button className="btn" onClick={() => onSetPreview(!preview)}>
            close preview
          </button>
        </div>
        {preview &&
          article.map((component, index) => {
            if (component.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="my-1 text-base leading-relaxed text-gray-700"
                >
                  {component.value}
                </p>
              );
            }
            if (component.type === "subheading") {
              return (
                <h2
                  key={index}
                  className="mb-2 text-xl font-bold text-gray-800 md:text-2xl"
                >
                  {component.value}
                </h2>
              );
            }
            if (component.type === "image") {
              return (
                <img
                  key={index}
                  src={component.value}
                  alt={`Image ${index}`}
                  className="aspect-video h-auto w-full object-cover"
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default PreviewArticle;
