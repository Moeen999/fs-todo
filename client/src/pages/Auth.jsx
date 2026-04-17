import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import API from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AuthModal({ close }) {
  const navigate = useNavigate();
  const { setUser, setToken, authOpen } = useContext(AppContext);
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const { data } = await API.post("/api/user/login", {
          email: formData.email,
          password: formData.password,
        });

        if (data?.user) {
          setUser(data.user);
          setToken(data.accessToken);
          toast.success(data?.message);
          navigate("/dashboard");
          close();
        } else {
          toast.error(data?.message);
        }
      } else {
        const { data } = await API.post("/api/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (data?.user) {
          setUser(data.user);
          toast.success(data?.message);
          navigate("/dashboard");
          close();
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl p-6 relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
          disabled={authOpen}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-zinc-400" size={18} />
              <input
                className="w-full text-sm bg-zinc-800 border border-zinc-700 pl-10 pr-4 py-3 rounded-lg outline-none"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-zinc-400" size={18} />
            <input
              className="w-full text-sm bg-zinc-800 border border-zinc-700 pl-10 pr-4 py-3 rounded-lg outline-none"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-zinc-400" size={18} />
            <input
              type="password"
              className="w-full text-sm bg-zinc-800 border border-zinc-700 pl-10 pr-4 py-3 rounded-lg outline-none"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button
            onClick={handleFormSubmit}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg font-medium transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-zinc-400 mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-emerald-500 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-emerald-500 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
