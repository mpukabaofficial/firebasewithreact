import { Link } from "react-router-dom";
import { Articles } from "../component/ArticlesStructure";
import { useFirestoreDocs } from "../firestore";

const ArticlesPage = () => {
  const docsArray: Articles[] = useFirestoreDocs();
  return (
    <div className="mx-auto flex max-w-[1024px] flex-col items-center justify-center gap-4 p-2">
      {docsArray.length > 0 &&
        docsArray.map((theDoc, index) => (
          <Link
            key={index}
            className="flex min-h-[200px] flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white object-cover shadow hover:bg-gray-100 sm:h-[20vh] sm:max-w-xl sm:flex-row lg:min-w-[800px]"
            to={"/article/" + theDoc.id}
          >
            <div className="flex aspect-video w-full overflow-hidden">
              <img
                className="h-full w-full rounded-t-lg object-cover sm:w-48"
                src={theDoc.picture}
                alt={theDoc.pictureDesc}
              />
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {theDoc.articleInfo}
              </h5>
              <p className="mb-3 font-normal text-blue-400 ">{theDoc.author}</p>
              <div>
                {theDoc.tag.map((aTag, index) => (
                  <span
                    key={index}
                    className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {aTag !== " " && aTag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ArticlesPage;
