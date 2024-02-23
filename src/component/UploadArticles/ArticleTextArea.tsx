import { useState, useRef, useCallback } from "react";
import AddComponentButtons from "./AddComponentButtons";
import PreviewArticle from "./PreviewArticle";
import ImageUploader from "./ImageUploader";
import { v4 as uuidv4 } from "uuid";

const ArticleTextArea = () => {
  const [article, setArticle] = useState<
    { id: string; type: string; value: string }[]
  >([]);
  const [preview, setPreview] = useState<boolean>(false);

  const articleRef = useRef(article);
  articleRef.current = article;

  const handleNewComponent = useCallback((type: string) => {
    setArticle([...articleRef.current, { id: uuidv4(), type, value: "" }]);
  }, []);

  const handleComponentValueChange = useCallback(
    (id: string, value: string) => {
      const newArticle = articleRef.current.map((component) =>
        component.id === id ? { ...component, value } : component
      );
      setArticle(newArticle);
    },
    []
  );

  const handleRemoveComponent = useCallback((id: string) => {
    const newArticle = articleRef.current.filter(
      (component) => component.id !== id
    );
    setArticle(newArticle);
  }, []);

  console.log(article);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
        {article.map((component) => {
          const commonProps = {
            key: component.id,
            value: component.value,
            onChange: (e: { target: { value: string } }) =>
              handleComponentValueChange(component.id, e.target.value),
          };

          return (
            <div key={component.id} className="flex w-full items-center">
              {component.type === "paragraph" && <textarea {...commonProps} />}
              {component.type === "subheading" && (
                <input type="text" {...commonProps} />
              )}
              {component.type === "image" && (
                <ImageUploader
                  {...commonProps}
                  setUrl={(url) =>
                    handleComponentValueChange(component.id, url)
                  }
                />
              )}
              <button
                onClick={() => handleRemoveComponent(component.id)}
                className="ml-2 rounded-full bg-red-500 p-1 text-white transition-all duration-300 ease-in-out md:bg-white md:text-red-500 md:hover:bg-red-500 md:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <AddComponentButtons
        onNewParagraph={() => handleNewComponent("paragraph")}
        onNewSubheading={() => handleNewComponent("subheading")}
        onNewImage={() => handleNewComponent("image")}
      />
      <button
        className="m-2 flex items-center justify-center rounded-xl bg-black p-4 py-2 text-white hover:bg-gray-800"
        onClick={() => setPreview(!preview)}
      >
        Preview
      </button>
      <div>
        {preview && article.length > 0 && (
          <PreviewArticle
            article={article}
            preview={preview}
            onSetPreview={setPreview}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleTextArea;
