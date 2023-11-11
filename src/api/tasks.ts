import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

interface Task {
  name: string;
  status: boolean;
  assigned: Timestamp;
  dueDate: Timestamp;
  description: string;
}

// collection ref
const colRef = collection(db, "tasks");

export const getTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const results = snapshot.docs.map((doc) => doc.data() as Task);
        setTasks(results);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocs();
  }, [tasks]);

  return tasks;
};

export const addTask = async (task: Task) => {
  await addDoc(colRef, task);
};
