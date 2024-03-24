import { Link, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

// personal imports
import Tags from "../component/Articles/Tags";
import { useUserAuth } from "../context/useUserAuth";
import Engagement from "../component/Articles/Engagement";
import SocialMedia from "../component/Articles/SocialMedia";
import { toDateTime } from "../component/utilities/DateFormatting";
import Loading from "../component/utilities/Loading";
import { User } from "../component/Account/User";
import useUpdatePageName from "../component/UpdatePageName";
import useArticles from "../api/articles";
import { Article } from "../component/Articles/ArticlesStructure";
import useUsers from "../api/users";

const ArticlePage = () => {
  const { user } = useUserAuth();
  const location = useLocation();
  const { docsArray, deleteDocument } = useArticles();
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(""); // New state for error handling

  useEffect(() => {
    if (docsArray.length > 0 || error) setLoading(false);
  }, [docsArray, error]);

  const article = useMemo(() => {
    const pathSegments = location.pathname.split("/");
    return docsArray.find((article) =>
      pathSegments.includes(String(article.id))
    );
  }, [location.pathname, docsArray]);

  useUpdatePageName(article?.title ?? "Article");

  const { docsArray: usersArray } = useUsers();
  const users = usersArray as User[];

  const findUser = useMemo(() => {
    return article
      ? users.find((user) => user.id === article.authorId)
      : undefined;
  }, [article, users]);

  const handleDeleteArticle = async () => {
    try {
      if (article?.id) {
        await deleteDocument(article.id);
        setDeleted(true);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to delete article."); // Set error state
    }
  };

  if (loading) return <Loading />; // Show loading indicator while loading
  if (error) return <div>Error: {error}</div>; // Show error message if error occurs
  if (deleted) return <Navigate to="/articles" />;
  if (!user) return <Navigate to={"/login"} />;
  if (!article) return <div>Article not found.</div>; // Updated to show a more specific message

  // Make sure the article and articleBody exist before trying to map over it
  return (
    <article className="mx-auto max-w-[1024px]">
      <div className="gap-4 text-black">
        <Link
          to={"/articles"}
          className="flex w-fit rounded-full bg-gray-200 p-2 transition-all duration-200 ease-in-out hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  md:text-5xl lg:text-6xl">
          {article?.title}
        </h1>
      </div>
      <div className="flex aspect-video w-full overflow-hidden">
        <img
          src={article?.picture}
          alt={article?.pictureDesc}
          className="h-full w-full object-cover"
        />
      </div>

      <Engagement
        views={article?.views}
        likes={article.likes}
        comments={article.comments}
        shares={article.shares}
      />

      <div className="flex flex-col py-8">
        <Link
          className="mb-1 mt-4 text-blue-600 hover:underline"
          to={"/author/" + article?.authorId}
        >
          {/* By: {article?.author} */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              {findUser?.photo ? (
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={findUser?.photo}
                  alt=""
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-500 text-lg font-bold text-white">
                  {article?.author?.slice(0, 1)}
                </div>
              )}
            </div>
            <div className="font-medium ">
              <div>{article?.author}</div>
            </div>
          </div>
        </Link>
        <p className="text-sm">
          {article?.date ? toDateTime(article.date?.seconds ?? 0) : null}
        </p>
      </div>

      <div className="mx-auto max-w-[700px]">
        {article?.articleBody.map((para: string, index: number) => (
          // Use index as key for lack of a better option, but it's better to use unique IDs when possible
          <p
            key={index}
            className={index === 0 ? "py-4 text-lg font-bold" : "py-4 text-lg"}
          >
            {para}
          </p>
        ))}
        <Tags
          tags={[...article.categories, article.type, article.edition] ?? []}
          total={article?.categories?.length + 2 ?? 0}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-4 text-gray-500">
        <SocialMedia article={article as Article} />
        <div>
          {article.authorId === user.uid && (
            <button
              className="w-full rounded-xl bg-red-500 px-4 py-2 text-white"
              onClick={handleDeleteArticle}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
