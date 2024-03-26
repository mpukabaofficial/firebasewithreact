import { Timestamp } from "firebase/firestore";

export interface Article {
  id?: string;
  title: string;
  author: string | null | undefined;
  authorEmail: string | null | undefined;
  authorId: string | null | undefined;
  facebook: string;
  instagram: string;
  whatsApp: string;
  twitter: string;
  phone: string;
  website: string;
  picture: string;
  pictureDesc: string;
  tags: string[];
  articleBody: string[];
  date: Timestamp;
  likes: string[];
  views: string[];
  shares: number;
}

export const initialArticle: Article = {
  author: "",
  authorEmail: "",
  authorId: "",
  title: "",
  facebook: "",
  instagram: "",
  whatsApp: "",
  twitter: "",
  phone: "",
  website: "",
  picture: "",
  pictureDesc: "",
  articleBody: [],
  date: Timestamp.now(),
  likes: [],
  views: [],
  shares: 0,
  tags: [],
};
