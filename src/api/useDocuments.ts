import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// A hook to manage and return Firestore documents
function useDocuments<T extends DocumentData>(collectionName: string) {
  const [docsArray, setDocsArray] = useState<T[]>([]);
  const collectionRef: CollectionReference<DocumentData> = collection(
    db,
    collectionName
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        setDocsArray(docs);
      },
      (error) => {
        console.error("Error fetching documents:", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener on component unmount
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

  // Return document array and CRUD functions
  return { docsArray, addDocument, deleteDocument, updateDocument };
}

export default useDocuments;
