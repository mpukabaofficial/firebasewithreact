import { Route, Routes } from "react-router-dom";

import "./App.css";
import AccountPage from "./Pages/AccountPage";
import AuthorPage from "./Pages/AuthorPage";
import ArticlePage from "./Pages/ArticlePage";
import AnalyticsPage from "./Pages/IndexPages/AnalyticsPage";
import ArticlesPage from "./Pages/ArticlesPage";
import { AuthContextProvider } from "../src/context/AuthContext";
import FeatureTest from "./Pages/FeatureTest";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import OverviewPage from "./Pages/IndexPages/OverviewPage";
import ProjectPage from "./Pages/IndexPages/ProjectPage";
import RegisterPage from "./Pages/RegisterPage";
import TasksPage from "./Pages/IndexPages/TasksPage";
import TaskPage from "./Pages/IndexPages/TaskPage";
import TeamPage from "./Pages/TeamPage";
import UploadArticlesPage from "./Pages/UploadArticlesPage";

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
            <Route path="/feature" element={<FeatureTest />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
