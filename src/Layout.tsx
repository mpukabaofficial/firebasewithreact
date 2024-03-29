import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./component/IndexPage/SideBar";
import { sidebar } from "./component/IndexPage/SideBarList";
import Footer from "./Footer";
import { useUserAuth } from "./context/useUserAuth";
import Loading from "./component/utilities/Loading";
import useUpdatePageName from "./component/UpdatePageName";

const Layout = () => {
  const { ready } = useUserAuth();
  const location = useLocation().pathname.split("/");
  useUpdatePageName(location[1]);
  const sidebarList: sidebar[] = [
    {
      name: "",
      url: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    { name: "articles", url: "/articles" },
    { name: "upload", url: "/upload" },
    { name: "team", url: "/team" },
  ];

  if (!ready) {
    return <Loading />;
  }

  return (
    <div className="">
      <Header />
      <div className="flex flex-col">
        <div>
          <SideBar items={sidebarList} />
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
      {location.includes("account") && <Footer />}
    </div>
  );
};

export default Layout;
