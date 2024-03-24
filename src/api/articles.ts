import useDocuments from "./useDocuments";

const useArticles = () => {
  const { docsArray, addDocument, deleteDocument, updateDocument } =
    useDocuments("articles");

  return { docsArray, addDocument, deleteDocument, updateDocument };
};

export default useArticles;
