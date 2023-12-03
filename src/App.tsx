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
import OverviewPage from "./Pages/IndexPages/OverviewPage";
import ProjectPage from "./Pages/IndexPages/ProjectPage";
import TasksPage from "./Pages/IndexPages/TasksPage";
import AnalyticsPage from "./Pages/IndexPages/AnalyticsPage";
import TaskPage from "./Pages/IndexPages/TaskPage";
import AuthorPage from "./Pages/AuthorPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<IndexPage />}>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/:id" element={<TaskPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/upload" element={<UploadArticlesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/author/:id" element={<AuthorPage />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
