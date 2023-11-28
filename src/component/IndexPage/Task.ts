import { Timestamp } from "firebase/firestore";

export interface Task {
  id?: string;
  name: string;
  status: boolean;
  assigned: Timestamp;
  dueDate: Timestamp;
  description: string;
  owner: string;
}
