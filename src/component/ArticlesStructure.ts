import { Timestamp } from "firebase/firestore";

export interface Articles {
  id?: string; // Included the id in the interface
  articleInfo: string;
  author: string | null | undefined;
  authorEmail: string | null | undefined;
  authorId: string | null | undefined;
  category: string;
  facebook: string;
  instagram: string;
  WhatsApp: string;
  Twitter: string;
  Number: string;
  Website: string;
  picture: string;
  pictureDesc: string;
  tags: string[];
  type: string;
  articleBody: string[];
  date: Timestamp;
  likes: number;
  comments: number;
  views: number;
  shares: number;
}
