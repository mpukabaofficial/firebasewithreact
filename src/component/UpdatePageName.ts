import { useEffect } from "react";

const useUpdatePageName = (pageName: string) => {
  useEffect(() => {
    const formattedPageName = pageName.trim()
      ? " | " + pageName.charAt(0).toUpperCase() + pageName.slice(1)
      : "";
    document.title = "The Spark" + formattedPageName;
  }, [pageName]);
};

export default useUpdatePageName;
