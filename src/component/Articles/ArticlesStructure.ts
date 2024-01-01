import { Timestamp } from "firebase/firestore";

export interface Article {
  id?: string;
  title: string;
  author: string | null | undefined;
  authorEmail: string | null | undefined;
  authorId: string | null | undefined;
  categories: string[];
  facebook: string;
  instagram: string;
  whatsApp: string;
  twitter: string;
  phone: string;
  website: string;
  picture: string;
  pictureDesc: string;
  edition: string;
  type: string;
  articleBody: string[];
  date: Timestamp;
  likes: number;
  comments: number;
  views: number;
  shares: number;
}

export const initialArticle: Article = {
  title: "",
  author: "",
  authorEmail: "",
  authorId: "",
  categories: [],
  facebook: "",
  instagram: "",
  whatsApp: "",
  twitter: "",
  phone: "",
  website: "",
  picture: "",
  pictureDesc: "",
  edition: "",
  type: "",
  articleBody: [],
  date: Timestamp.now(),
  likes: 0,
  comments: 0,
  views: 0,
  shares: 0,
};
