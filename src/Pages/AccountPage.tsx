import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useUserAuth } from "../context/AuthContext";
import { addUser, getUsers } from "../api/users";
import { User } from "../component/User";
import UserProfileForm from "../component/UserProfileForm";

const AccountPage = () => {
  const { user } = useUserAuth();
  const [currentUser, setCurrentUser] = useState<User>();
  const [showForm, setShowform] = useState(false);

  const users: User[] = getUsers();

  useEffect(() => {
    if (user && users.length > 0) {
      // Find the current user based on the user's UID
      users.forEach((u) => {
        if (u.id === user?.uid) {
          setCurrentUser(u);
          console.log("user set");
        }
      });
    }
  }, [user, users]);

  const setUser = (user: User) => {
    addUser(user);
  };

  if (!user) {
    return <Navigate to="/" />;
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
          setUser={setUser}
          id={user?.uid}
          other={currentUser ? currentUser : undefined}
        />
      )}
      {currentUser && !showForm && (
        <div className="">
          <div className="flex aspect-square max-w-[300px] overflow-hidden">
            <img
              src={currentUser?.photo ?? ""}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="my-4">
            <h1 className="py-2 text-4xl font-bold">
              {user?.displayName ?? ""}
            </h1>
            <p className="text py-2 text-sm">{currentUser.about}</p>
            <p className="text-gray-600">
              {currentUser.name.split("|").join(" ")}
            </p>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
          <button
            onClick={() => setShowform(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-white"
          >
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
