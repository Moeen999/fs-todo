import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListTodo, LogOut, X } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, setUser, logoutUser, setAuthOpen } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
    setAuthOpen(true);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 max-w-full overflow-y-auto bg-zinc-950 border-r border-zinc-800 p-4 transition-transform duration-300 ease-out md:static md:translate-x-0 md:block ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <span className="text-lg font-semibold">Chore Chukles</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-900"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <NavLink
          to="/dashboard"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isActive ? "bg-zinc-900 text-white" : "hover:bg-zinc-900"
            }`
          }
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/todos"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 mt-2 rounded-lg transition-colors ${
              isActive ? "bg-zinc-900 text-white" : "hover:bg-zinc-900"
            }`
          }
        >
          <ListTodo size={18} /> Todos
        </NavLink>

        {user && (
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left p-3 mt-2 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        )}
      </aside>
    </>
  );
}
