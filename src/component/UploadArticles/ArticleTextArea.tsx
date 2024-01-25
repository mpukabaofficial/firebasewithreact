import { useState, useRef, useCallback } from "react";
import AddComponentButtons from "./AddComponentButtons";
import FileUpload from "../utilities/FileUpload";
import PreviewArticle from "./PreviewArticle";
import { v4 as uuidv4 } from "uuid"; // Ensure you have 'uuid' installed

const ArticleTextArea = () => {
  const [article, setArticle] = useState<
    { id: string; type: string; value: string }[]
  >([]);
  const [preview, setPreview] = useState<boolean>(false);

  // Use a ref to store the current article state to avoid dependency issues
  const articleRef = useRef(article);
  articleRef.current = article;

  const handleNewComponent = useCallback((type: string) => {
    setArticle([...articleRef.current, { id: uuidv4(), type, value: "" }]);
  }, []);

  const handleComponentValueChange = useCallback((id: string, value: any) => {
    const newArticle = articleRef.current.map((component) =>
      component.id === id ? { ...component, value } : component
    );
    setArticle(newArticle);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div>
        {article.map((component) => {
          if (component.type === "paragraph") {
            return (
              <textarea
                key={component.id}
                value={component.value}
                onChange={(e) =>
                  handleComponentValueChange(component.id, e.target.value)
                }
              />
            );
          }
          if (component.type === "subheading") {
            return (
              <input
                key={component.id}
                type="text"
                value={component.value}
                onChange={(e) =>
                  handleComponentValueChange(component.id, e.target.value)
                }
              />
            );
          }
          if (component.type === "image") {
            return (
              <FileUpload
                key={component.id}
                setUrl={(url) => handleComponentValueChange(component.id, url)}
                fileLocation="articles"
              />
            );
          }
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
