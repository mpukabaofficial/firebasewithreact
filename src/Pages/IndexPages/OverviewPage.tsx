import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const OverviewPage = () => {
  const { user, ready } = useUserAuth();

  if (!user && ready) {
    return <Navigate to="/login" />;
  }

  return <div>Overview</div>;
};

export default OverviewPage;
