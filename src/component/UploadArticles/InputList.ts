export interface Input {
  name: string;
  instruction: string;
  typeOfInput: "text" | "textarea" | "picture" | "tags";
  type: string;
  min: number | null;
  max: number | null;
  error: string;
  originalName: string;
  required: boolean;
}

export const inputList: Input[] = [
  {
    name: "Title",
    instruction: "Enter the title of your article",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "Please enter a valid title",
    originalName: "title",
    required: true,
  },
  {
    name: "Facebook",
    instruction: "Enter your Facebook handle",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "facebook",
    required: false,
  },
  {
    name: "Instagram",
    instruction: "Enter your Instagram handle",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "instagram",
    required: false,
  },
  {
    name: "Whatsapp",
    instruction: "Enter your Whatsapp number",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "whatsApp",
    required: false,
  },
  {
    name: "Twitter",
    instruction: "Enter your Twitter handle",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "twitter",
    required: false,
  },
  {
    name: "Phone",
    instruction: "Enter your Phone number",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "phone",
    required: false,
  },
  {
    name: "Website",
    instruction: "Enter your Website",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "website",
    required: false,
  },
  {
    name: "Picture",
    instruction: "Enter your Picture URL",
    typeOfInput: "picture",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "picture",
    required: true,
  },
  {
    name: "Picture Description",
    instruction: "Enter the Picture Description",
    typeOfInput: "text",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "pictureDesc",
    required: true,
  },
  {
    name: "Article Body",
    instruction: "Write your article here",
    typeOfInput: "textarea",
    type: "string",
    min: 2,
    max: 255,
    error: "",
    originalName: "articleBody",
    required: true,
  },
  {
    name: "Tags",
    instruction: "Enter tags for your article",
    typeOfInput: "tags",
    type: "string[]",
    min: null,
    max: null,
    error: "add a tag",
    originalName: "tags",
    required: true,
  },
];
