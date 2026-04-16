export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">Total Tasks</p>
          <h2 className="text-3xl font-bold">24</h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">Completed</p>
          <h2 className="text-3xl font-bold text-emerald-500">18</h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">Pending</p>
          <h2 className="text-3xl font-bold text-red-500">6</h2>
        </div>
      </div>
    </div>
  );
}