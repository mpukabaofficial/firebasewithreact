import { useUserAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUserAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="z-10 flex items-center justify-between p-4 shadow-md">
      <Link className="font-sans text-3xl font-bold" to={"/"}>
        The Spark
      </Link>
      <div>
        {!!user ? (
          <div className="flex items-center gap-4">
            <Link
              className="rounded-full border border-black p-2 hover:bg-gray-100"
              to={"/account"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center  rounded-xl bg-black p-4 py-2 text-white hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            className="flex items-center justify-center  rounded-xl border border-black p-4 py-2 hover:bg-gray-100"
            to={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
