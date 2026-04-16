import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Todos from "./Todos";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-3 md:p-6">
          <Todos />
        </main>
      </div>
    </>
  );
}
