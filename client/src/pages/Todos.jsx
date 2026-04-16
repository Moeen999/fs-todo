import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";

export default function Todos() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manage Todos</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
