import { LayoutDashboard, ListTodo } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 p-4 space-y-4">
      <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-zinc-900">
        <LayoutDashboard size={18} /> Dashboard
      </button>
      <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-900">
        <ListTodo size={18} /> Todos
      </button>
    </aside>
  );
}
