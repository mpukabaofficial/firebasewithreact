import React from "react";
import { Input } from "./InputList";
import { Article } from "../Articles/ArticlesStructure";

interface Props {
  input: Input;
  article: Article;
  onSetArticle: (article: Article) => void; // Function to update the article in the parent state
  error: boolean; // For error styling or messages
}

const TextArea: React.FC<Props> = ({ input, article, onSetArticle, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Here you split the textarea value into paragraphs based on newline characters
    const paragraphs = e.target.value
      .split(/\n+/)
      .filter((paragraph) => paragraph.trim() !== "");

    // Example action: Update the article with paragraphs joined by double newlines (or process them as needed)
    onSetArticle({ ...article, [input.originalName]: paragraphs.join("\n\n") });
  };

  return (
    <textarea
      id={input.originalName}
      name={input.originalName}
      value={(article[input.originalName as keyof Article] as string) || ""}
      onChange={handleChange}
      className={`textarea ${error ? "error" : ""}`} // Example of error handling
    />
  );
};

export default TextArea;
