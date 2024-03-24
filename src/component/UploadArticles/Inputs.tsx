import { Article } from "../Articles/ArticlesStructure";

interface Props {
  article: Article;
  ommited: string[];
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Inputs = ({ article, ommited, onHandleChange }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {Object.keys(article).map((key) => {
        if (ommited.includes(key)) {
          return null; // These are handled separately
        }

        return (
          <input
            key={key}
            type="text"
            name={key}
            value={article[key as keyof Article] as string}
            onChange={onHandleChange}
            placeholder={
              key.charAt(0).toUpperCase() +
              key
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()
            }
            disabled={key === "authorEmail" || key === "author"}
            className="border p-2"
          />
        );
      })}
    </div>
  );
};

export default Inputs;
