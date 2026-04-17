import { createContext } from "react";
import { useState } from "react";
import API from "../config/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/api/user/profile");
      setUser(data.user);
    } catch (err) {
      setUser(null);
      setLoading(false);
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
        toast.success(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const values = {
    user,
    setUser,
    loading,
    logoutUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
