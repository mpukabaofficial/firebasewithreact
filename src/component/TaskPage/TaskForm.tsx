import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Task } from "../IndexPage/Task";
import { useUserAuth } from "../../context/useUserAuth";

interface Props {
  onSubmition: (newTask: Task) => Promise<void>;
  onClick: (e: boolean) => void;
}

const TaskForm = ({ onSubmition, onClick }: Props) => {
  const { user } = useUserAuth();
  const [task, setTask] = useState<Task>({
    name: "",
    status: false,
    assigned: Timestamp.now(),
    dueDate: Timestamp.now(),
    description: "",
    owner: user?.uid ?? "",
  });
  const [date, setDate] = useState(
    new Date().toLocaleString("default", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  );
  const [descr, setDescr] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmition({
      ...task,
      description: descr,
      dueDate: Timestamp.fromDate(new Date(date)),
    });
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(false);
  };

  // Convert Firestore Timestamp to YYYY-MM-DD format
  // const formatDateInputValue = (timestamp: Timestamp | undefined) => {
  //   if (timestamp?.toDate) {
  //     return timestamp.toDate().toISOString().split("T")[0];
  //   }
  //   return "";
  // };

  // const dateInputValue = formatDateInputValue(task.dueDate);

  return (
    <form className="mx-auto mt-10 max-w-md" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Task Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={task.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-900"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          name="description"
          onChange={(e) => setDescr(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="dueDate"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={date}
          name="dueDate"
          onChange={(e) => setDate(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto"
        >
          Submit
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
