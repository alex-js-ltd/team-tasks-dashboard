import type { TaskRow } from "../data";
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectViewport,
} from "../../../comps/ui/select";
import { updateTaskStatus } from "../actions";
import { useTransition } from "react";

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
  const [isPending, startTransition] = useTransition();
  return (
    <article className="group flex min-h-56 flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-lg shadow-black/10 transition duration-200 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <StatusBadge status={task.status} />

        <SelectRoot
          onValueChange={async (value) => {
            const formData = new FormData();

            formData.set("id", task.id);
            formData.set("status", value);

            startTransition(async () => {
              await updateTaskStatus(null, formData);
            });
          }}
          disabled={isPending}
        >
          <SelectTrigger
            type="button"
            aria-label={`Open options for ${task.title}`}
            className="rounded-md px-2 py-1 text-lg leading-none text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
          >
            ···
          </SelectTrigger>

          <SelectPortal>
            <SelectContent
              position="popper"
              sideOffset={6}
              className="z-50 min-w-48 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 text-zinc-200 shadow-2xl shadow-black/50"
            >
              <SelectViewport>
                <SelectItem
                  value="TODO"
                  className="relative flex min-h-10 cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 pr-9 text-sm font-medium text-zinc-400 outline-none transition-colors data-[highlighted]:bg-zinc-800 data-[highlighted]:text-zinc-100"
                >
                  <span className="size-2 rounded-full bg-zinc-500" />

                  <SelectItemText>Todo</SelectItemText>

                  <SelectItemIndicator className="absolute right-3 text-zinc-300">
                    ✓
                  </SelectItemIndicator>
                </SelectItem>

                <SelectItem
                  value="IN_PROGRESS"
                  className="relative flex min-h-10 cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 pr-9 text-sm font-medium text-indigo-300 outline-none transition-colors data-[highlighted]:bg-indigo-500/10 data-[highlighted]:text-indigo-200"
                >
                  <span className="size-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.7)]" />

                  <SelectItemText>In progress</SelectItemText>

                  <SelectItemIndicator className="absolute right-3 text-indigo-300">
                    ✓
                  </SelectItemIndicator>
                </SelectItem>

                <SelectItem
                  value="DONE"
                  className="relative flex min-h-10 cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 pr-9 text-sm font-medium text-emerald-300 outline-none transition-colors data-[highlighted]:bg-emerald-500/10 data-[highlighted]:text-emerald-200"
                >
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.65)]" />

                  <SelectItemText>Done</SelectItemText>

                  <SelectItemIndicator className="absolute right-3 text-emerald-300">
                    ✓
                  </SelectItemIndicator>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
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
