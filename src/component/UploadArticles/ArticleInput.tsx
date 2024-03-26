import React from "react";
import { Article } from "../Articles/ArticlesStructure";
import FileUpload from "../utilities/FileUpload";
import { Input } from "./InputList";
import TextArea from "./TextArea";

interface Props {
  input: Input;
  onSetArticle: (article: Article) => void;
  article: Article;
  error: boolean;
}

const ArticleInput = ({ input, onSetArticle, article, error }: Props) => {
  // Helper function to render the error message if there's an error and the field is empty
  const renderErrorMessage = () =>
    error && !article[input.originalName as keyof Article] ? (
      <p className="text-red-500">{input.error}</p>
    ) : null;

  // Generic input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onSetArticle({ ...article, [input.originalName]: e.target.value });
  };

  const inputComponent = () => {
    switch (input.typeOfInput) {
      case "picture":
        return (
          <>
            <FileUpload
              setUrl={(url: string) =>
                onSetArticle({ ...article, [input.originalName]: url })
              }
            />
            {renderErrorMessage()}
          </>
        );

      case "textarea":
        return (
          <>
            <TextArea
              input={input}
              onSetArticle={onSetArticle}
              article={article}
              error={error}
            />
            {renderErrorMessage()}
          </>
        );

      case "tags":
        return (
          <>
            <input
              type={input.type}
              id={input.originalName}
              name={input.originalName}
              value={
                (article[input.originalName as keyof Article] as string) || ""
              }
              onChange={handleInputChange}
              className="input"
            />
            {renderErrorMessage()}
          </>
        );

      default:
        return (
          <>
            <input
              type={input.type}
              id={input.originalName}
              name={input.originalName}
              value={
                (article[input.originalName as keyof Article] as string) || ""
              }
              onChange={handleInputChange}
              className="input"
            />
            {renderErrorMessage()}
          </>
        );
    }
  };

  return (
    <div className="w-full">
      <h3 className="min-w-full pb-4 text-2xl font-semibold text-gray-700">
        {input.instruction}
      </h3>
      <label className="label" htmlFor={input.originalName}>
        {input.name}{" "}
        <span className="text-red-500">
          {input.required ? "(required)" : ""}
        </span>
      </label>
      {inputComponent()}
    </div>
  );
};

export default ArticleInput;
