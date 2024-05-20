import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskFormView from "./TaskFormView";

const TaskDetailView = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTask(data.task);
        }
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  return (
    task &&
    (edit ? (
      <TaskFormView createTask={task} />
    ) : (
      <div className="max-w-7xl min-h-[90dvh] mx-auto px-6 bg-white rounded-lg shadow-md flex items-center justify-center flex-col">
        <div className="mb-4 flex w-full items-center justify-around">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Title</h3>
          <p className="text-gray-700">{task.description}</p>
        </div>
        <div className="mb-4 flex w-full items-center justify-around">
          <h3 className="text-lg font-semibold text-gray-600">Description</h3>
          <p className="text-gray-700">{task.description}</p>
        </div>
        <div className="mb-4 flex w-full items-center justify-around">
          <h3 className="text-lg font-semibold text-gray-600">Status</h3>
          <p className="text-gray-700 capitalize">{task.status}</p>
        </div>
        <div className="mb-4 flex w-full items-center justify-around">
          <h3 className="text-lg font-semibold text-gray-600">Due Date</h3>
          <p className="text-gray-700">
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4 flex w-full items-center justify-around">
          <button
            onClick={() => {
              fetch(`${import.meta.env.VITE_BACKEND_URL}/${id}`, {
                method: "DELETE",
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    navigate("/");
                  }
                })
                .catch((error) => console.error("Error deleting task:", error));
            }}
            className="mt-6 w-full sm:w-auto bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition duration-200"
          >
            Delete Task
          </button>
          <button
            onClick={() => setEdit(true)}
            className="mt-6 w-full sm:w-auto bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition duration-200"
          >
            Edit Task
          </button>
        </div>
      </div>
    ))
  );
};

export default TaskDetailView;
