import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";
import { getUsers } from "../api/users";
import { User } from "../component/User";
import Loading from "../component/Loading";
import UserProfileForm from "../component/UserProfileForm";

const AccountPage = () => {
  const { user, ready } = useUserAuth();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (user && users && ready) {
      const matchedUser = users.find(
        (specificUser) => specificUser.id === user.uid
      );
      setCurrentUser(matchedUser);
    }
  }, [user, users, ready]);

  if (!user && ready) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-[1024px]">
      {!currentUser && !showForm && (
        <button
          className="flex w-full items-center justify-center gap-1 rounded-md border border-blue-600 px-3 py-1 text-blue-600"
          onClick={() => setShowform(true)}
        >
          Create profile
        </button>
      )}
      {showForm && (
        <UserProfileForm
          username={user?.displayName}
          email={user?.email}
          onClose={() => setShowform(false)}
        />
      )}
    </div>
  );
};

export default AccountPage;
