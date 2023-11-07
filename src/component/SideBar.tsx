import { Link, useLocation } from "react-router-dom";

interface SideBar {
  name: string;
  url: string;
}

const SideBar = ({ items }: { items: SideBar[] }) => {
  const path = useLocation().pathname;

  const style = (url: string): string => {
    let classes = "";
    if (path === url) classes = " bg-gray-200 ";
    return classes;
  };

  console.log("path " + path);
  return (
    <div className="my-4 flex items-center justify-center md:flex-col">
      {items.map((item, index) => (
        <Link
          to={item.url}
          className={
            " px-16 py-4 text-left underline hover:bg-gray-100" +
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
