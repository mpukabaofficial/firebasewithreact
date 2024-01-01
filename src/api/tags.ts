import Documents from "./Documents";
import { Tag } from "../component/Articles/Tag";

const documents = new Documents<Tag>("tags");

export function getTags(): Tag[] {
  return documents.getDocuments();
}

export const addTags = (tags: Tag) => documents.addDocument(tags);

export const deleteTags = (id: string) => documents.deleteDocument(id);
