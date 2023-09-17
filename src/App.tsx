import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import AccountPage from "./Pages/AccountPage";
import IndexPage from "./Pages/IndexPage";
import { AuthContextProvider } from "../src/context/AuthContext";

function App() {
  return (
    <>
      <Link className="block text-center text-3xl font-bold" to={"/"}>
        Firebase Auth and Context
      </Link>
      <AuthContextProvider>
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
