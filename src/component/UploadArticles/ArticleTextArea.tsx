import { useState, useRef, useCallback } from "react";
import AddComponentButtons from "./AddComponentButtons";
import PreviewArticle from "./PreviewArticle";
import ImageUploader from "./ImageUploader";
import { v4 as uuidv4 } from "uuid"; // Ensure you have 'uuid' installed

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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div>
        {article.map((component) => {
          const commonProps = {
            key: component.id,
            value: component.value,
            onChange: (e: { target: { value: string } }) =>
              handleComponentValueChange(component.id, e.target.value),
          };

          return (
            <div key={component.id} className="flex items-center">
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
                className="ml-2"
              >
                Remove
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
