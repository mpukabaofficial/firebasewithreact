import Tags from "./Tags";
import { Article } from "./ArticlesStructure";
import { Link } from "react-router-dom";

interface Props {
  articles: Article[];
  url: string;
}

const ArticlesCard = ({ articles, url }: Props) => {
  return (
    <div>
      <div className="mx-auto flex max-w-[1024px] flex-col items-center justify-center gap-4 p-2">
        {articles.length > 0 &&
          articles.map((article, index) => (
            <Link
              key={index}
              className="flex min-h-[200px] w-full flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white object-cover shadow hover:bg-gray-100 md:flex-row lg:h-[20vh] lg:min-w-[800px] lg:max-w-xl"
              to={url + "/" + article.id}
            >
              <div className="flex aspect-video w-full overflow-hidden">
                <img
                  className="h-full w-full rounded-t-lg object-cover"
                  src={article.picture}
                  alt={article.pictureDesc}
                />
              </div>
              <div className="flex w-full flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {article.title}
                </h5>
                <p className="mb-3 font-normal text-blue-400 ">
                  {article.author}
                </p>
                <Tags tags={[...article.tags]} total={3} />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ArticlesCard;
