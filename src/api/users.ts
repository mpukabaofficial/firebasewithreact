import { useEffect, useState } from "react";
import { db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { User } from "../component/User";
import { Articles } from "../component/ArticlesStructure";

const colRef = collection(db, "users");
// Custom hook
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">),
        }));
        setUsers(results);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocs();
  }, []);

  return users;
};

export const addTask = async (task: Articles) => {
  await addDoc(colRef, task);
};
