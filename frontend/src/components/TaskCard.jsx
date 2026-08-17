export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div data-testid={`task-card-${task.id}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            {task.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {task.description || "No description"}
          </p>
        </div>

        <span
          data-testid={`status-${task.id}`}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            task.status === "done"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          data-testid={`edit-task-${task.id}`}
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          data-testid={`delete-task-${task.id}`}
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}