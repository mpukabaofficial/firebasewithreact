import { useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import { Task } from "../../component/IndexPage/Task";
import { getTasks } from "../../api/tasks";

const TaskPage = () => {
  const path = useLocation().pathname;
  const taskList: Task[] = getTasks();
  function findTask(): Task | undefined {
    // Using `find` to get the first matching article or undefined if not found
    return taskList.find((task) => path.split("/").includes(String(task.id)));
  }

  // Get the article using the findTask function
  const task = findTask();
  const { user } = useUserAuth();
  return <div>{task?.owner === user?.uid && <p>{task?.name}</p>}</div>;
};

export default TaskPage;
