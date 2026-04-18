import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Todos from "./pages/Todos";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect, useState } from "react";
export default function App() {
  const { getUser } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />

      <div className="relative flex min-h-screen flex-col px-4 md:px-12 lg:px-16 xl:px-20 bg-zinc-950 text-zinc-100">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex flex-1">
          <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-6">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/todos" element={<Todos />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
