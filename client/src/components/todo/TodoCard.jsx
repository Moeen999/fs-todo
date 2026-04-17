import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditTodoModal from "../ui/EditTodoModal";
import { AppContext } from "../../context/AppContext";

export default function TodoCard({ todos }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
        <span>{todos?.title}</span>

        <div className="flex gap-3">
          <button onClick={() => setOpen(true)} className="text-blue-500">
            <Edit size={18} />
          </button>
          <button className="text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {open && <EditTodoModal close={() => setOpen(false)} />}
    </>
  );
}
