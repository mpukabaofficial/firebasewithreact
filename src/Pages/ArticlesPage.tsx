import { Article } from "../component/Articles/ArticlesStructure";
import { getDocuments } from "../api/articles";
import ArticlesCard from "../component/Articles/ArticlesCard";
import { useUserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ArticlesPage = () => {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  const docsArray: Article[] = getDocuments();
  return <ArticlesCard articles={docsArray} url={"/article"} />;
};

export default ArticlesPage;
