import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Todos from "./pages/Todos";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
export default function App() {
  const { getUser } = useContext(AppContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />

      <div className="px-8 md:px-12 lg:px-16 xl:px-20 min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <div className="flex">
          <Sidebar />
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
