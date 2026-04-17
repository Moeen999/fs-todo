import { Plus } from "lucide-react";
import { useState } from "react";
import API from "../../config/axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const { token, getTodos } = useContext(AppContext);
  const createTask = async () => {
    try {
      const { data } = await API.post(
        "/api/tasks/create-task",
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if(data?.success){
        getTodos()
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-3">
      <input
        placeholder="Add a new task..."
        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={createTask}
        className="bg-emerald-600 hover:bg-emerald-700 px-5 rounded-lg flex items-center gap-2"
      >
        <Plus size={18} /> Add
      </button>
    </div>
  );
}
