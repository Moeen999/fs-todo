import { Trash2, Edit, Check } from "lucide-react";

export default function TodoCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
      <span className="text-lg">Build FS MERN Todo App</span>
      <div className="flex gap-3">
        <button className="text-emerald-500">
          <Check size={18} />
        </button>
        <button className="text-blue-500">
          <Edit size={18} />
        </button>
        <button className="text-red-500">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
