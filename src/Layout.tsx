import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./component/SideBar";
type sidebar = {
  name: string;
  url: string;
};

const Layout = () => {
  const sidebarList: sidebar[] = [
    { name: "articles", url: "/articles" },
    { name: "upload", url: "/upload" },
  ];
  return (
    <div className="">
      <Header />
      <div className="sm:flex">
        <div>
          <SideBar items={sidebarList} />
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
