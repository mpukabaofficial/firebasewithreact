import React from "react";

interface Props {
  title: string;
  tags: string[];
  selectedCategories: Set<string>; // Changed to a Set for better performance
  onHandleTagChange: (tag: string, isChecked: boolean) => void;
}

const Checkboxes: React.FC<Props> = ({
  title,
  tags,
  selectedCategories,
  onHandleTagChange,
}) => {
  return (
    <div>
      <fieldset>
        <legend>{title}</legend>
        {tags.map((tag) => (
          <label key={tag} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="tag"
              value={tag}
              checked={selectedCategories.has(tag)}
              onChange={(e) => onHandleTagChange(tag, e.target.checked)}
            />
            <span>{tag}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default Checkboxes;
