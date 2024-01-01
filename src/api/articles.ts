import { Article } from "../component/Articles/ArticlesStructure";
import Documents from "./Documents";

const documents = new Documents<Article>("articles");

export function getDocuments(): Article[] {
  return documents.getDocuments();
}

export const addArticle = (articles: Article) =>
  documents.addDocument(articles);

export const deleteDocuments = (id: string) => documents.deleteDocument(id);
