import { Link } from "react-router-dom";
import { Articles } from "../component/ArticlesStructure";
import { useFirestoreDocs } from "../firestore";

const ArticlesPage = () => {
  const docsArray: Articles[] = useFirestoreDocs();
  return (
    <div className="mx-auto flex max-w-[1024px] flex-col items-center justify-center gap-4">
      {docsArray.length > 0 &&
        docsArray.map((theDoc, index) => (
          <Link
            key={index}
            className="flex h-[20vh] min-w-[800px] flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white object-cover shadow hover:bg-gray-100 md:max-w-xl md:flex-row "
            to={"/article/" + theDoc.id}
          >
            <img
              className="h-[100%] w-48 rounded-t-lg object-cover "
              src={theDoc.picture}
              alt={theDoc.pictureDesc}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {theDoc.articleInfo}
              </h5>
              <p className="mb-3 font-normal text-blue-400 ">{theDoc.author}</p>
              <div>
                <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {theDoc.tag}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ArticlesPage;
