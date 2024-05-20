import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskFormView = ({ createTask }) => {
  const [title, setTitle] = useState(createTask?.title);
  const [description, setDescription] = useState(createTask?.description);
  const [status, setStatus] = useState(createTask?.status);
  const date = new Date(createTask?.dueDate).getDate();
  const month = new Date(createTask?.dueDate).getMonth() + 1;
  const year = new Date(createTask?.dueDate).getFullYear();
  const [dueDate, setDueDate] = useState(
    `${year}-${month < 10 ? "0" + month : month}-${
      date < 10 ? "0" + date : date
    }`
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newTask = { title, description, status, dueDate };
    if (createTask) {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/" + createTask._id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );
        const data = await response.json();
        if (data.success) {
          navigate("/");
        } else {
          console.error("Error updating task");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        const data = await response.json();
        if (data.success) {
          navigate("/");
        } else {
          console.error("Error creating task");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {createTask ? "Update Task" : "Create New Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Description:
          </label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Status:</label>
          <select
            value={status}
            required
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          >
            <option value="to-do">To do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            required
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md shadow-md hover:bg-indigo-600 transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="size-8" />
          ) : createTask ? (
            "Update Task"
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskFormView;
