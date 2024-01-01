import { Link, useLocation } from "react-router-dom";
import { sidebar } from "./SideBarList";

const IndexSideBar = ({ items }: { items: sidebar[] }) => {
  const path = useLocation().pathname;

  const style = (url: string): string => {
    let classes = "";
    if (path === url) classes = " bg-gray-100 ";
    return classes;
  };
  return (
    <div className="right fixed bottom-0 left-0 right-0 flex w-full justify-center gap-6 bg-white p-2 md:relative  md:w-60 md:flex-col md:gap-2 md:bg-transparent ">
      {items.map((item) => (
        <Link
          to={item.url}
          className={
            "flex items-center gap-2 rounded-md px-2 py-3 hover:bg-gray-100" +
            style(item.url)
          }
        >
          <span>{item.icon} </span>
          <span className="hidden md:block">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default IndexSideBar;
