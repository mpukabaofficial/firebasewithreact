export interface User {
  id: string;
  name: string;
  username: string;
  about: string;
  photo: string;
  contact: {
    email: boolean;
    phone: boolean;
    website: boolean;
    facebook: boolean;
    instagram: boolean;
    twitter: boolean;
    linkedin: boolean;
  };
  email: string;
  phone: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  website: string;
}
