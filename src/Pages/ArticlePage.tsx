import { Articles } from "../component/ArticlesStructure";
import { useFirestoreDocs } from "../api/firestore";
import { useLocation } from "react-router-dom";

const ArticlePage = () => {
  const path = useLocation().pathname;
  const docsArray: Articles[] = useFirestoreDocs();

  function findArticle(): Articles | undefined {
    // Using `find` to get the first matching article or undefined if not found
    return docsArray.find((article) =>
      path.split("/").includes(String(article.id))
    );
  }

  // Get the article using the findArticle function
  const article = findArticle();

  // Make sure the article and articleBody exist before trying to map over it
  return (
    <article className="mx-auto max-w-[1024px]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  md:text-5xl lg:text-6xl">
        {article?.articleInfo}
      </h1>
      <div className="flex aspect-video w-full overflow-hidden">
        <img
          src={article?.picture}
          alt={article?.pictureDesc}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="px-4 py-16">By: {article?.author}</div>

      {article?.articleBody.map((para, index) => (
        // Use index as key for lack of a better option, but it's better to use unique IDs when possible
        <p
          key={index}
          className={
            index === 0
              ? "mx-auto max-w-[700px] py-4 text-lg font-bold"
              : "mx-auto max-w-[700px] py-4 text-lg"
          }
        >
          {para}
        </p>
      ))}
    </article>
  );
};

export default ArticlePage;
