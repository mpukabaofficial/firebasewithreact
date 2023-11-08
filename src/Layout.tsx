import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./component/SideBar";
import { useState } from "react";
type sidebar = {
  name: string;
  url: string;
};

const Layout = () => {
  const sidebarList: sidebar[] = [
    { name: "articles", url: "/articles" },
    { name: "upload", url: "/upload" },
    { name: "team", url: "/team" },
  ];

  return (
    <div className="dark:bg-grey-800 ">
      <Header />
      <div className="flex flex-col">
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
