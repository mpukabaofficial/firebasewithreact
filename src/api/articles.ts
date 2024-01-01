import { Articles } from "../component/Articles/ArticlesStructure";
import Documents from "./Documents";

const documents = new Documents<Articles>("articles");

export function getDocuments(): Articles[] {
  return documents.getDocuments();
}

export const addArticle = (articles: Articles) =>
  documents.addDocument(articles);

export const deleteDocuments = (id: string) => documents.deleteDocument(id);
