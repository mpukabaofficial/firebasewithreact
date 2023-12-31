import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const ProjectPage = () => {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <div>Projects</div>;
};

export default ProjectPage;
