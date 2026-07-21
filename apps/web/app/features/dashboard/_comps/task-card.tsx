import type { TaskRow } from "../data";

const statusStyles = {
  TODO: "border-zinc-700 bg-zinc-800/80 text-zinc-300",
  IN_PROGRESS: "border-indigo-400/20 bg-indigo-500/10 text-indigo-300",
  DONE: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
} satisfies Record<TaskRow["status"], string>;

const statusDotStyles = {
  TODO: "bg-zinc-500",
  IN_PROGRESS: "bg-indigo-400",
  DONE: "bg-emerald-400",
} satisfies Record<TaskRow["status"], string>;

const statusLabels = {
  TODO: "Todo",
  IN_PROGRESS: "In progress",
  DONE: "Done",
} satisfies Record<TaskRow["status"], string>;

function getInitials(name: string | null) {
  if (!name) return "?";

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StatusBadge({ status }: { status: TaskRow["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]}`} />

      {statusLabels[status]}
    </span>
  );
}

export function TaskCard({ task }: { task: TaskRow }) {
  const assigneeName = task.assignee.name ?? "Unnamed user";

  return (
    <article className="group flex min-h-56 flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <StatusBadge status={task.status} />

        <button
          type="button"
          aria-label={`Open options for ${task.title}`}
          className="rounded-md px-2 py-1 text-lg leading-none text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
        >
          ···
        </button>
      </div>

      <div className="mt-5 flex-1">
        <h2 className="text-base font-semibold leading-6 text-zinc-100 transition-colors group-hover:text-white">
          {task.title}
        </h2>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-800 text-[11px] font-semibold text-zinc-200">
            {getInitials(task.assignee.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-300">
              {assigneeName}
            </p>

            <p className="truncate text-xs text-zinc-500">
              {task.assignee.email ?? "No email"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-4">
        <span className="text-xs text-zinc-500">Due date</span>

        <time
          dateTime={new Date(task.dueDate).toISOString()}
          className="text-sm font-medium text-zinc-300"
        >
          {formatDate(task.dueDate)}
        </time>
      </div>
    </article>
  );
}
