import { Articles } from "../component/ArticlesStructure";
import { useFirestoreDocs } from "../api/articles";
import { Link, useLocation } from "react-router-dom";
import facebook from "../assets/social icons/facebook.svg";
import instagram from "../assets/social icons/instagram.svg";
import twitter from "../assets/social icons/x-twitter.svg";
import phone from "../assets/social icons/phone-solid.svg";
import mail from "../assets/social icons/envelope-regular.svg";
import whatsapp from "../assets/social icons/whatsapp.svg";
import website from "../assets/social icons/globe-solid.svg";

const ArticlePage = () => {
  const path = useLocation().pathname;
  const docsArray: Articles[] = useFirestoreDocs();

  function findArticle(): Articles | undefined {
    // Using `find` to get the first matching article or undefined if not found
    return docsArray.find((article) =>
      path.split("/").includes(String(article.id))
    );
  }

  // Get the article using the findArticle function
  const article: Articles | undefined = findArticle();

  // change timestamp to date and time
  const toDateTime = (secs: number) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toString();
  };

  // Make sure the article and articleBody exist before trying to map over it
  return (
    <article className="mx-auto max-w-[1024px]">
      <div className="gap-4 text-black">
        <Link to={"/articles"} className="p-2">
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
          {article?.articleInfo}
        </h1>
      </div>
      <div className="flex aspect-video w-full overflow-hidden">
        <img
          src={article?.picture}
          alt={article?.pictureDesc}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col py-8">
        <Link
          className="my-4 text-blue-600 hover:underline"
          to={"/author/" + article?.authorId}
        >
          By: {article?.author}
        </Link>
        <p>{article?.date ? toDateTime(article.date?.seconds ?? 0) : null}</p>
      </div>

      <div className="mx-auto max-w-[700px]">
        {article?.articleBody.map((para, index) => (
          // Use index as key for lack of a better option, but it's better to use unique IDs when possible
          <p
            key={index}
            className={index === 0 ? "py-4 text-lg font-bold" : "py-4 text-lg"}
          >
            {para}
          </p>
        ))}
        <div>
          {article?.tag.map((aTag, index) => (
            <span
              key={index}
              className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-black"
            >
              {aTag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 text-gray-500">
        <h2 className="mx-auto w-[50%] text-center text-2xl font-semibold ">
          Get in contact
        </h2>
        <div className="social-links flex flex-wrap gap-2">
          {!!article?.facebook && (
            <a href={article?.facebook}>
              <img src={facebook} alt="facebook" />
            </a>
          )}
          {!!article?.instagram && (
            <a href={article?.instagram}>
              <img src={instagram} alt="instagram" />
            </a>
          )}
          {!!article?.Twitter && (
            <a href={article?.Twitter}>
              <img src={twitter} alt="twitter" />
            </a>
          )}
          {!!article?.WhatsApp && (
            <a href={article?.WhatsApp}>
              <img src={whatsapp} alt="whatsapp" />
            </a>
          )}
          {!!article?.Website && (
            <a href={article?.Website}>
              <img src={website} alt="website" />
            </a>
          )}
          {!!article?.Number && (
            <a href={"tel:" + article?.Number}>
              <img src={phone} alt="phone" />
            </a>
          )}
          {!!article?.authorEmail && (
            <a href={"mailto:" + article?.authorEmail}>
              <img src={mail} alt="email" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
