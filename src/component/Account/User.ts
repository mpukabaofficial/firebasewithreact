export interface User {
  about: string;
  email: string;
  id: string;
  name: string;
  username: string;
  photo: string;
  role:
    | "lelo"
    | "superAdmin"
    | "admin"
    | "editor"
    | "user"
    | "quality"
    | "writer";
}

// contact: {
//   email: boolean;
//   phone: boolean;
//   website: boolean;
//   facebook: boolean;
//   instagram: boolean;
//   twitter: boolean;
//   linkedin: boolean;
// };
// socialMedia: {
//   facebook: string;
//   instagram: string;
//   linkedin: string;
//   twitter: string;
// };
// website: string;
// phone: string;
