import { Articles } from "../component/ArticlesStructure";
import { useFirestoreDocs } from "../api/articles";
import ArticlesCard from "../component/ArticlesCard";

const ArticlesPage = () => {
  const docsArray: Articles[] = useFirestoreDocs();
  return <ArticlesCard articles={docsArray} url={"/article"} />;
};

export default ArticlesPage;
