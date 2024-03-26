import { useState, useEffect, useMemo } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function useDocuments<T extends DocumentData>(collectionName: string) {
  const [docsArray, setDocsArray] = useState<T[]>([]);
  const collectionRef = useMemo(
    () => collection(db, collectionName),
    [collectionName]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        console.log("Snapshot docs:", snapshot.docs); // Add this line to check the raw snapshot
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        console.log("Mapped docs:", docs); // Add this line to check the mapped documents
        setDocsArray(docs);
      },
      (error) => {
        console.error("Error fetching documents:", error);
      }
    );

    return unsubscribe;
  }, [collectionName, collectionRef]);

  const addDocument = async (docData: T) => {
    try {
      await addDoc(collectionRef, docData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const updateDocument = async (id: string, data: T) => {
    try {
      const docRef = doc(collectionRef, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return { docsArray, addDocument, deleteDocument, updateDocument };
}

export default useDocuments;
