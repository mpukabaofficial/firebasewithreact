import { Articles } from "../component/ArticlesStructure";
import { getDocuments } from "../api/articles";
import ArticlesCard from "../component/ArticlesCard";

const ArticlesPage = () => {
  const docsArray: Articles[] = getDocuments();
  return <ArticlesCard articles={docsArray} url={"/article"} />;
};

export default ArticlesPage;
