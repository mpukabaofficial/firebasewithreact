import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import AccountPage from "./Pages/AccountPage";
import IndexPage from "./Pages/IndexPage";
import { AuthContextProvider } from "../src/context/AuthContext";
import Layout from "./Layout";
import ArticlesPage from "./Pages/ArticlesPage";
import UploadArticlesPage from "./Pages/UploadArticlesPage";
import ArticlePage from "./Pages/ArticlePage";
import TeamPage from "./Pages/TeamPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/upload" element={<UploadArticlesPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
