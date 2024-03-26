import useDocuments from "./useDocuments";

const useTasks = () => {
  const { docsArray, addDocument, deleteDocument, updateDocument } =
    useDocuments("tasks");

  return { docsArray, addDocument, deleteDocument, updateDocument };
};

export default useTasks;
