import React from "react";

interface Props {
  name: string;
  onHandleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
  selectionList: string[];
  title: string;
}

const Select = ({
  name,
  onHandleChange,
  selected,
  selectionList,
  title,
}: Props) => {
  return (
    <select
      name={name}
      value={selected}
      onChange={onHandleChange}
      className="border p-2"
    >
      <option value="">{title} </option>
      {selectionList.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default Select;
