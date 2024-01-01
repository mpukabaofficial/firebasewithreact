import React, { useState } from "react";
import Markdown from "markdown-to-jsx"; // You'll need to install markdown-to-jsx or a similar package

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  const handleMarkdownChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Enter Markdown"
        className="min-h-[20vh] w-full border p-2"
      />
      <div className="markdown-output mt-4 rounded border p-2">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
