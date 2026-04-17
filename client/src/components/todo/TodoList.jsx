import { useContext } from "react";
import TodoCard from "./TodoCard";
import { AppContext } from "../../context/AppContext";

export default function TodoList() {
  const { todosData } = useContext(AppContext);

  return (
    <div className="grid gap-4">
      {todosData?.map((todos, index) => {
        return <TodoCard todos={todos} key={index} />;
      })}
    </div>
  );
}
