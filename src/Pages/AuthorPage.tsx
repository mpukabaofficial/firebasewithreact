import { Article } from "../component/Articles/ArticlesStructure";
import { useLocation } from "react-router-dom";
import ArticlesCard from "../component/Articles/ArticlesCard";

import useDocuments from "../api/useDocuments";

const AuthorPage = () => {
  const { docsArray } = useDocuments<Article>("articles");
  const location = useLocation().pathname.split("/");

  const findArticles = () => {
    const articles = docsArray.filter((article) =>
      location.includes(String(article.authorId))
    );
    return articles;
  };

  return (
    <div>
      <div>
        <h1 className="w-full py-4 text-center text-5xl font-bold">
          {findArticles()[0] && findArticles()[0].author}
        </h1>
      </div>
      <ArticlesCard articles={findArticles()} url={"/article"} />
    </div>
  );
};

export default AuthorPage;
