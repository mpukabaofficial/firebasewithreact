import { Articles } from "../component/ArticlesStructure";
import { useFirestoreDocs } from "../firestore";

const ArticlesPage = () => {
  const docsArray: Articles[] = useFirestoreDocs();
  return (
    <div className="">
      {docsArray.length > 0 &&
        docsArray.map((theDoc, index) => (
          <div key={index}>
            <img src={theDoc.picture} alt="" />
            <div key={index}>{theDoc.pictureDesc}</div>
            <p>{theDoc.articleBody}</p>
            <a href={theDoc.link}>click to access</a>
          </div>
        ))}
    </div>
  );
};

export default ArticlesPage;
