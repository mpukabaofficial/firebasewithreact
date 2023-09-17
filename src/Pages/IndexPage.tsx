import { Link } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const IndexPage = () => {
  const { user } = useUserAuth();
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-center text-2xl font-semibold">
        {!!user ? "Hey " + user.displayName + "!" : "Register to our website"}
      </h2>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/account"}>Account</Link>
    </div>
  );
};

export default IndexPage;
