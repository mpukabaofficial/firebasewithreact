import { useState, FormEvent, ChangeEvent } from "react";
import { addDocuments } from "../firestore";
import { useUserAuth } from "../context/AuthContext";
import { Articles } from "../component/ArticlesStructure";
import { Navigate } from "react-router-dom";

const UploadArticlesPage = () => {
  const { user } = useUserAuth();
  const [article, setArticle] = useState<Articles>({
    articleInfo: "",
    author: user?.displayName || "",
    authorEmail: user?.email || "",
    authorId: user?.uid || "",
    category: "",
    link: "",
    name: "",
    picture: "",
    pictureDesc: "",
    tag: "",
    type: "",
    articleBody: "",
  });

  // Categories, types, and tags options can be defined here or fetched from an API
  const categories = [
    "themed",
    "cover",
    "pearls",
    "ads-elements",
    "other-edition",
    "spiritual",
  ];
  const types = ["Advertisement", "Article"];

  const tags = [
    "Fifth Edition",
    "Fourth Edition",
    "Third Edition",
    "Second Edition",
    "First Edition",
    "Spiritual",
    "Spotlight",
    "Politics",
    "Ad",
  ];

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const paragraphs = article.articleBody.split("\n");
    try {
      await addDocuments(article);
      setArticle({
        articleInfo: "",
        author: user?.displayName || "",
        authorEmail: user?.email || "",
        authorId: user?.uid || "",
        category: "",
        link: "",
        name: "",
        picture: "",
        pictureDesc: "",
        tag: "",
        type: "",
        articleBody: "",
      });
      console.log("Article submitted:", article);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  return (
    <form
      className="m-auto flex max-w-screen-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {/* Render inputs for all keys except for 'authorId', 'category', 'type', 'tag', and 'articleBody' */}
      {Object.keys(article).map((key) => {
        if (
          ["authorId", "category", "type", "tag", "articleBody"].includes(key)
        ) {
          return null; // These are handled separately
        }

        return (
          <input
            key={key}
            type="text"
            name={key}
            value={(article as any)[key]}
            onChange={handleChange}
            placeholder={
              key.charAt(0).toUpperCase() +
              key
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()
            }
            disabled={key === "authorEmail" || key === "author"}
            className="border p-2"
          />
        );
      })}

      {/* TextArea for 'articleBody' */}
      <textarea
        name="articleBody"
        value={article.articleBody}
        onChange={handleChange}
        placeholder="Article Body"
        className="h-[20vh] border p-2"
      />

      {/* Select for 'category' */}
      <select
        name="category"
        value={article.category}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Select for 'type' */}
      <select
        name="type"
        value={article.type}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="">Select Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Select for 'tag' */}
      <select
        name="tag"
        value={article.tag}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="">Select Tag</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-xl bg-black p-4 text-white hover:bg-gray-800"
      >
        Submit Article
      </button>
    </form>
  );
};

export default UploadArticlesPage;
