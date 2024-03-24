import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent, useEffect } from "react";

// personal imports
import useDocuments from "../api/useDocuments";
import AddTag from "../component/UploadArticles/AddTag";
import { Article } from "../component/Articles/ArticlesStructure";
import Checkboxes from "../component/UploadArticles/Checkboxes";
import FileUpload from "../component/utilities/FileUpload";
import { initialArticle } from "../component/Articles/ArticlesStructure";
import Inputs from "../component/UploadArticles/Inputs";
import Select from "../component/UploadArticles/Select";
import tagsList from "../../tags.json";
import { useUserAuth } from "../context/useUserAuth";

// beginning of Page
const UploadArticlesPage = () => {
  // functional component
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const { addDocument } = useDocuments<Article>("articles");

  // useState
  const [article, setArticle] = useState<Article>({
    ...initialArticle,
    author: user?.displayName || "",
    authorEmail: user?.email || "",
    authorId: user?.uid || "",
  });
  const [uploaded, setUploaded] = useState(false);
  const [picture, setPicture] = useState("");
  const [tags, setTags] = useState<string[]>(tagsList.Categories);
  const [tag, setTag] = useState("");
  const [categories, setCategories] = useState(new Set());

  // useEffects
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    // When article is loaded, initialize categories from article
    setCategories(new Set(article.categories));
  }, [article.categories]);

  // when form is submitted, it uses the addDocuments(defined in firestore.ts) and then resets the article
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Convert Set of categories to an Array
    const categoriesArray = Array.from(categories);

    // Construct the article object with updated categories
    const updatedArticle = {
      ...article,
      categories: categoriesArray,
      picture: picture, // Assuming 'photo' is the state for the picture URL
      // Add other fields as necessary
    };

    try {
      await addDocument({
        ...updatedArticle,
        categories: categoriesArray.map((category) => String(category)),
      });
      // Resetting the article to initial state and other states as needed
      setArticle({
        ...initialArticle,
        author: user?.displayName || "",
        authorEmail: user?.email || "",
        authorId: user?.uid || "",
      });
      setCategories(new Set()); // Resetting categories
      setUploaded(true);
      setPicture(""); // Reset photo state if necessary
      // Additional state resets as needed
    } catch (error) {
      console.error("Error adding document:", error);
      // Handle the error appropriately
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const paragraphs = event.target.value.split("\n\n");
    setArticle((prevArticle) => ({
      ...prevArticle,
      articleBody: paragraphs,
    }));
  };

  const handleTagChange = (tag: string, isChecked: boolean) => {
    setCategories((prevCategories) => {
      const newCategories = new Set(prevCategories);
      if (isChecked) newCategories.add(tag);
      else newCategories.delete(tag);
      return newCategories;
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
      <Inputs
        article={article}
        ommited={[
          "authorId",
          "categories",
          "type",
          "tags",
          "articleBody",
          "date",
          "picture",
          "comments",
          "views",
          "likes",
          "shares",
          "edition",
        ]}
        onHandleChange={handleChange}
      />
      {/* picture */}
      <FileUpload setUrl={setPicture} fileLocation="articles" />

      {/* TextArea for 'articleBody' */}

      <textarea
        name="articleBody"
        value={article.articleBody}
        onChange={handleBodyChange}
        placeholder="Article Body"
        className="max-h-fit min-h-[20vh] w-full resize-none rounded-md border p-2 shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      />

      {/* Select for 'edition' */}

      <Select
        onHandleChange={handleChange}
        selected={article.edition}
        selectionList={tagsList.Editions}
        title={"Select Edition"}
        name={"edition"}
      />
      {/* Select for types of articles */}
      <Select
        onHandleChange={handleChange}
        selected={article.type}
        selectionList={tagsList.typesOfArticles}
        title={"Select Type"}
        name={"type"}
      />

      {/* Checkboxes for selecting tags */}
      <Checkboxes
        title={"Select Categories"}
        tags={tags}
        selectedCategories={categories as Set<string>}
        onHandleTagChange={handleTagChange}
      />

      {/* Input for adding a new tag */}
      <AddTag tag={tag} onSetTag={setTag} onHandleAddTag={handleAddTag} />

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
