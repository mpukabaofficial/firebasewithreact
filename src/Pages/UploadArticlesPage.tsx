import { useState, FormEvent, ChangeEvent } from "react";
import { addArticle } from "../api/articles";
import { useUserAuth } from "../context/AuthContext";
import { Articles } from "../component/ArticlesStructure";
import { Navigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const UploadArticlesPage = () => {
  const { user } = useUserAuth();
  const [article, setArticle] = useState<Articles>({
    articleInfo: "",
    author: user?.displayName || "",
    authorEmail: user?.email || "",
    authorId: user?.uid || "",
    category: "",
    facebook: "",
    instagram: "",
    WhatsApp: "",
    Twitter: "",
    Number: "",
    Website: "",
    picture: "",
    pictureDesc: "",
    tags: [""],
    type: "",
    articleBody: [],
    date: Timestamp.now(),
  });
  const [uploaded, setUploaded] = useState(false);

  // these are the current categories, tags and types
  const categories = [
    "themed",
    "cover",
    "pearls",
    "ads-elements",
    "other-edition",
    "spiritual",
  ];
  const types = ["Advertisement", "Article"];

  const [tags, setTags] = useState<string[]>([
    "Fifth Edition",
    "Fourth Edition",
    "Third Edition",
    "Second Edition",
    "First Edition",
    "Spiritual",
    "Spotlight",
    "Politics",
    "Ad",
  ]);
  const [tag, setTag] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  // when form is submitted, it uses the addDocuments(defined in firestore.ts) and then resets the article
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addArticle(article);
      setArticle({
        articleInfo: "",
        author: user?.displayName || "",
        authorEmail: user?.email || "",
        authorId: user?.uid || "",
        category: "",
        facebook: "",
        instagram: "",
        WhatsApp: "",
        Twitter: "",
        Number: "",
        Website: "",
        picture: "",
        pictureDesc: "",
        tags: [],
        type: "",
        articleBody: [],
        date: Timestamp.now(),
      });
      setUploaded(true);
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

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const paragraphs = e.target.value.split("\n\n");
    setArticle((prevArticle) => ({
      ...prevArticle,
      articleBody: paragraphs,
    }));
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setArticle((prevArticle) => {
      // Add or remove the value from the tag array
      const newTags = checked
        ? [...prevArticle.tags, value]
        : prevArticle.tags.filter((t) => t !== value);

      return {
        ...prevArticle,
        tags: newTags,
      };
    });
  };

  const handleAddTag = () => {
    if (tag === "") return;

    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]); // Add the new tag to the tags array
      setTag(""); // Clear the input field
    }
  };

  if (uploaded) {
    return <Navigate to="/articles" />;
  }

  return (
    <form
      className="m-auto flex max-w-screen-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {/* Render inputs for all keys except for 'authorId', 'category', 'type', 'tag', and 'articleBody' */}
      {Object.keys(article).map((key) => {
        if (
          [
            "authorId",
            "category",
            "type",
            "tags",
            "articleBody",
            "date",
          ].includes(key)
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
        onChange={handleBodyChange}
        placeholder="Article Body"
        className="max-h-fit min-h-[20vh] border p-2"
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

      {/* Checkboxes for selecting tags */}
      <fieldset className="">
        <legend>Select Tags</legend>
        {tags.map((tag, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="tag"
              value={tag}
              checked={article.tags.includes(tag)}
              onChange={handleTagChange}
            />
            <span>{tag}</span>
          </label>
        ))}
      </fieldset>

      {/* Input for adding a new tag */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a tag"
          className="border p-2"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="flex min-w-fit justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Add tag
        </button>
      </div>

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
