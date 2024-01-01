import { User } from "../component/Account/User";
import Documents from "./Documents";

const documents = new Documents<User>("users");

export function getUsers(): User[] {
  return documents.getDocuments();
}

export const addUser = (users: User) => documents.addDocument(users);

export const deleteUser = (id: string) => documents.deleteDocument(id);
