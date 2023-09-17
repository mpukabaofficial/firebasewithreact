import React from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <div className="flex flex-col p-4">
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/account"}>Account</Link>
    </div>
  );
};

export default IndexPage;
