import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditTodoModal from "../ui/EditTodoModal";
import { AppContext } from "../../context/AppContext";
import API from "../../config/axios";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function TodoCard({ todos }) {
  const { token, getTodos } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await API.delete(
        `/api/tasks/delete-task/${todos?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getTodos();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (e) => {
    try {
      const { data } = await API.put(
        `/api/tasks/update-status/${todos?._id}`,
        { status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getTodos();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
        <span className={todos?.status === "completed" ? "line-through text-zinc-500" : "text-white"}>
          {todos?.title}
        </span>

        <div className="flex gap-3">
          <select
            className="bg-zinc-800 text-sm px-2 py-1 rounded-lg"
            value={todos?.status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button disabled={todos?.status === "completed"} onClick={() => setOpen(true)} className="text-blue-500">
            <Edit size={18} />
          </button>
          <button className="text-red-500" onClick={handleDelete}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {open && <EditTodoModal todos={todos} close={() => setOpen(false)} />}
    </>
  );
}
