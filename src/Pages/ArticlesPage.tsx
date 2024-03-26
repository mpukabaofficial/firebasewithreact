import ArticlesCard from "../component/Articles/ArticlesCard";
import { useUserAuth } from "../context/useUserAuth";
import { Navigate } from "react-router-dom";
import useArticles from "../api/articles";
import { Article } from "../component/Articles/ArticlesStructure";

const ArticlesPage = () => {
  const { user } = useUserAuth();
  const { docsArray } = useArticles();
  const articles = docsArray as Article[];
  console.log(articles);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <ArticlesCard articles={articles} url={"/article"} />;
};

export default ArticlesPage;
