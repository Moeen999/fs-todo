export default function EditTodoModal({ close }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Edit Todo</h2>

        <input
          className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg outline-none"
          placeholder="Update todo..."
        />

        <div className="flex justify-end gap-3">
          <button onClick={close} className="px-4 py-2 rounded-lg bg-zinc-700">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-emerald-600">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
