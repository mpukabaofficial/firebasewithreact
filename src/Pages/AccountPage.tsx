import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const AccountPage = () => {
  const { user, logout } = useUserAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (!user) return <Navigate to={"/"} />;

  return (
    <div className="mx-auto my-16 max-w-[600px] p-4">
      <h1 className="py-2 text-2xl font-bold">Account</h1>
      <p>User email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="my-4 border border-blue-500 px-6 py-2 text-blue-500 hover:text-blue-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AccountPage;
