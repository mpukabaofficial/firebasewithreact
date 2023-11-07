export interface Articles {
  id?: string; // Included the id in the interface
  articleInfo: string;
  author: string | null | undefined;
  authorEmail: string | null | undefined;
  authorId: string | null | undefined;
  category: string;
  link: string;
  picture: string;
  pictureDesc: string;
  tag: string[];
  type: string;
  articleBody: string[];
}
