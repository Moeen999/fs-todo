import { CheckCircle, User2Icon } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import AuthModal from "../../pages/Auth";

export default function Navbar() {
  const { user, setUser } = useContext(AppContext);
  const [authOpen, setAuthOpen] = useState(false);


  return (
    <nav className="h-16 border-b border-zinc-800 flex items-center px-6">
      <div className="w-full flex items-center justify-between gap-2 text-xl font-semibold">
        <Link
          to="/dashboard"
          className="flex items-center justify-between gap-2"
        >
          <CheckCircle className=" text-emerald-500" />
          <span className="text-sm font-medium md:text-lg">Chore Chuckles</span>
        </Link>

        <div>
          {user ? (
            <User2Icon className="cursor-pointer" />
          ) : (
            <Link onClick={()=>setAuthOpen(true)} to="/login" className="text-md font-medium tracking-wide hover:text-zinc-500">
              <span>Login</span>
            </Link>
          )}
        </div>
                {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
      </div>
    </nav>
  );
}
