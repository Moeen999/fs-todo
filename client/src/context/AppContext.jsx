import { createContext } from "react";
import { useState } from "react";
import API from "../config/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [todosData, setTodoData] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/api/user/profile");
      setToken(data?.accessToken);
      setUser(data?.user);
    } catch (err) {
      setUser(null);
      setLoading(false);
      setAuthOpen(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await API.post("/api/user/logout");
      if (data) {
        setUser(null);
        setToken(null);
        setTodoData([]);
        toast.success(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTodos = async () => {
    if (!token) return;

    try {
      const { data } = await API.get("/api/tasks/get-todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTodoData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (token) {
      getTodos();
    }
  }, [token]);

  const values = {
    user,
    setUser,
    loading,
    logoutUser,
    token,
    setToken,
    getUser,
    getTodos,
    todosData,
    setTodoData,
    authOpen,
    setAuthOpen,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
