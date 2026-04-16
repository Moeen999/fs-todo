import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r border-zinc-800 p-4">
      <NavLink
        to="/dashboard"
        className="flex gap-3 p-3 rounded-lg hover:bg-zinc-900"
      >
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink
        to="/todos"
        className="flex gap-3 p-3 mt-2 rounded-lg hover:bg-zinc-900"
      >
        <ListTodo size={18} /> Todos
      </NavLink>
    </aside>
  );
}
