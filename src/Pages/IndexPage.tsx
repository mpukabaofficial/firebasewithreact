import { useUserAuth } from "../context/AuthContext";

const IndexPage = () => {
  const { user, ready } = useUserAuth();
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-center text-2xl font-semibold">
        {!!user && ready
          ? "Hey " + user.displayName + "!"
          : "Together we are the future!"}
      </h2>
    </div>
  );
};

export default IndexPage;
