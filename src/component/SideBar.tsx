import { Link, useLocation } from "react-router-dom";
import { sidebar } from "./SideBarList";

const SideBar = ({ items }: { items: sidebar[] }) => {
  const path = useLocation().pathname;

  const style = (url: string[]): string => {
    let classes = "";
    if (url.includes(path))
      classes = " text-blue-500 border-b border-b-blue-500 ";
    return classes;
  };

  const home = ["/projects", "/tasks", "/analytics"];

  console.log("path " + path);
  return (
    <div className="my-4 flex items-center justify-center">
      {items.map((item, index) => (
        <Link
          to={item.url}
          className={
            "px-4 py-2 text-left font-semibold transition-all duration-300 ease-in-out hover:text-gray-400" +
            style(item.url === "/" ? [...home, "/"] : [item.url])
          }
          key={index}
        >
          {item.name !== "" ? item.name : item.icon}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
