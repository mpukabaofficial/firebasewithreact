import { getUsers } from "../api/users";
import { User } from "../component/Account/User";
import { useUserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const TeamPage = () => {
  const { user } = useUserAuth();

  const users: User[] = getUsers();

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log(users);

  return (
    <ul role="list" className="mx-auto max-w-[1024px] divide-y divide-gray-100">
      {users.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="h-12 w-12">
              <img
                className="h-full w-full flex-none rounded-full bg-gray-50 object-cover"
                src={person.photo}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name.split("|").join(" ")}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TeamPage;
