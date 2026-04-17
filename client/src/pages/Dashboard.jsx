import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import API from "../config/axios";
import { useState } from "react";

export default function Dashboard() {
  const { token } = useContext(AppContext);
  const [todosData, setTodoData] = useState([]);
  const getTodos = async () => {
    try {
      const { data } = await API.get("/api/tasks/get-todos", {
        headers: {
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        },
      });
      setTodoData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">Total Tasks</p>
          <h2 className="text-3xl font-bold">{todosData?.length}</h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">Completed</p>
          <h2 className="text-3xl font-bold text-emerald-500">
            {todosData?.filter((todo) => todo.completed).length}
          </h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">Pending</p>
          <h2 className="text-3xl font-bold text-red-500">
            {todosData?.filter((todo) => !todo.completed).length}
          </h2>
        </div>
      </div>
    </div>
  );
}
