import Documents from "./Documents";
import { Task } from "../component/IndexPage/Task";

const documents = new Documents<Task>("tasks");

export function getTasks(): Task[] {
  return documents.getDocuments();
}

export const addTask = (tasks: Task) => documents.addDocument(tasks);

export const deleteTask = (id: string) => documents.deleteDocument(id);
