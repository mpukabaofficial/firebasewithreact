import { useState } from "react";
import FormLayout from "../component/UploadArticles/FormLayout";
import useUpdatePageName from "../component/UpdatePageName";
import {
  Article,
  initialArticle,
} from "../component/Articles/ArticlesStructure";
import { inputList } from "../component/UploadArticles/InputList";
import useArticles from "../api/articles";
import ArticleInput from "../component/UploadArticles/ArticleInput";
import { Navigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useUserAuth } from "../context/useUserAuth";

const UploadArticlesPage = () => {
  const { user } = useUserAuth();
  useUpdatePageName("Upload Article");
  const { addDocument } = useArticles();
  const [article, setArticle] = useState<Article>({
    ...initialArticle,
    authorId: user?.uid,
    author: user?.displayName,
    authorEmail: user?.email,
  });
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleNext = () => {
    if (
      inputList[step].required &&
      !article[inputList[step].originalName as keyof Article]
    ) {
      setError(true);
      return;
    }
    if (step === inputList.length - 1) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setArticle({
      ...article,
      date: Timestamp.now(),
    });

    await addDocument(article);
    setArticle(initialArticle);
    setStep(0);
    setRedirect(true);
  };

  if (redirect) return <Navigate to="/articles" />;

  return (
    <FormLayout
      size={inputList.length}
      onNext={handleNext}
      onBack={handleBack}
      currentStep={step}
      onSubmit={handleSubmit}
    >
      <ArticleInput
        input={inputList[step]}
        onSetArticle={setArticle}
        article={article}
        error={error}
      />
    </FormLayout>
  );
};

export default UploadArticlesPage;
