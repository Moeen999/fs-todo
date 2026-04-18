import { CheckCircle, Loader2Icon, User2Icon, Menu } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import AuthModal from "../../pages/Auth";

export default function Navbar({ onToggleSidebar }) {
  const { user, setUser, loading, logoutUser, authOpen, setAuthOpen } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className="h-16 border-b border-zinc-800 flex items-center px-4 md:px-6">
      <div className="w-full flex items-center justify-between gap-2 text-xl font-semibold">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-zinc-900 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <Link
          to="/dashboard"
          className="flex items-center justify-between gap-2"
        >
          <CheckCircle className=" text-emerald-500" />
          <span className="text-sm font-medium md:text-lg">Chore Chuckles</span>
        </Link>

        <div>
          {user ? (
            <div className="relative group">
              {loading ? (
                <Loader2Icon className="text-indigo-400 size-7" />
              ) : (
                <User2Icon className="cursor-pointer" />
              )}
              <div
                className="hidden group-hover:block absolute right-0 bg-zinc-800 text-zinc-300 py-1 px-4 rounded-md text-sm md:text-md cursor-pointer"
                onClick={() => {
                  logoutUser();
                  setUser(null);
                  navigate("/");
                  setAuthOpen(true);
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <Link
              onClick={() => setAuthOpen(true)}
              to="/login"
              className="text-md font-medium tracking-wide hover:text-zinc-500"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
        {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
      </div>
    </nav>
  );
}
