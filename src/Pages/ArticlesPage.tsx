import { Article } from "../component/Articles/ArticlesStructure";
import useDocuments from "../api/useDocuments";
import ArticlesCard from "../component/Articles/ArticlesCard";
import { useUserAuth } from "../context/useUserAuth";
import { Navigate } from "react-router-dom";

const ArticlesPage = () => {
  const { user } = useUserAuth();
  const { docsArray } = useDocuments<Article>("articles");
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <ArticlesCard articles={docsArray} url={"/article"} />;
};

export default ArticlesPage;
