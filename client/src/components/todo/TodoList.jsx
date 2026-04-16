import TodoCard from "./TodoCard";

export default function TodoList() {
  return (
    <div className="grid gap-4">
      <TodoCard />
      <TodoCard />
    </div>
  );
}
