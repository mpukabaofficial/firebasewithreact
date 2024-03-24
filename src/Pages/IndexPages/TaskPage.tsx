import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/useUserAuth";
import { Task } from "../../component/IndexPage/Task";
import useDocuments from "../../api/useDocuments";
import { useState } from "react";

const TaskPage = () => {
  const { user } = useUserAuth();
  const [redirect, setRedirect] = useState(false);
  const { deleteDocument, docsArray } = useDocuments<Task>("tasks");
  const path = useLocation().pathname;
  function findTask(): Task | undefined {
    // Using `find` to get the first matching article or undefined if not found
    return docsArray.find((task) => path.split("/").includes(String(task.id)));
  }
  const handleDeleteTask = (id: string) => {
    deleteDocument(id);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/tasks" />;
  }

  // Get the article using the findTask function
  const task = findTask();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="relative">
      {task?.owner === user?.uid && <p className="font-bold">{task?.name}</p>}
      <button
        className="absolute right-2 top-2 cursor-pointer rounded-md bg-red-600 p-0.5 text-white hover:bg-red-400"
        onClick={() => handleDeleteTask(task?.id ?? "")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <div>
        <p className="italic">{task?.description}</p>
      </div>
    </div>
  );
};

export default TaskPage;
