import { Link, useLocation } from "react-router-dom";

interface SideBar {
  name: string;
  url: string;
}

const SideBar = ({ items }: { items: SideBar[] }) => {
  const path = useLocation().pathname;

  const style = (url: string): string => {
    let classes = "";
    if (path === url) classes = " text-blue-500 border-b border-b-blue-500 ";
    return classes;
  };

  console.log("path " + path);
  return (
    <div className="my-4 flex items-center justify-center">
      {items.map((item, index) => (
        <Link
          to={item.url}
          className={
            "px-4 py-2 text-left transition-all hover:text-gray-400 " +
            style(item.url)
          }
          key={index}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
