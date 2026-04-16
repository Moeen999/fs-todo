import { CheckCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-zinc-800 flex items-center px-6">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <CheckCircle className="text-emerald-500" />
        FS Todo
      </div>
    </nav>
  );
}
