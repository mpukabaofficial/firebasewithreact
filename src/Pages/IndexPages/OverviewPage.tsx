import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const OverviewPage = () => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>Overview</div>;
};

export default OverviewPage;
