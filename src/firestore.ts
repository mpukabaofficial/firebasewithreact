import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Articles } from "./component/ArticlesStructure";

// collection ref
const colRef = collection(db, "articles");

export const useFirestoreDocs = () => {
  const [docsArray, setDocsArray] = useState<Articles[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const snapshot = await getDocs(colRef);

        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Articles, "id">), // Cast the doc data to the rest of the Articles fields
        }));
        setDocsArray(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocs();
  }, []);

  return docsArray;
};

export const addDocuments = async (article: Articles) => {
  await addDoc(colRef, article);
};
