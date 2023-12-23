import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// my imports
import { db } from "./firebase";

export default class Documents<T extends DocumentData> {
  collectionName: string;
  collectionRef: CollectionReference<DocumentData>;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, this.collectionName);
  }

  public getDocuments() {
    const [docsArray, setDocsArray] = useState<T[]>([]);

    useEffect(() => {
      const fetchDocs = async () => {
        try {
          onSnapshot(
            this.collectionRef,
            (snapshot: QuerySnapshot<DocumentData>): void => {
              const docs = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...(doc.data() as Omit<T, "id">), // Cast the doc data to the rest of the document fields
              }));
              setDocsArray(docs as unknown as T[]); // Explicitly type the argument as T[]
            }
          );
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      };

      fetchDocs();
    }, []);

    return docsArray;
  }

  public addDocument = async (docs: T) => {
    try {
      await addDoc(this.collectionRef, docs);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  public deleteDocument = async (id: string) => {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
    } catch (error) {}
  };
}
