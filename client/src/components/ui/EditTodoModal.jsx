import { useState } from "react";
import API from "../../config/axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function EditTodoModal({ todos, close }) {
  const { token, getTodos } = useContext(AppContext);
  const [updatedTitle, setUpdatedTitle] = useState(todos?.title || "");

  const handleUpdate = async () => {
    try {
      const { data } = await API.put(
        `/api/tasks/update-title/${todos?._id}`,
        {
          title: updatedTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        close();
        getTodos();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Edit Todo</h2>

        <input
          className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg outline-none"
          placeholder="Update todo..."
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={close} className="px-4 py-2 rounded-lg bg-zinc-700">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-emerald-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
