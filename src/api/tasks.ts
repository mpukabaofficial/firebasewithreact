import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Task } from "../component/IndexPage/Task";

// collection ref
const colRef = collection(db, "tasks");

export const getTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, "id">),
        }));
        setTasks(results);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocs();
  }, []);

  return tasks;
};

export const addTask = async (task: Task) => {
  await addDoc(colRef, task);
};