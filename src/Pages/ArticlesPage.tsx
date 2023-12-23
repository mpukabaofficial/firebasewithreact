import { Articles } from "../component/ArticlesStructure";
import { getDocuments } from "../api/articles";
import ArticlesCard from "../component/ArticlesCard";
import { useUserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ArticlesPage = () => {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  const docsArray: Articles[] = getDocuments();
  return <ArticlesCard articles={docsArray} url={"/article"} />;
};

export default ArticlesPage;
