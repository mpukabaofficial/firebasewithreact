import { useEffect } from "react";

const useUpdatePageName = (pageName: string) => {
  useEffect(() => {
    document.title = "The Spark" + (pageName.trim() ? " | " : "") + pageName;
  }, []);
};

export default useUpdatePageName;
