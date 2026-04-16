import { Plus } from "lucide-react";

export default function TodoForm() {
  return (
    <div className="flex gap-3">
      <input
        placeholder="Add a new task..."
        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none"
      />
      <button className="bg-emerald-600 hover:bg-emerald-700 px-5 rounded-lg flex items-center gap-2">
        <Plus size={18} /> Add
      </button>
    </div>
  );
}
