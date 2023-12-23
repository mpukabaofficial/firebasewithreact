interface Props {
  tags: string[];
  total: number;
}

const Tags = ({ tags, total }: Props) => {
  // Check if tags is undefined or has no elements
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap gap-x-0.5 gap-y-3 py-4">
      {tags.map(
        (tag: string, index) =>
          index < total && (
            <span
              key={tag}
              className="mr-2 whitespace-nowrap rounded  bg-blue-800 px-2.5 py-0.5 text-xs font-medium text-white"
            >
              {tag}
            </span>
          )
      )}
    </div>
  );
};
export default Tags;
