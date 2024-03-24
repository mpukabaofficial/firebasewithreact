import useDocuments from "./useDocuments";

const useUsers = () => {
  const { docsArray, addDocument, deleteDocument, updateDocument } =
    useDocuments("users");

  return { docsArray, addDocument, deleteDocument, updateDocument };
};

export default useUsers;
