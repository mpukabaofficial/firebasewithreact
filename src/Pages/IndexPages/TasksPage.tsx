import { useState } from "react";
import TaskForm from "../../component/TaskPage/TaskForm";
import { addTask, getTasks } from "../../api/tasks";
import { Task } from "../../component/IndexPage/Task";
import { useUserAuth } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const TasksPage = () => {
  const { user } = useUserAuth();
  const [formStatus, setFormStatus] = useState(false);

  const handleFormData = async (newTask: Task) => {
    await addTask(newTask);
    setFormStatus(false);
  };

  const taskList: Task[] = getTasks();

  function formatDateString(dateString: string): string {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day

    const isToday = inputDate.toDateString() === currentDate.toDateString();
    const isOverdue = inputDate < currentDate;

    if (isOverdue && !isToday) {
      const diffTime = Math.abs(currentDate.getTime() - inputDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Overdue by ${diffDays} day(s)`;
    } else if (isToday) {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };
      return inputDate.toLocaleTimeString("en-US", options);
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return inputDate.toLocaleDateString("en-US", options);
    }
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      {!formStatus && (
        <div>
          <button
            onClick={() => setFormStatus(true)}
            className="flex w-full items-center justify-center gap-1 rounded-md border border-blue-600 px-3 py-1 text-blue-600"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            add task
          </button>
          <div className="my-8 flex flex-col gap-2">
            {taskList.map(
              (aTask) =>
                !aTask.status &&
                aTask.owner === user?.uid && (
                  <Link
                    key={aTask.id}
                    className="flex w-full items-center justify-between gap-16  rounded-md  border  px-4 py-2"
                    to={"/tasks/" + aTask.id}
                  >
                    <span className="flex items-center text-sm">
                      {aTask.name}{" "}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        <span
                          className={
                            formatDateString(aTask.dueDate.toDate().toString())
                              .split(" ")
                              .includes("Overdue")
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {formatDateString(aTask.dueDate.toDate().toString())}
                        </span>
                      </span>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
      {formStatus && (
        <TaskForm onSubmition={handleFormData} onClick={setFormStatus} />
      )}
    </div>
  );
};

export default TasksPage;
